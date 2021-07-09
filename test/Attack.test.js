const FixedEtherGame = artifacts.require("./FixedEtherGame.sol");
const Attack = artifacts.require("./Attack.sol");
const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Attack to FixedEtherGame", accounts => {
    const ownerAccount = accounts[0];
    const clientAccount = accounts[1];
    const attackerAccount = accounts[2];
    const depositAmount = new BN(web3.utils.toWei("1", "ether"));
    let FixedEtherGameInstance;
    let AttackInstance;

    //create new smart contract FixedEtherGameInstance before each test method
    beforeEach(async function() {
      FixedEtherGameInstance = await FixedEtherGame.new({from: ownerAccount});
      AttackInstance = await Attack.new(FixedEtherGameInstance.address, {from: attackerAccount});
    });

    it("Attack in loop", async () => {
        await FixedEtherGameInstance.deposit({from: clientAccount, value: depositAmount});
        let balance = await FixedEtherGameInstance.balance();
        expect(balance).to.be.a.bignumber.equal(depositAmount);
        
        await AttackInstance.attack({from: attackerAccount, value: web3.utils.toWei("2", "ether")});
        let attackerContractBalance = await AttackInstance.getBalance({from: attackerAccount});
        expect(new BN(attackerContractBalance)).bignumber.equal(new BN(web3.utils.toWei("3", "ether")));
    });

    it("Attack in recursive", async () => {
        await FixedEtherGameInstance.deposit({from: clientAccount, value: depositAmount});
        let balance = await FixedEtherGameInstance.balance();
        expect(balance).to.be.a.bignumber.equal(depositAmount);
        
        await AttackInstance.recursiveAttack({from: attackerAccount, value: web3.utils.toWei("3", "ether")});
        let attackerContractBalance = await AttackInstance.getBalance({from: attackerAccount});
        expect(new BN(attackerContractBalance)).bignumber.equal(new BN(web3.utils.toWei("4", "ether")));
    });
});