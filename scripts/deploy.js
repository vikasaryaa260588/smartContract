async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying swap contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const SwapContract = await ethers.getContractFactory("SwapContract");
    const swapContract = await SwapContract.deploy();

    await swapContract.deployed();

    console.log("swap contracts address:", swapContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
