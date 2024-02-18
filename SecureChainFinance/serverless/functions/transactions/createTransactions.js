const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const TRANSACTIONS_TABLE = process.env.TRANSACTIONS_TABLE; 

exports.handler = async (event) => {
    try {
        const { from, to, amount, currency, description } = JSON.parse(event.body);

        const transactionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        await documentClient.put({
            TableName: TRANSACTIONS_TABLE,
            Item: {
                transactionId,
                from,
                to,
                amount,
                currency,
                description,
                status: 'pending', 
                createdAt: new Date().toISOString(),
            },
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Transaction created successfully',
                transactionId,
            }),
        };
    } catch (error) {
        console.error('Error creating transaction:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to create transaction' }),
        };
    }
};
