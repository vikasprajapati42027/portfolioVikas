const twilio = require('twilio');

exports.handler = async function(event, context) {
    const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    const { name, email, subject, message } = JSON.parse(event.body);

    try {
        await client.messages.create({
            body: `New Contact Form Submission:
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`,
            from: 'YOUR_TWILIO_PHONE_NUMBER',
            to: '+918871942027' // Your phone number
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "SMS sent successfully" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to send SMS" })
        };
    }
}; 