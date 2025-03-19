Loan Management Smart Contract

Overview

This is a simple Loan Management smart contract implemented in Solidity. The contract allows a borrower to request a loan, the lender to approve it, and the borrower to repay it. The contract also checks for loan default in case of non-repayment.

Features

Loan Request: Borrowers can request a loan with a specified amount, interest rate, and duration.

Loan Approval: The lender (contract deployer) can approve the loan and transfer funds to the borrower.

Loan Repayment: Borrowers can repay the loan in multiple transactions.

Loan Default Check: The contract checks if the borrower has defaulted on the loan.

Loan Status: Function to retrieve the current status of the loan.

Contract Functions

1. requestLoan(uint256 _amount, uint256 _interestRate, uint256 _loanDuration)

Allows the borrower to request a loan.

_amount: The requested loan amount in wei.

_interestRate: The interest rate in percentage.

_loanDuration: The loan duration in seconds.

2. approveLoan()

Allows the lender to approve a loan request and send the loan amount to the borrower.

3. repayLoan()

Allows the borrower to repay the loan. The borrower can send ETH equivalent to the loan amount + interest.

4. checkDefault()

Checks if the borrower has defaulted on the loan after the due date.

5. getLoanStatus()

Returns the current loan status as a string.

Deployment

Deploy the contract to an Ethereum-compatible blockchain (e.g., Remix, Hardhat, or Truffle).

The deployer is the lender.

Borrowers can interact with the contract by requesting a loan.

The lender approves the loan.

The borrower repays the loan before the due date to avoid default.

Events

LoanRequested(address borrower, uint256 amount): Emitted when a borrower requests a loan.

LoanApproved(address lender, uint256 amount, uint256 interestRate, uint256 dueDate): Emitted when a loan is approved.

LoanRepaid(address borrower, uint256 amount): Emitted when the borrower repays a portion of the loan.

LoanDefaulted(address borrower): Emitted if the borrower defaults on the loan.

Notes

The lender must have sufficient ETH balance before approving the loan.

The contract allows multiple repayments until the total due amount is covered.

If the borrower fails to repay by the due date, the loan is considered defaulted.

License

This contract is licensed under the MIT License.

