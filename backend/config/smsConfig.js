// SMS Configuration
// Copy this file to .env and fill in your actual values

module.exports = {
    // Twilio Configuration (Recommended for international)
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID || 'your_twilio_account_sid_here',
        authToken: process.env.TWILIO_AUTH_TOKEN || 'your_twilio_auth_token_here',
        phoneNumber: process.env.TWILIO_PHONE_NUMBER || 'your_twilio_phone_number_here'
    },

    // MSG91 Configuration (Popular in India)
    msg91: {
        apiKey: process.env.MSG91_API_KEY || 'your_msg91_api_key_here',
        senderId: process.env.MSG91_SENDER_ID || 'your_sender_id_here'
    },

    // AWS SNS Configuration
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'your_aws_access_key_here',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'your_aws_secret_key_here',
        region: process.env.AWS_REGION || 'us-east-1'
    },

    // Development mode (when no SMS service is configured)
    development: {
        enabled: process.env.NODE_ENV === 'development',
        logToConsole: true
    }
};

// Instructions for setting up SMS:
// 1. For Twilio (International):
//    - Sign up at https://console.twilio.com/
//    - Get Account SID and Auth Token
//    - Get a phone number
//    - Set environment variables: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER

// 2. For MSG91 (India):
//    - Sign up at https://msg91.com/
//    - Get API Key and Sender ID
//    - Set environment variables: MSG91_API_KEY, MSG91_SENDER_ID

// 3. For AWS SNS:
//    - Set up AWS account
//    - Create IAM user with SNS permissions
//    - Set environment variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION 