// Get express and create an instance of it
const express = require('express');
const app = express();
// Get the routes 
const routes = require('./routes');

// Gets an available port from the process enviroment or defaults to port 3001
const PORT = process.env.PORT || 3001;

// Uses middleware to parse the json and url data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Uses middleware to access the public folder and the  routes
app.use(express.static('public'));
app.use('/', routes);


// Starts the server and listen to conections in the available port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});