import {abi} from './abi'
import {ethers} from 'ethers'
import { contractAddress } from './contractAddress';

const getRating = async() => {
    const provider = new ethers.JsonRpcProvider();
    const privateKey = '0x0ced4408048db649f5b4c2792e41ce0f5c9bbeb1872f0d2877236ac47be9adbf';

    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    const tx = await contract.getRating('0x8cE69494EcF5Ff9cAe5224BFCB6a3e545C0c3526');
    console.log(tx)
    return tx
}

export default getRating
