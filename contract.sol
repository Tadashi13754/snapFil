// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileReviewSystem {
    struct File {
        string cid; // Content Identifier
        address owner;
        uint8 safeCount;
        uint8 unsafeCount;
        bool reviewed;
        address[] reviewers; // Track reviewers for each file
        uint256 tokens;
    }

    struct FileOwner {
        uint256 positiveRating;
        uint256 negativeRating;
    }

    struct Reviewer {
        address addr;
        uint256 tokens;
    }

    mapping(string => File) public files; // Mapping of CID to File
    mapping(string => mapping(address => bool)) public reviewerVotes;
    mapping(address => FileOwner) public fileOwners; // Mapping of owner address to FileOwner
    mapping(address => Reviewer) public reviewers; // Mapping of reviewer address to Reviewer

    uint256 public stakeAmount = 1; // Required stake amount to participate in reviews

    mapping(address => uint256) public tokenBalances;
    function mintTokens() public{
        tokenBalances[msg.sender] += 10;
    }
    function getTokenBalance(address _address) public view returns (uint256) {
        return tokenBalances[_address];
    }

    // Modified function to submit a file for review
    function submitFile(string memory _cid, address _owner) public {
        require(tokenBalances[msg.sender] > 1, "Mint tokens");
        require(files[_cid].owner == address(0), "File already submitted");
        files[_cid] = File(_cid, _owner, 0, 0, false, new address[](0), 1);
        tokenBalances[msg.sender] -= 1;
    }

    // Modified review function
    function reviewFile(string memory _cid, bool _isSafe) public {
        require(reviewers[msg.sender].tokens > 0, "hasn't staked");
        require(!files[_cid].reviewed, "File already reviewed");
        require(files[_cid].reviewers.length < 3, "Review limit reached for this file");
        require(!reviewerVotes[_cid][msg.sender], "Reviewer has already voted");
        
        // Add reviewer to file's reviewers list
        files[_cid].reviewers.push(msg.sender);

        if (_isSafe) {
            files[_cid].safeCount += 1;
        } else {
            files[_cid].unsafeCount += 1;
        }

        reviewerVotes[_cid][msg.sender] = _isSafe;

        if (files[_cid].safeCount + files[_cid].unsafeCount == 3) {
            finalizeReview(_cid);
        }
    }

    // Modified addReviewer function to require staking
    function initReviewer(address _addr) public {
        reviewers[_addr] = Reviewer(_addr, 0);
    }

    // Function to allow reviewers to deposit tokens (simplified version)
    function stakeTokens() public {
        require(tokenBalances[msg.sender] >= 1, "Mint tokens");
        tokenBalances[msg.sender] -= 1;
        reviewers[msg.sender].tokens += 1;
    }
    function unStakeTokens() public {
        tokenBalances[msg.sender] += reviewers[msg.sender].tokens;
        reviewers[msg.sender].tokens = 0;
    }

    function finalizeReview(string memory _cid) private {
       File storage file = files[_cid];
       file.reviewed = true;

       bool isFileSafe = file.safeCount > file.unsafeCount;
       uint256 totalTokens = file.tokens;

       if (file.reviewers.length > 0 && totalTokens > 0) {
           uint256 rewardOrPenalty = totalTokens / file.reviewers.length;
           for (uint i = 0; i < file.reviewers.length; i++) {
               address reviewer = file.reviewers[i];
               bool reviewerVote = reviewerVotes[_cid][reviewer];
               if ((reviewerVote && isFileSafe) || (!reviewerVote && !isFileSafe)) {
                   reviewers[reviewer].tokens += rewardOrPenalty;
               } else {
                   // Ensure there's enough tokens to subtract to avoid underflow
                   if (reviewers[reviewer].tokens >= rewardOrPenalty) {
                       reviewers[reviewer].tokens -= rewardOrPenalty;
                   } else {
                       reviewers[reviewer].tokens = 0;
                   }
               }
           }
       }

       // Adjust file owner rating
       if (isFileSafe) {
           fileOwners[file.owner].positiveRating += 1;
       } else {
           fileOwners[file.owner].negativeRating += 1;
       }
    }

    function getReviewData(string memory _cid) public view returns (uint8 safeCount, uint8 unsafeCount, bool reviewed) {
        return (files[_cid].safeCount, files[_cid].unsafeCount, files[_cid].reviewed);
    }

    function stakedBalance() public view returns (uint256) {
        return (reviewers[msg.sender].tokens);
    }

    function getRating(address _user) public view returns (uint256, uint256) {
        return (fileOwners[_user].positiveRating, fileOwners[_user].negativeRating);
    }
}
