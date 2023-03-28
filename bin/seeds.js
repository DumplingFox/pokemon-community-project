const mongoose = require('mongoose');
const Pokemon = require('../models/pokemon.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myproject';

const pokemon = [
    {
        name: "Bulbasaur",
        type: ["grass", "poison"],
        height: 0.7,
        weight: 6.9,
        imgUrl: "/images/pokemon-seeds/bulbasaur.png",
        species: "Seed Pokemon",
        indexNumber: 1
    },
    {
        name: 'Ivysaur',
        type: ['grass', 'poison'],
        height: 1,
        weight: 13,
        imgUrl: '/images/pokemon-seeds/ivysaur.png',
        species: 'Seed Pokemon',
        indexNumber: 2,
    },
    {
        name: 'Venusaur',
        type: ['grass', 'poison'],
        height: 2,
        weight: 100,
        imgUrl: '/images/pokemon-seeds/venusaur.png',
        species: 'Seed Pokemon',
        indexNumber: 3
    }
]

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );

        //return Pokemon.deleteMany({}); //WARNING: this will delete all pokemon in your DB !!

    })
    .then((response) => {
        console.log(response);

        return Pokemon.insertMany(pokemon);
    })
    .then(pokemonFromDB => {
        console.log(`Created ${pokemonFromDB.length} pokemon`);

        // Once created, close the DB connection
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error connecting to DB: ", err);
    });