import React, { createContext, useState, useEffect, useContext } from 'react';
import Web3 from 'web3';

const INFURA_URL = 'https://mainnet.infura.io/v3/7a4382bf4fce4b54b9a2c9b197f2a077';

const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const initWeb3 = async () => {
            const web3Instance = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
            setWeb3(web3Instance);

            const defaultAccounts = []; 
            setAccounts(defaultAccounts);
            setIsConnected(defaultAccounts.length > 0);
        };

        initWeb3();
    }, []);

    const connectWallet = async () => {
        console.log('Connect wallet functionality depends on your application setup.');
    };

    const value = {
        web3,
        accounts,
        isConnected,
        connectWallet
    };

    return (
        <BlockchainContext.Provider value={value}>
            {children}
        </BlockchainContext.Provider>
    );
};

export const useBlockchain = () => useContext(BlockchainContext);
