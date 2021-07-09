
const FixedEtherGame = artifacts.require("./FixedEtherGame.sol");
const FixedEtherGameFactory = artifacts.require("./FixedEtherGameFactory.sol");
const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("FixedEtherGameFactory", accounts => {
    const ownerAccount = accounts[0];
    const clientAccount1 = accounts[1];
    const clientAccount2 = accounts[2];
    const depositAmount = new BN(web3.utils.toWei("1", "ether"));
    let FixedEtherGameInstance;
    let FixedEtherGameFactoryInstance;

    beforeEach(async function() {
      FixedEtherGameInstance = await FixedEtherGame.new();
      FixedEtherGameFactoryInstance = await FixedEtherGameFactory.new();
    });

    it("Clone FixedEtherGame", async () => {   
        let cloneOfTheFixedEtherGame = await FixedEtherGameFactoryInstance.cloneFixedEtherGame(FixedEtherGameInstance.address);
        let clonedFixedEtherGame = await FixedEtherGame.at(cloneOfTheFixedEtherGame.logs[0].args.clone);

        await clonedFixedEtherGame.deposit({from: clientAccount1, value: depositAmount});
        let balance = await clonedFixedEtherGame.balance();
        expect(balance).to.be.a.bignumber.equal(depositAmount);
      });
});