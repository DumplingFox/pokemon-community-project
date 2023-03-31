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
      if (!pokemon.likedBy) {
        pokemon.likedBy = [];
      }

      if (!pokemon.likedBy.includes(currentUser)) {
        pokemon.likes++;
        pokemon.likedBy.push(currentUser);
      } else {
        pokemon.likes--;
        pokemon.likedBy = pokemon.likedBy.filter((user) => user !== currentUser);
      }

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

// GET my account
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