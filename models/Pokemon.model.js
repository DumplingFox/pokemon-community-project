const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["Bug", "Dragon", "Electric", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Water"],
        },
        species: {
            type: String,
            required: true
        },
        indexNumber: {
            type: Number,
            min: 1, 
            required: true
        }, 
        height: Number,
        weight: Number, 
        imgUrl: {
            type: String
        }
    }
)

const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;