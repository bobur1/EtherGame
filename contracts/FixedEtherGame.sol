// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract FixedEtherGame {
    uint public targetAmount;
    uint public balance;
    address public winner;
    address public owner;
    
    constructor() {
        initialize(msg.sender);
    }
    
    function initialize(address _owner) public {
        require(owner == address(0), "Already initialized");
        targetAmount = 3 ether;
        owner = _owner;
    }

    function deposit() public payable {
        require(msg.value == 1 ether, "You can only send 1 Ether");

        balance += msg.value;
        require(balance <= targetAmount, "Game is over");

        if (balance == targetAmount) {
            winner = msg.sender;
        }
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function claimReward() public {
        require(msg.sender == winner, "Not winner");

        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        winner = address(0);
        balance = 0;
    }
}