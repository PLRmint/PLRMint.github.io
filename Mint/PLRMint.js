import { ethers } from 'ethers';
import { PLRMintABI } from './path/to/PLRMintABI.json'; // Ensure the path and import method match your project setup

const PLRMintContractAddress = "0x1CCA53Bb4Fd1f64809Ff5C28bd77cd85213E14C5";

function getPLRMintContract(signerOrProvider) {
    return new ethers.Contract(PLRMintContractAddress, PLRMintABI, signerOrProvider);
}

async function mintNFT(to, tokenId, affiliate) {
    if (!window.signer) {
        console.error("Wallet not connected");
        return;
    }
    const PLRMint = getPLRMintContract(window.signer);
    try {
        const tx = await PLRMint.mintNFTWithAffiliateAndStake(to, tokenId, affiliate);
        await tx.wait();
        console.log(`NFT minted: ${tx.hash}`);
    } catch (error) {
        console.error('Minting failed:', error);
    }
}

export { mintNFT };
