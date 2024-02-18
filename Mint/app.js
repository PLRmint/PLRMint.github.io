import { connectWallet } from './connectWallet.js';
import { mintNFT } from './PLRMint.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('connectWalletButton').addEventListener('click', () => {
        connectWallet();
    });

    document.getElementById('mintButton').addEventListener('click', () => {
        const toAddress = document.getElementById('toAddress').value;
        const tokenId = document.getElementById('tokenId').value; // Make sure to convert this to a number as needed
        const affiliateAddress = document.getElementById('affiliateAddress').value;
        mintNFT(toAddress, tokenId, affiliateAddress);
    });
});
