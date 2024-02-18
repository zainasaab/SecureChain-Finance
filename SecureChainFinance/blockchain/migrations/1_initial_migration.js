const Migrations = artifacts.require("Migrations");
const SecureChainContract = artifacts.require("SecureChainContract");
const ComplianceContract = artifacts.require("ComplianceContract");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(Migrations);

    await deployer.deploy(ComplianceContract);
    const complianceInstance = await ComplianceContract.deployed();

    await deployer.deploy(SecureChainContract, complianceInstance.address);

    const secureChainInstance = await SecureChainContract.deployed();

    const DEFAULT_ADMIN_ROLE = '0x00';
    const COMPLIANCE_OFFICER_ROLE = web3.utils.soliditySha3('COMPLIANCE_OFFICER_ROLE');

    await secureChainInstance.grantRole(DEFAULT_ADMIN_ROLE, accounts[0]);
    await complianceInstance.grantRole(DEFAULT_ADMIN_ROLE, accounts[0]);

    await complianceInstance.grantRole(COMPLIANCE_OFFICER_ROLE, accounts[1]); // Assuming accounts[1] is a compliance officer

};
