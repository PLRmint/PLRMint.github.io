import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers/dist/ethers.esm.min.js';
import NFTStakingABI from './NFTStakingABI.json';

const nftStakingContractAddress = "0xB8409323fC61bD33a7fbB14c5A79D55731805300";

document.addEventListener('DOMContentLoaded', () => {
    const stakeButton = document.getElementById('stakeNFTButton');
    const unstakeButton = document.getElementById('unstakeNFTButton');

    stakeButton.addEventListener('click', () => stakeNFT());
    unstakeButton.addEventListener('click', () => unstakeNFT());
});

async function stakeNFT() {
    const nftId = document.getElementById('nftIdToStake').value;
    await performStakingAction('stake', nftId);
}

async function unstakeNFT() {
    const nftId = document.getElementById('nftIdToUnstake').value;
    await performStakingAction('unstake', nftId);
}

async function performStakingAction(action, nftId) {
    if (!window.ethereum) {
        alert('Please install MetaMask to use this feature.');
        return;
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftStakingContract = new ethers.Contract(nftStakingContractAddress, NFTStakingABI, signer);

    try {
        const transaction = action === 'stake'
            ? await nftStakingContract.stake(nftId)
            : await nftStakingContract.unstake(nftId);
        await transaction.wait();
        alert(`NFT ${action}d successfully!`);
    } catch (error) {
        console.error(`Failed to ${action} NFT:`, error);
        alert(`There was an error ${action}ing the NFT.`);
    }
}
