// Simple Node.js server for serving the Object Detection Evolution interactive article
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`
-----------------------------------------------------------
    Object Detection Evolution Interactive Article Server
-----------------------------------------------------------
    Server running at http://localhost:${PORT}
    
    Press Ctrl+C to stop the server
-----------------------------------------------------------
`);
}); 