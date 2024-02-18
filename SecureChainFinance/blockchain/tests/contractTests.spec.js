const { expect } = require('chai');
const SecureChainContract = artifacts.require('SecureChainContract');
const ComplianceContract = artifacts.require('ComplianceContract');

contract('SecureChain Finance Contracts', (accounts) => {
  let secureChainContract;
  let complianceContract;
  const [admin, bank, complianceOfficer, user] = accounts;

  before(async () => {
    complianceContract = await ComplianceContract.new({ from: admin });
    secureChainContract = await SecureChainContract.new(complianceContract.address, { from: admin });

    // Set up roles
    await complianceContract.grantRole(web3.utils.sha3("COMPLIANCE_OFFICER_ROLE"), complianceOfficer, { from: admin });
    await secureChainContract.grantRole(web3.utils.sha3("BANK_ROLE"), bank, { from: admin });
  });

  describe('ComplianceContract', () => {
    it('should mark an address under review', async () => {
      await complianceContract.markUnderReview(user, { from: complianceOfficer });
      const isUnderReview = await complianceContract.isUnderReview(user);
      expect(isUnderReview).to.be.true;
    });

  });

  describe('SecureChainContract', () => {
    it('should create a transaction', async () => {
      const tx = await secureChainContract.createTransaction(user, 1000, "USD", "Test transaction", { from: bank });
      const transactionCount = await secureChainContract.nextTransactionId();

      expect(transactionCount.toNumber()).to.equal(1);
      expect(tx.logs[0].args.id.toNumber()).to.equal(1);
      expect(tx.logs[0].args.from).to.equal(bank);
    });

  });

});
