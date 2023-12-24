```javascript
// Import the necessary libraries
const zapier = require('zapier-platform-core');

// Define the Zap action
const customizeTemplate = (z, bundle) => {
  return new Promise((resolve, reject) => {
    // Get the email content from the previous action
    const emailContent = bundle.inputData.emailContent;

    // Customize the email template
    const customizedEmailContent = emailContent.replace('[Your Name]', 'John Doe');

    // Resolve the promise with the customized email content
    resolve({ customizedEmailContent: customizedEmailContent });
  });
};

// Register the Zap action
zapier.createAction('customize_template', customizeTemplate)
  .then((result) => {
    console.log('Action registered successfully');
  })
  .catch((error) => {
    console.error('Error registering action:', error);
  });
```
