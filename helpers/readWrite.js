// Require fs module with promises for async operations
const fs = require('fs').promises;

// Function to read and parse the data from the file
const Reader = async (file) => JSON.parse(await fs.readFile(file, 'utf-8'));

// Function to parse and write the data to the file
const Writer = async (file, newList) => await fs.writeFile(file, JSON.stringify(newList, null, 2));

// Exports the Reader and Writer functions
module.exports = {Reader, Writer};