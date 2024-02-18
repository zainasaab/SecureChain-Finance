const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const TRANSACTIONS_TABLE = process.env.TRANSACTIONS_TABLE; 

exports.handler = async (event) => {
    try {
        const { transactionId } = event.pathParameters; 

        const result = await documentClient.get({
            TableName: TRANSACTIONS_TABLE,
            Key: {
                transactionId
            }
        }).promise();

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Transaction not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    } catch (error) {
        console.error('Error retrieving transaction:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve transaction' }),
        };
    }
};
