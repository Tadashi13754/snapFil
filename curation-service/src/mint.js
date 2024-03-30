import { ethers } from 'ethers';
import {abi} from './abi';
import { contractAddress } from './contractAddress';
const mint = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.mintTokens();
    const receipt = await tx.wait();
    return('Tokens minted successfully. Transaction receipt');
};

export default mint
