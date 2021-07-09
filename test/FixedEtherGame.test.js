
const FixedEtherGame = artifacts.require("./FixedEtherGame.sol");
const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("FixedEtherGame", accounts => {
    const ownerAccount = accounts[0];
    const clientAccount1 = accounts[1];
    const clientAccount2 = accounts[2];
    const depositAmount = new BN(web3.utils.toWei("1", "ether"));
    let FixedEtherGameInstance;

    //create new smart contract FixedEtherGameInstance before each test method
    beforeEach(async function() {
      FixedEtherGameInstance = await FixedEtherGame.new({from: ownerAccount});
    });

    it("Client can deposit 1 ether", async () => {   
        await FixedEtherGameInstance.deposit({from: clientAccount1, value: depositAmount});
        let balance = await FixedEtherGameInstance.balance();
        expect(balance).to.be.a.bignumber.equal(depositAmount);
    });

    it("Client canNOT deposit more or less than 1 ether", async () => {   
        let difference = new BN(web3.utils.toWei("500", "wei"));
        await expect(FixedEtherGameInstance.deposit({from: clientAccount1, value: depositAmount - difference})).to.be.eventually.rejected;
        await expect(FixedEtherGameInstance.deposit({from: clientAccount1, value: depositAmount + difference})).to.be.eventually.rejected;
        let balance = await FixedEtherGameInstance.balance();
        expect(balance).bignumber.equal(new BN(0));
    });

    it("Client can claim Reward after winning the game", async () => {
      let targetAmount = new BN(await FixedEtherGameInstance.targetAmount());
      
      for(let i = 0; i < (targetAmount / (10**18)); i++) {   
        await FixedEtherGameInstance.deposit({from: clientAccount1, value: depositAmount});
      }
        let winner = await FixedEtherGameInstance.winner();
        expect(new BN(winner)).bignumber.equal(new BN(clientAccount1));
        let claim = await FixedEtherGameInstance.claimReward({from: clientAccount1});
    });
});