const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json'); // Path to your Firebase service account key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://real-time-chat-app-69ceb-default-rtdb.firebaseio.com"
});

const app = express();
app.use(cors());
app.use(express.json());

const db = admin.database();
const messagesRef = db.ref('messages');

// app.get('/messages', (req, res) => {
//     messagesRef.once('value', snapshot => {
//         console.log(snapshot.val())
//         const messages = snapshot.val();
//         res.json(messages);
//     });
// });

app.post('/messages', (req, res) => {
    messagesRef.push(req.body, error => {
        if (error) {
            res.status(500).json({ error: 'Failed to send message.' });
        } else {
            res.status(200).json({ success: true });
        }
    });
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
