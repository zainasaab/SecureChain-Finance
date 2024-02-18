const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const USERS_TABLE = process.env.USERS_TABLE; // The DynamoDB table name for users

exports.handler = async (event) => {
    try {
        const { userId } = event.pathParameters; // Assuming the user ID is passed as a URL path parameter
        const { email, name, otherDetails } = JSON.parse(event.body); // Extract details to update from request body

        const result = await documentClient.update({
            TableName: USERS_TABLE,
            Key: { userId },
            UpdateExpression: 'set email = :email, name = :name, otherDetails = :otherDetails',
            ExpressionAttributeValues: {
                ':email': email,
                ':name': name,
                ':otherDetails': otherDetails
            },
            ReturnValues: 'ALL_NEW' // Return all attributes of the item after the update
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'User updated successfully',
                updatedUser: result.Attributes
            }),
        };
    } catch (error) {
        console.error('Error updating user:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update user' }),
        };
    }
};
