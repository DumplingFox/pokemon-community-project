const express = require('express');
const Pokemon = require('../models/Pokemon.model');

const router = express.Router();

// READ: entire list
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

// CREATE: get form
router.get("/pokemon/create", (req, res, next) => {

    const typeEnum = Pokemon.schema.path('type').enumValues;

    res.render("pokemon/pokemon-create", { typeEnum });
})

// CREATE: post
router.post("/pokemon/create", (req, res, next) => {

    const pokemonDetails = {
        name: req.body.name,
        type: req.body.type,
        species: req.body.species,
        indexNumber: req.body.indexNumber,
        height: req.body.height,
        weight: req.body.weight,
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

// UPDATE (get): 
router.get("/pokemon/:pokemonId/edit", (req, res, next) => {

    const typeEnum = Pokemon.schema.path('type').enumValues;
    const pokemonId = req.params.pokemonId;

    Pokemon.findById(pokemonId)
        .then(pokemonToUpdate => {
            res.render('pokemon/pokemon-edit', { pokemon: pokemonToUpdate, typeEnum });
    })
    .catch(e => {
        console.log("error getting pokemon details from DB", e);
        next(e);
      });
})

// UPDATE (post):
router.post('/pokemon/:pokemonId/edit', (req, res, next) => {

    const pokemonId = req.params.pokemonId;
    const { name, type, species, indexNumber, height, weight, imgUrl } = req.body;

    Pokemon.findByIdAndUpdate(pokemonId, { name, type, species, indexNumber, height, weight, imgUrl }, { new: true })
    .then(updatedPokemon => res.redirect(`/pokemon/${pokemonId}`))
    .catch(e => {
        console.log("error updating pokemon details", e);
        next(e);
      });
});

// DELETE
router.post("/pokemon/:pokemonId/delete", (req, res, next) => {
    const pokemonId = req.params.pokemonId; 

    Pokemon.findByIdAndDelete(pokemonId)
        .then(res.redirect("/pokemon"))
        .catch(e => {
            console.log("error deleting pokemon", e);
            next(e);
          });
})


// READ: pokemon details
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

module.exports = router;