// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract AdvancedComplianceContract is AccessControl {
    using EnumerableSet for EnumerableSet.AddressSet;

    bytes32 public constant COMPLIANCE_OFFICER_ROLE = keccak256("COMPLIANCE_OFFICER_ROLE");

    EnumerableSet.AddressSet private underReview;

    mapping(address => string) private violationDetails;

    event AddressUnderReview(address indexed account);
    event AddressReviewCleared(address indexed account);
    event ComplianceViolation(address indexed account, string violation);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(COMPLIANCE_OFFICER_ROLE, msg.sender);
    }

    function markUnderReview(address account) public onlyRole(COMPLIANCE_OFFICER_ROLE) {
        require(!underReview.contains(account), "Address already under review");
        underReview.add(account);
        emit AddressUnderReview(account);
    }

    function clearReview(address account) public onlyRole(COMPLIANCE_OFFICER_ROLE) {
        require(underReview.contains(account), "Address not under review");
        underReview.remove(account);
        emit AddressReviewCleared(account);
    }

    function isUnderReview(address account) public view returns (bool) {
        return underReview.contains(account);
    }

    function reportViolation(address account, string memory violation) public onlyRole(COMPLIANCE_OFFICER_ROLE) {
        require(underReview.contains(account), "Address not under review");
        violationDetails[account] = violation;
        emit ComplianceViolation(account, violation);
    }

    function getViolationDetails(address account) public view returns (string memory) {
        return violationDetails[account];
    }
}
