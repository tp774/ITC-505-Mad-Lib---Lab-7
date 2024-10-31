const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Route for random number generation
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Set up static file serving from the "public" folder
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Define server port
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}
server.post('/ITC505/lab-7/index.html', (req, res) => {
    // Extract form data from the request body
    const { noun, verb, adjective, place, pluralNoun } = req.body;

    // Check if any field is missing, and send an error message if so
    if (!noun || !verb || !adjective || !place || !pluralNoun) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
        `);
        return;
    }

    // Construct the Mad Lib text using the input data
    const madLib = `Once upon a time, in a ${adjective} ${place}, there was a ${noun} who loved to ${verb} with ${pluralNoun}.`;

    // Send back the filled-in Mad Lib as the response
    res.send(`
        <h1>Submission Successful</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
});

server.listen(port, () => console.log('Server is ready on localhost!'));
