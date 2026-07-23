# SMS Setup Guide for OTP Functionality

## 🚨 Current Issue
The OTP is not being sent to mobile phones because no SMS service is configured. Currently, OTPs are only logged to the console.

## 🔧 Solutions

### Option 1: Twilio (Recommended for International)
1. **Sign up at Twilio**: https://console.twilio.com/
2. **Get your credentials**:
   - Account SID
   - Auth Token
   - Phone Number
3. **Set environment variables**:
   ```bash
   export TWILIO_ACCOUNT_SID=your_account_sid_here
   export TWILIO_AUTH_TOKEN=your_auth_token_here
   export TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
   ```

### Option 2: MSG91 (Popular in India)
1. **Sign up at MSG91**: https://msg91.com/
2. **Get your credentials**:
   - API Key
   - Sender ID
3. **Set environment variables**:
   ```bash
   export MSG91_API_KEY=your_api_key_here
   export MSG91_SENDER_ID=your_sender_id_here
   ```

### Option 3: AWS SNS
1. **Set up AWS account**
2. **Create IAM user with SNS permissions**
3. **Set environment variables**:
   ```bash
   export AWS_ACCESS_KEY_ID=your_access_key_here
   export AWS_SECRET_ACCESS_KEY=your_secret_key_here
   export AWS_REGION=us-east-1
   ```

## 🧪 Testing

### Check SMS Configuration
```bash
curl http://localhost:5000/api/users/sms-config
```

### Test OTP Sending
1. Make sure you have a user with a phone number in the database
2. Use the forgot password feature
3. Check the console for OTP logs (in development mode)

## 📝 Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/greenworldholidays

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Server
PORT=5000
NODE_ENV=development

# SMS Configuration (choose one)
# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# OR MSG91
MSG91_API_KEY=your_msg91_api_key
MSG91_SENDER_ID=your_sender_id

# OR AWS SNS
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
```

## 🔍 Troubleshooting

### Issue: "OTP not sent to phone"
**Solution**: Configure one of the SMS services above

### Issue: "Invalid phone number"
**Solution**: Make sure phone number is in correct format (10 digits for India)

### Issue: "SMS service not configured"
**Solution**: Set the required environment variables

### Issue: "Rate limit exceeded"
**Solution**: Wait before sending another OTP (10-minute cooldown)

## 💰 Cost Considerations

- **Twilio**: ~$0.0075 per SMS
- **MSG91**: ~₹0.12 per SMS (India)
- **AWS SNS**: ~$0.00645 per SMS

## 🚀 Production Deployment

1. **Remove development mode**: Set `NODE_ENV=production`
2. **Configure real SMS service**: Choose one of the options above
3. **Set secure environment variables**: Use your hosting platform's env var system
4. **Test thoroughly**: Ensure OTPs are being delivered

## 📞 Support

If you need help setting up SMS:
1. Check the console logs for error messages
2. Verify your SMS service credentials
3. Test with the `/api/users/sms-config` endpoint
4. Ensure your phone number is in the correct format 