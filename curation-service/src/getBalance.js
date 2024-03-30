import {abi} from './abi'
import {ethers} from 'ethers'
import { contractAddress } from './contractAddress';

const getBalance = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.getTokenBalance(signer.address);
    return(Number(tx))
};

export default getBalance
