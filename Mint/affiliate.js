import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers/dist/ethers.esm.min.js';
import AffiliateTrackerABI from './AffiliateTrackerABI.json';

const affiliateTrackerAddress = "0xAdf7Aa145200DE1f4f31A0cdB8c45b2657C1E7f6";

document.addEventListener('DOMContentLoaded', async () => {
    const connectButton = document.getElementById('connectWalletButton');
    const withdrawButton = document.getElementById('withdrawCommissionsButton');

    connectButton.addEventListener('click', connectWallet);
    withdrawButton.addEventListener('click', withdrawCommissions);
});

async function connectWallet() {
    if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const affiliateAddress = await signer.getAddress();
        document.getElementById('affiliateAddressDisplay').innerText = `Your Address: ${affiliateAddress}`;
        fetchCommissionBalance(signer);
    } else {
        console.log('Ethereum wallet is not connected');
    }
}

async function fetchCommissionBalance(signer) {
    const contract = new ethers.Contract(affiliateTrackerAddress, AffiliateTrackerABI, signer);
    const commissionBalance = await contract.getCommissionEarned(signer.getAddress());
    document.getElementById('commissionEarnedDisplay').innerText = `Earned Commissions: ${ethers.utils.formatEther(commissionBalance)} ETH`;
}

async function withdrawCommissions() {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(affiliateTrackerAddress, AffiliateTrackerABI, signer);
    try {
        const tx = await contract.withdrawCommission(await signer.getAddress());
        await tx.wait();
        document.getElementById('withdrawStatus').innerText = 'Commissions withdrawn successfully.';
        fetchCommissionBalance(signer); // Refresh the balance display
    } catch (error) {
        console.error('Error withdrawing commissions:', error);
        document.getElementById('withdrawStatus').innerText = 'Error withdrawing commissions. See console for details.';
    }
}

