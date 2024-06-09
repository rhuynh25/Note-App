// Importing necessary modules
const fs = require('fs'); // Module for file system operations
const chalk = require('chalk'); // Module for styling console output

// Function to add a new note
const addNote = (title, body) => {
    // Load existing notes from the file
    const notes = loadNotes();
    // Check if a note with the same title already exists
    const duplicateNote = notes.find((note) => note.title === title);

    // If no duplicate note found, add the new note
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        // Save the updated notes to the file
        saveNotes(notes);
        // Print success message
        console.log(chalk.green.inverse('New note added'));
    } else {
        // Print error message if note title is already taken
        console.log(chalk.red.inverse('Note title taken'));
    }
}

// Function to remove a note
const removeNote = (title) => {
    // Load existing notes from the file
    const notes = loadNotes();
    // Filter out the note with the specified title
    const notesToKeep = notes.filter((note) => note.title !== title);

    // If a note was removed, update the file
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed'));
        saveNotes(notesToKeep);
    } else {
        // Print error message if no note found with the specified title
        console.log(chalk.red.inverse('No note found'));
    }    
}

// Function to list all notes
const listNotes = () => {
    // Load existing notes from the file
    const notes = loadNotes();

    // Print header for the list of notes
    console.log(chalk.inverse('Your notes'));

    // Print titles of all notes
    notes.forEach((note) => {
        console.log(note.title);
    });
}

// Function to read a specific note
const readNote = (title) => {
    // Load existing notes from the file
    const notes = loadNotes();
    // Find the note with the specified title
    const note = notes.find((note) => note.title === title);

    // If note found, print its title and body
    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        // Print error message if note not found with the specified title
        console.log(chalk.red.inverse('Note not found'));
    }
}

// Function to save notes to the file
const saveNotes = (notes) => {
    // Convert notes array to JSON format
    const dataJSON = JSON.stringify(notes);
    // Write JSON data to the file
    fs.writeFileSync('notes.json', dataJSON);
}

// Function to load notes from the file
const loadNotes = () => {
    try {
        // Read data from the file
        const dataBuffer = fs.readFileSync('notes.json');
        // Convert data buffer to string
        const dataJSON = dataBuffer.toString();
        // Parse JSON data into JavaScript object (array of notes)
        return JSON.parse(dataJSON);
    } catch (e) {
        // If file not found or empty, return an empty array
        return [];
    }
}

// Exporting functions to be accessible from other modules
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}