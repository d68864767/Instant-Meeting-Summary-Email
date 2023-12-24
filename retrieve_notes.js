```javascript
// Import the necessary libraries
const zapier = require('zapier-platform-core');
const Evernote = require('evernote');

// Configure Evernote client
const client = new Evernote.Client({ token: process.env.EVERNOTE_TOKEN, sandbox: false });

// Get the note store
const noteStore = client.getNoteStore();

// Define the Zap action
const retrieveNotes = (z, bundle) => {
  return new Promise((resolve, reject) => {
    // Get the most recent note
    noteStore.findNotesMetadata(client.token, new Evernote.NoteFilter(), 0, 1, new Evernote.NotesMetadataResultSpec())
      .then((notesMetadataList) => {
        if (notesMetadataList.notes.length > 0) {
          const noteGuid = notesMetadataList.notes[0].guid;

          // Get the full note
          noteStore.getNote(client.token, noteGuid, true, false, false, false)
            .then((note) => {
              // Resolve the promise with the note content
              resolve({ noteContent: note.content });
            })
            .catch((error) => {
              console.error('Error retrieving note:', error);
              reject(error);
            });
        } else {
          console.error('No notes found');
          reject(new Error('No notes found'));
        }
      })
      .catch((error) => {
        console.error('Error finding notes:', error);
        reject(error);
      });
  });
};

// Register the Zap action
zapier.createAction('retrieve_notes', retrieveNotes)
  .then((result) => {
    console.log('Action registered successfully');
  })
  .catch((error) => {
    console.error('Error registering action:', error);
  });
```
