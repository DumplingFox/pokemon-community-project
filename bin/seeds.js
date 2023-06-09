const mongoose = require('mongoose');
const Pokemon = require('../models/pokemon.model');

const MONGO_URI = "mongodb+srv://pokemon:ilovepokemon@cluster0.1hutlhz.mongodb.net/pokemon?retryWrites=true&w=majority";

const fs = require("fs");
const Papa = require("papaparse");

const csvFilePath = "./bin/pokeDataset.csv";

// Read the CSV file
const csvFile = fs.readFileSync(csvFilePath, "utf8");

// Parse the CSV data into an array of JavaScript objects
const { data } = Papa.parse(csvFile, { header: true });

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
        return Pokemon.deleteMany({})
    })
    .then((response) => {
        console.log(response);

        return Pokemon.insertMany(data);
    })
    .then(pokemonFromDB => {
        console.log(`Created ${pokemonFromDB.length} pokemon`)
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error connecting to DB: ", err);
    });