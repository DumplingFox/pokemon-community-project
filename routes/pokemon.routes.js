const express = require('express');
const Pokemon = require('../models/Pokemon.model');

const router = express.Router();

// READ: route to access pokemon list
router.get("/pokemon", (req, res, next) => {
    Pokemon.find()
        .then(pokemonArr => {

            const data = {
                pokemonList: pokemonArr
            }

            res.render("pokemon/pokemon.hbs", data)
        })
        .catch(e => {
            console.log("error getting pokemon from DB", e);
            next(e);
        });
})

// CREATE: route to get pokemon create form
router.get("/pokemon/create", (req, res, next) => {

    const typeEnum = Pokemon.schema.path('type').enumValues;
    const regionEnum = Pokemon.schema.path('region').enumValues;

    res.render("pokemon/pokemon-create", { typeEnum, regionEnum });
})

// CREATE: route to post newly created pokemon
router.post("/pokemon/create", (req, res, next) => {

    const pokemonDetails = {
        name: req.body.name,
        type: req.body.type,
        species: req.body.species,
        indexNumber: req.body.indexNumber,
        height: req.body.height,
        weight: req.body.weight,
        regionalExclusive: req.body.regionalExclusive,
        region: req.body.region,
        imgUrl: req.body.imgUrl
    }

    Pokemon.create(pokemonDetails)
        .then(pokemonCard => {
            res.redirect("/pokemon")
        })
        .catch(e => {
            console.log("error creating new pokemon", e);
            next(e);
        });
})

// READ: route to access individual pokemon details
router.get("/pokemon/:pokemonId", (req, res, next) => {

    const pokemonId = req.params.pokemonId;

    Pokemon.findById(pokemonId)
        .then(pokemonDetails => {
            res.render("pokemon/pokemon-details.hbs", pokemonDetails)
        })
        .catch(e => {
            console.log("error getting pokemon details from DB", e);
            next(e);
        });
})


// UPDATE: 

// DELETE:


module.exports = router;