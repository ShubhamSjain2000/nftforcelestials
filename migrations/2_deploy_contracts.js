const Celestial = artifacts.require("Celestial");

module.exports = function(deployer) {
  deployer.deploy(Celestial);
};
