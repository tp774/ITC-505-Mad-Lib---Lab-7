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

server.listen(port, () => console.log('Server is ready on localhost!'));
