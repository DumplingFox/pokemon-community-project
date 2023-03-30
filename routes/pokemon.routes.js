const express = require('express');
const Pokemon = require('../models/Pokemon.model');
const app = express();
const multer = require('multer');
const Post = require('../models/Post.model')
const fileUploader = require('../config/cloudinary.config');

const router = express.Router();

// READ: entire list
router.get("/pokemon", (req, res, next) => {

  Pokemon.find()
    .then(pokemonArr => {

      const data = {
        pokemonList: pokemonArr,
        currentUser: req.session.currentUser
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

  const type1Enum = Pokemon.schema.path('type1').enumValues;
  const type2Enum = Pokemon.schema.path('type2').enumValues;

  res.render("pokemon/pokemon-create", { type1Enum, type2Enum });
})

// CREATE: post

router.post("/pokemon/create", fileUploader.single('poke-img'), (req, res, next) => {

  const { name, type1, type2, species, indexNumber, height, weight } = req.body;

  Pokemon.create({ name, type1, type2, species, indexNumber, height, weight, imgUrl: req.file.path })
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

  const type1Enum = Pokemon.schema.path('type1').enumValues;
  const type2Enum = Pokemon.schema.path('type2').enumValues;
  const pokemonId = req.params.pokemonId;

  Pokemon.findById(pokemonId)
    .then(pokemonToUpdate => {
      res.render('pokemon/pokemon-edit', { pokemon: pokemonToUpdate, type1Enum, type2Enum });
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

// LIKE pokemon
router.post("/pokemon/:pokemonId/like", (req, res) => {
  const pokemonId = req.params.pokemonId;
  const currentUser = req.session.currentUser;

  Pokemon.findById(pokemonId)
    .then((pokemon) => {
      if (!pokemon) {
        return res.status(404).send("Pokemon not found");
      }

      pokemon.likes++;
      pokemon.likedBy = currentUser;
      return pokemon.save();
    })
    .then(() => {
      res.redirect("/pokemon");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

router.get("/my-account", (req, res, next) => {
  const currentUserId = req.session.currentUser._id;
  let data = {};
  Promise.all([
    Pokemon.find({ likedBy: currentUserId }),
    Post.find({ likedBy: currentUserId }),
  ])
    .then(([likedPokemon, likedPost]) => {
      data = {
        pokemonList: likedPokemon,
        postList: likedPost,
        currentUser: req.session.currentUser,
      };
      res.render("users/my-account.hbs", data);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
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

module.exports = router;