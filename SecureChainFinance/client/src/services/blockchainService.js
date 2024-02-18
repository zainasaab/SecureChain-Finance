import Web3 from 'web3';

const INFURA_PROJECT_ID = 7a4382bf4fce4b54b9a2c9b197f2a077;
const INFURA_PROJECT_SECRET = k1YRWpxIbglvoQWv4zS56VwsfZ2N2ydggd5fjhdpRt+P2feVRQZrOA; 
const NETWORK = 'mainnet'; 

const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/7a4382bf4fce4b54b9a2c9b197f2a077`, {
  headers: [{
    name: 'Authorization',
    value: `Basic ${Buffer.from(`7a4382bf4fce4b54b9a2c9b197f2a077':'k1YRWpxIbglvoQWv4zS56VwsfZ2N2ydggd5fjhdpRt+P2feVRQZrOA`).toString('base64')}`
  }]
}));

let selectedAccount;

export const setAccount = (account) => {
  selectedAccount = account;
};

export const getAccount = () => {
  return selectedAccount;
};

export const sendTransaction = async ({ from, to, value }) => {
  const transactionParameters = {
    from: from,
    to: to,
    value: value 
  };

  try {
    const txHash = await web3.eth.sendTransaction(transactionParameters);
    console.log(`Transaction hash: ${txHash}`);
  } catch (error) {
    console.error(`Failed to send transaction: ${error}`);
  }
};

