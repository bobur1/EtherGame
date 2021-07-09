var FixedEtherGame = artifacts.require("./FixedEtherGame.sol");
var Attack = artifacts.require("./Attack.sol");

var MinimalProxy = artifacts.require("./MinimalProxy.sol");
var FixedEtherGameFactory = artifacts.require("./MinimalProxy.sol");
module.exports = function(deployer) {
  deployer.deploy(FixedEtherGame).then(function() {
    return deployer.deploy(Attack, FixedEtherGame.address)
  });

  deployer.deploy(MinimalProxy);
  deployer.deploy(FixedEtherGameFactory);  
};
