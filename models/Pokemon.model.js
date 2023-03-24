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
            required: true
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
        regionalExclusive: {
            type: Boolean
        },
        region: {
            type: String,
            enum: ["Africa", "Asia", "Australia", "Europe", "Middle East", "North America", "South America", "New Zealand"]
        },
        imgUrl: {
            type: String
        }
    }
)

const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;