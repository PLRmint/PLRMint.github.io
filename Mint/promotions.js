import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers/dist/ethers.esm.min.js';
import PromotionsABI from './PromotionsABI.json';

const promotionsContractAddress = "0x70Aee82d5C8Cd00123AB6BFFce15992ccf032950";

document.addEventListener('DOMContentLoaded', () => {
    const purchaseButton = document.getElementById('purchasePromotionButton');
    purchaseButton.addEventListener('click', purchasePromotion);
});

async function purchasePromotion() {
    if (!window.ethereum) {
        alert('Please install MetaMask to use this feature.');
        return;
    }

    const nftId = document.getElementById('nftId').value;
    const promotionPrice = document.getElementById('promotionPrice').value;
    
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const promotionsContract = new ethers.Contract(promotionsContractAddress, PromotionsABI, signer);

    try {
        const transaction = await promotionsContract.purchasePromotion(nftId, {
            value: ethers.utils.parseEther(promotionPrice)
        });
        await transaction.wait();
        alert('Promotion purchased successfully!');
    } catch (error) {
        console.error('Failed to purchase promotion:', error);
        alert('There was an error purchasing the promotion.');
    }
}
