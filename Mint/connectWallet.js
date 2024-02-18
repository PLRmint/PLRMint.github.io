import { ethers } from 'ethers';

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.provider = new ethers.providers.Web3Provider(window.ethereum);
            window.signer = window.provider.getSigner();
            console.log('Wallet connected');
        } catch (error) {
            console.error('User denied account access:', error);
        }
    } else {
        console.log('MetaMask is not installed.');
    }
}

export { connectWallet };
