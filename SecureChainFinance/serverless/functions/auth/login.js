const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const documentClient = new AWS.DynamoDB.DocumentClient();

const USER_TABLE = process.env.USER_TABLE;
const JWT_SECRET = process.env.JWT_SECRET;

exports.handler = async (event) => {
    try {
        const { username, password } = JSON.parse(event.body);

        const params = {
            TableName: USER_TABLE,
            Key: {
                username,
            },
        };

        const { Item: user } = await documentClient.get(params).promise();

        if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Username or password is incorrect' }),
            };
        }

        const token = jwt.sign({ sub: user.username }, JWT_SECRET, { expiresIn: '1h' });

        return {
            statusCode: 200,
            body: JSON.stringify({ token }),
        };
    } catch (error) {
        console.error('Authentication error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};
