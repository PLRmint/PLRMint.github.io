document.addEventListener('DOMContentLoaded', () => {
    const ethers = window.ethers;
    let provider;
    let signer;
    let plrMintContract;

    const contractAddress = "YOUR_CONTRACT_ADDRESS";
    const contractABI = []; // Your contract ABI here

    document.getElementById('connectWallet').addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                signer = provider.getSigner();

                // Initialize your contract
                plrMintContract = new ethers.Contract(contractAddress, contractABI, signer);
                
                console.log('Wallet connected');
            } catch (error) {
                console.error('Error connecting to wallet:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature.');
        }
    });

    document.getElementById('mintForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const metadataURI = document.getElementById('metadataURI').value;

        try {
            const tx = await plrMintContract.mintNFT(metadataURI); // Adjust based on your contract's mint function
            await tx.wait();
            alert('NFT minted successfully!');
        } catch (error) {
            console.error('Failed to mint NFT:', error);
            alert('Minting failed.');
        }
    });
});
