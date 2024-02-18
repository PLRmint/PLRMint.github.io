import { signer } from './web3Provider.js'; // or './ethersProvider.js'
import PLRMintABI from '../path/to/PLRMintABI.json';
const PLRMintAddress = '0x1CCA53Bb4Fd1f64809Ff5C28bd77cd85213E14C5';
const PLRMintContract = new ethers.Contract(PLRMintAddress, PLRMintABI, signer);

export const mintNFT = async (to, tokenId, affiliate) => {
  const tx = await PLRMintContract.mintNFTWithAffiliateAndStake(to, tokenId, affiliate);
  await tx.wait();
  // Additional logic after minting
};
