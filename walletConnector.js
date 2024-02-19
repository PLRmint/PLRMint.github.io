// walletConnector.js

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected account:', accounts[0]);
            alert('Wallet connected: ' + accounts[0]);
            return accounts[0]; // Returning the connected account
        } catch (error) {
            console.error('Could not connect to wallet:', error);
            alert('Failed to connect the wallet.');
        }
    } else {
        alert('Please install MetaMask!');
    }
}

document.getElementById('connectWallet').addEventListener('click', connectWallet);
