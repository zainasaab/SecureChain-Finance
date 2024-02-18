const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const USERS_TABLE = process.env.USERS_TABLE; // The DynamoDB table name for users

exports.handler = async (event) => {
    try {
        const { userId } = event.pathParameters; // Assuming the user ID is passed as a URL path parameter

        // Fetch the user from the database
        const result = await documentClient.get({
            TableName: USERS_TABLE,
            Key: {
                userId
            }
        }).promise();

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'User not found' }),
            };
        }

        // Remove sensitive information before returning
        const { passwordHash, ...userWithoutPassword } = result.Item;

        return {
            statusCode: 200,
            body: JSON.stringify(userWithoutPassword),
        };
    } catch (error) {
        console.error('Error retrieving user:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve user' }),
        };
    }
};
