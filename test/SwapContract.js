const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("SwapContract", function () {
    describe("Basics", function () {
        async function deployTokenFixture() {
            const SwapContract = await ethers.getContractFactory("SwapContract");
            const swapContract = await SwapContract.deploy();

            await swapContract.deployed();

            return swapContract;
        }

        it("Run through", async function() {
            const swapContract = await loadFixture(deployTokenFixture);
            console.log("------");
            await swapContract.createSwapContract();
            await swapContract.pushDataToSwapContract(0, "10");
            await swapContract.pushDataToSwapContract(0, "20");
            await swapContract.pushDataToSwapContract(0, "30");
            console.log("------");
            await swapContract.createSwapContract();
            await swapContract.pushDataToSwapContract(1, "100");
            await swapContract.pushDataToSwapContract(1, "200");
            await swapContract.pushDataToSwapContract(1, "300");
            await swapContract.pushDataToSwapContract(1, "400");

            console.log("------");
            // BigNumber { value: "2" }
            console.log("swapContractCount :: ", await swapContract.swapContractCount());
            // BigNumber { value: "3" }
            console.log("swapContractVersions 0 :: ", await swapContract.swapContractVersions(0));
            // BigNumber { value: "4" }
            console.log("swapContractVersions 1 :: ", await swapContract.swapContractVersions(1));
            // BigNumber { value: "4" }
            console.log("retreiveSwapContractByIdVersion 1,3 :: ", await swapContract.retreiveSwapContractByIdVersion(1, 3));
            console.log("------");
            
            // BigNumber { value: "2" }
            expect(await swapContract.swapContractCount()).to.equal(2);
            // BigNumber { value: "3" }
            expect(await swapContract.swapContractVersions(0)).to.equal(3);
            // BigNumber { value: "4" }
            expect(await swapContract.swapContractVersions(1)).to.equal(4);
            // BigNumber { value: "300" }
            expect(await swapContract.retreiveSwapContractByIdVersion(1,3)).to.equal("300");
            
        });
    });
});