const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');

const documentClient = new AWS.DynamoDB.DocumentClient();

const USER_TABLE = process.env.USER_TABLE; // The DynamoDB table name for users

exports.handler = async (event) => {
    try {
        const { username, password, email } = JSON.parse(event.body);

        const existingUser = await documentClient.get({
            TableName: USER_TABLE,
            Key: { username },
        }).promise();

        if (existingUser.Item) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Username already exists' }),
            };
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        await documentClient.put({
            TableName: USER_TABLE,
            Item: {
                username,
                passwordHash,
                email,
            },
        }).promise();

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User registered successfully' }),
        };
    } catch (error) {
        console.error('User registration error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error during registration' }),
        };
    }
};
