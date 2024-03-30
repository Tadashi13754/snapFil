import { ethers } from 'ethers';
import {abi} from './abi';
import { contractAddress } from './contractAddress';

const submitFile = async (_cid, _owner) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.submitFile(_cid, _owner);
    const receipt = await tx.wait();
    console.log('Transaction receipt:', receipt);
};

export default submitFile
