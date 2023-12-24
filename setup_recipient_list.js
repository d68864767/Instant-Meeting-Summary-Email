```javascript
// Import the necessary libraries
const zapier = require('zapier-platform-core');

// Define the Zap action
const setupRecipientList = (z, bundle) => {
  return new Promise((resolve, reject) => {
    // Get the meeting invite data from the previous action
    const meetingInvite = bundle.inputData.meetingInvite;

    // Extract the recipient list from the meeting invite
    let recipientList = [];
    meetingInvite.participants.forEach(participant => {
      recipientList.push(participant.email);
    });

    // Check if the recipient list is not empty
    if (recipientList.length > 0) {
      resolve({ recipientList: recipientList });
    } else {
      reject('Error: No recipients found in the meeting invite.');
    }
  });
};

// Register the Zap action
zapier.createAction('setup_recipient_list', setupRecipientList)
  .then((result) => {
    console.log('Action registered successfully');
  })
  .catch((error) => {
    console.error('Error registering action:', error);
  });
```
