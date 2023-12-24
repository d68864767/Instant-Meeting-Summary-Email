```javascript
// Import the necessary libraries
const zapier = require('zapier-platform-core');
const htmlToText = require('html-to-text');

// Define the Zap action
const formatEmail = (z, bundle) => {
  return new Promise((resolve, reject) => {
    // Get the note content from the previous action
    const noteContent = bundle.inputData.noteContent;

    // Convert the note content from HTML to plain text
    const textContent = htmlToText.fromString(noteContent, {
      wordwrap: 130
    });

    // Format the email content
    const emailContent = `Hello,

Here is the summary of our recent meeting:

${textContent}

Best regards,
[Your Name]`;

    // Resolve the promise with the email content
    resolve({ emailContent: emailContent });
  });
};

// Register the Zap action
zapier.createAction('format_email', formatEmail)
  .then((result) => {
    console.log('Action registered successfully');
  })
  .catch((error) => {
    console.error('Error registering action:', error);
  });
```
