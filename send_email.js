```javascript
// Import the necessary libraries
const zapier = require('zapier-platform-core');
const nodemailer = require('nodemailer');

// Define the Zap action
const sendEmail = (z, bundle) => {
  return new Promise((resolve, reject) => {
    // Get the email content from the previous action
    const emailContent = bundle.inputData.emailContent;

    // Get the recipient list
    const recipientList = bundle.inputData.recipientList;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail', // replace with your email provider
      auth: {
        user: 'your-email@gmail.com', // replace with your email
        pass: 'your-password' // replace with your password
      }
    });

    // Set up email data with unicode symbols
    let mailOptions = {
      from: '"Meeting Summary" <your-email@gmail.com>', // sender address
      to: recipientList, // list of receivers
      subject: 'Meeting Summary', // Subject line
      text: emailContent, // plain text body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve({ messageId: info.messageId });
      }
    });
  });
};

// Register the Zap action
zapier.createAction('send_email', sendEmail)
  .then((result) => {
    console.log('Action registered successfully');
  })
  .catch((error) => {
    console.error('Error registering action:', error);
  });
```
