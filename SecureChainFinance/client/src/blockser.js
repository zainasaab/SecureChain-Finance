import { setAccount, sendTransaction } from './blockchainService';

setAccount('0xYourAccountAddress');

sendTransaction({
  from: '0xYourAccountAddress',
  to: '0xRecipientAddress',
  value: '0xAmountInHex'
});
