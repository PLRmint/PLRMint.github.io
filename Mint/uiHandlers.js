import { mintNFT } from './PLRMintInterface.js';

document.getElementById('mintButton').addEventListener('click', () => {
  const toAddress = document.getElementById('toAddress').value;
  const tokenId = document.getElementById('tokenId').value;
  const affiliateAddress = document.getElementById('affiliateAddress').value;
  mintNFT(toAddress, tokenId, affiliateAddress);
  // Update UI accordingly
});
