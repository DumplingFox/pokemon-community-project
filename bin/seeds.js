const mongoose = require('mongoose');
const Book = require('../models/pokemon.model');

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