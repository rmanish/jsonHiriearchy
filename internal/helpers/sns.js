require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({region: process.env.REGION});
const snsWrapper = new AWS.SNS();

export const pubOnSns = (payload, topic, subject) => {
    const params = {
      Message: JSON.stringify(payload),
      TopicArn: `arn:aws:sns:${process.env.REGION}:${process.env.ACCOUNT_ID}:${topic}`
    };
    if (subject) {
      params.Subject = subject;
    }
    return snsWrapper.publish(params).promise();
};
