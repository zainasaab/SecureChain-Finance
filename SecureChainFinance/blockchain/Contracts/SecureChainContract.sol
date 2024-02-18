// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EnhancedSecureChainContract is AccessControlEnumerable, ReentrancyGuard {
    using Counters for Counters.Counter;

    bytes32 public constant BANK_ROLE = keccak256("BANK_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");

    struct Transaction {
        uint256 id;
        address from;
        address to;
        uint256 amount;
        string currency;
        string description;
        bool completed;
        uint256 timestamp;
    }

    Counters.Counter private _transactionIds;
    mapping(uint256 => Transaction) private _transactions;

    event TransactionCreated(uint256 indexed id, address indexed from, address indexed to, uint256 amount, string currency, string description, uint256 timestamp);
    event TransactionCompleted(uint256 indexed id, bool completed);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyAuditorOrCompliance() {
        require(hasRole(AUDITOR_ROLE, msg.sender) || hasRole(COMPLIANCE_ROLE, msg.sender), "Not authorized");
        _;
    }

    function createTransaction(address to, uint256 amount, string memory currency, string memory description) external onlyRole(BANK_ROLE) nonReentrant returns (uint256) {
        _transactionIds.increment();
        uint256 newTransactionId = _transactionIds.current();

        _transactions[newTransactionId] = Transaction({
            id: newTransactionId,
            from: msg.sender,
            to: to,
            amount: amount,
            currency: currency,
            description: description,
            completed: false,
            timestamp: block.timestamp
        });

        emit TransactionCreated(newTransactionId, msg.sender, to, amount, currency, description, block.timestamp);
        return newTransactionId;
    }

    function completeTransaction(uint256 transactionId) external onlyRole(BANK_ROLE) {
        require(_exists(transactionId), "Transaction does not exist");
        Transaction storage transaction = _transactions[transactionId];
        require(!transaction.completed, "Transaction already completed");

        transaction.completed = true;
        emit TransactionCompleted(transactionId, true);
    }

    function getTransaction(uint256 transactionId) external view returns (Transaction memory) {
        require(_exists(transactionId), "Transaction does not exist");
        return _transactions[transactionId];
    }

    function grantRole(bytes32 role, address account) public override onlyRole(getRoleAdmin(role)) {
        super.grantRole(role, account);
    }

    function revokeRole(bytes32 role, address account) public override onlyRole(getRoleAdmin(role)) {
        super.revokeRole(role, account);
    }

    function _exists(uint256 transactionId) private view returns (bool) {
        return transactionId <= _transactionIds.current();
    }

    function performComplianceCheck(uint256 transactionId) external onlyAuditorOrCompliance view {
        // Perform specific compliance checks based on transaction details
    }

    function auditTransaction(uint256 transactionId) external onlyRole(AUDITOR_ROLE) view {
        // Perform auditing actions on a specific transaction
    }

    function addComplianceOfficer(address newComplianceOfficer) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(COMPLIANCE_ROLE, newComplianceOfficer);
    }
}
