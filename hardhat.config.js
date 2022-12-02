require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      // url: "http://localhost:8545",
      url : "http://10.35.197.49:8545",
      accounts: ["0e4a30f3eef2454f081e71c634775fae90793704ee23067b7242ce2e1cd211e6"]
    }
  }
};
