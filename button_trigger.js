```javascript
// Import the necessary libraries
const zapier = require('zapier-platform-core');
const FlicClient = require('fliclib/clientlib');

// Create a new Flic client
const client = new FlicClient('localhost', 5551);

// Add a new button
client.once('ready', () => {
  console.log('Flic client is ready');

  // Replace 'myButton' with the actual button ID
  const button = new FlicClient.FlicButton('myButton', client);

  button.on('buttonSingleOrDoubleClickOrHold', (clickType, wasQueued, timeDiff) => {
    if (clickType === 'ButtonSingleClick') {
      console.log('Button was clicked');

      // Trigger the Zap
      zapier.createTrigger('button_press', { buttonId: 'myButton' })
        .then((result) => {
          console.log('Zap triggered successfully');
        })
        .catch((error) => {
          console.error('Error triggering Zap:', error);
        });
    }
  });
});

client.on('error', (error) => {
  console.error('Flic client error:', error);
});

client.on('bluetoothControllerStateChange', (state) => {
  console.log('Bluetooth Controller state change:', state);
});

client.start();
```
