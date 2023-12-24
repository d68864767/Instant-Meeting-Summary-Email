```javascript
// Import the necessary libraries
const zapier = require('zapier-platform-core');
const assert = require('assert');

// Import the actions from the other files
const buttonTrigger = require('./button_trigger');
const retrieveNotes = require('./retrieve_notes');
const formatEmail = require('./format_email');
const sendEmail = require('./send_email');
const customizeTemplate = require('./customize_template');
const setupRecipientList = require('./setup_recipient_list');

// Define the test
const testZap = () => {
  // Create a mock bundle
  const bundle = {
    inputData: {
      buttonId: 'myButton',
      noteContent: '<h1>Meeting Summary</h1><p>Here are the notes from the meeting...</p>',
      emailContent: 'Hello,\n\nHere is the summary of our recent meeting:\n\nHere are the notes from the meeting...\n\nBest regards,\n[Your Name]',
      recipientList: 'john.doe@example.com,jane.doe@example.com'
    }
  };

  // Test the button trigger
  buttonTrigger(bundle)
    .then((result) => {
      assert(result.buttonId === bundle.inputData.buttonId, 'Button trigger failed');

      // Test the note retrieval
      return retrieveNotes(bundle);
    })
    .then((result) => {
      assert(result.noteContent === bundle.inputData.noteContent, 'Note retrieval failed');

      // Test the email formatting
      return formatEmail(bundle);
    })
    .then((result) => {
      assert(result.emailContent === bundle.inputData.emailContent, 'Email formatting failed');

      // Test the email customization
      return customizeTemplate(bundle);
    })
    .then((result) => {
      assert(result.customizedEmailContent === bundle.inputData.emailContent.replace('[Your Name]', 'John Doe'), 'Email customization failed');

      // Test the recipient list setup
      return setupRecipientList(bundle);
    })
    .then((result) => {
      assert(result.recipientList === bundle.inputData.recipientList, 'Recipient list setup failed');

      // Test the email sending
      return sendEmail(bundle);
    })
    .then((result) => {
      assert(result.emailSent === true, 'Email sending failed');

      console.log('All tests passed successfully');
    })
    .catch((error) => {
      console.error('Test failed:', error);
    });
};

// Run the test
testZap();
```
