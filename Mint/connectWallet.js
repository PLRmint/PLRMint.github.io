// Importing Ethers.js as a module. Make sure the script tag in your HTML specifies type="module"
import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers/dist/ethers.esm.min.js';

// Function to request wallet connection
async function connectWallet() {
    if (window.ethereum) { // Check if the MetaMask extension is installed
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Create a new Web3 provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // Get the signer to perform transactions
            const signer = provider.getSigner();
            // Update UI to show connected status
            document.getElementById('walletStatus').innerText = 'Wallet connected';
            console.log('Wallet connected:', await signer.getAddress());
        } catch (error) {
            console.error('An error occurred during wallet connection:', error);
            document.getElementById('walletStatus').innerText = 'Failed to connect wallet';
        }
    } else {
        console.log('MetaMask is not installed');
        document.getElementById('walletStatus').innerText = 'MetaMask is not installed';
    }
}

// Adding event listener to the connect button
document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectWalletButton');
    connectButton.addEventListener('click', connectWallet);
});
