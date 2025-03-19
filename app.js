const contractAddress = "0x4F9b5eB2C1b4205dA8d06664f765837eA5188d37";
const contractABI = [
    {
        "inputs": [
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "uint256", "name": "interestRate", "type": "uint256" },
            { "internalType": "uint256", "name": "duration", "type": "uint256" }
        ],
        "name": "requestLoan",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "approveLoan",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "repayLoan",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getLoanStatus",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    }
];

let provider, signer, contract;

async function connectWallet() {
    if (window.ethereum) {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            document.getElementById("walletAddress").innerText = `Wallet: ${userAddress}`;
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            updateLoanStatus();
        } catch (error) {
            console.error("Wallet connection failed:", error);
            alert("Failed to connect wallet!");
        }
    } else {
        alert("Please install MetaMask to use this application.");
    }
}

async function updateLoanStatus() {
    try {
        if (!contract) return alert("Please connect your wallet first.");
        const status = await contract.getLoanStatus();
        document.getElementById("loan-status").innerText = "Loan Status: " + status;
    } catch (error) {
        console.error("Error fetching loan status:", error);
    }
}

async function requestLoan() {
    if (!contract) return alert("Please connect your wallet first.");
    const amount = document.getElementById("loanAmount").value;
    const interest = document.getElementById("interestRate").value;
    const duration = document.getElementById("loanDuration").value;

    if (!amount || !interest || !duration) return alert("Please fill all fields.");

    try {
        const tx = await contract.requestLoan(
            ethers.utils.parseEther(amount),
            interest,
            duration
        );
        await tx.wait();
        alert("Loan requested successfully!");
        updateLoanStatus();
    } catch (error) {
        console.error("Error requesting loan:", error);
        alert("Error requesting loan.");
    }
}

async function approveLoan() {
    if (!contract) return alert("Please connect your wallet first.");

    try {
        const tx = await contract.approveLoan();
        await tx.wait();
        alert("Loan approved!");
        updateLoanStatus();
    } catch (error) {
        console.error("Error approving loan:", error);
        alert("Error approving loan.");
    }
}

async function repayLoan() {
    if (!contract) return alert("Please connect your wallet first.");
    const amount = document.getElementById("repayAmount").value;

    if (!amount) return alert("Please enter repayment amount.");

    try {
        const tx = await contract.repayLoan({ value: ethers.utils.parseEther(amount) });
        await tx.wait();
        alert("Loan repaid successfully!");
        updateLoanStatus();
    } catch (error) {
        console.error("Error repaying loan:", error);
        alert("Error repaying loan.");
    }
}

window.onload = () => {
    document.getElementById("walletAddress").innerText = "Wallet: Not connected";
};
