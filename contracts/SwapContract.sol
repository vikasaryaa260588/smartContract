// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SwapContract is ERC721 {
    uint private swapContractId;
    mapping(uint => uint) public swapContractVersion;
    mapping(uint => string[]) public swapContracts; //mapping of swapContractId to array[data]

    event CreateSwapContract(address indexed sender, uint swapId);
    event PushDataToSwapContract(address indexed sender, uint indexed swapId, string data);
    event UpdateSwapContractVersion(address indexed sender, uint swapId, uint newVersion);
    
    constructor() ERC721("SwapContract", "swapContract") {
        console.log("Deployed swapContract to :: ", address(this));
        console.log("Deployed swapContract by :: ", msg.sender);
    }

    modifier onlyApproved(uint id) {
        require(_isApprovedOrOwner(msg.sender, id), "Unauthorized");
        _;
    }

    function createSwapContract() external returns (uint) {
        uint swapId = swapContractId++;
        _mint(msg.sender, swapId);
        emit CreateSwapContract(msg.sender, swapId);
        console.log("Created document entry", swapId);
        //console.log(_mint(msg.sender, swapId));
        return (swapId);
    }

    function pushDataToSwapContract(uint swapId, string memory data) external onlyApproved(swapId) returns (uint) {
        swapContracts[swapId].push(data);
        swapContractVersion[swapId]++;
        emit PushDataToSwapContract(msg.sender, swapId, data);
        emit UpdateSwapContractVersion(msg.sender, swapId, swapContractVersion[swapId]);
        console.log("Add data to swap contract : ", swapId, data, swapContracts[swapId].length);
        return (swapContracts[swapId].length);
    }

    function swapContractCount() public view returns (uint) {
        return (swapContractId);
    }
    
    function swapContractVersions(uint swapId) public view returns (uint) {
        return (swapContractVersion[swapId]);
    }

    function retreiveSwapContractByIdVersion(uint swapId, uint version) public view returns (string memory) {
        // if verison == null {
        //     version = swapContractVersion[swapId]
        // }
        return (swapContracts[swapId][version-1]);
    }
    
}
