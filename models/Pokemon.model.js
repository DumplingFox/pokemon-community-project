const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type1: {
            type: String,
            enum: ["bug", "dragon", "electric", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "water"],
            required: true
        },
        type2: {
            type: String,
            enum: ["bug", "dragon", "electric", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "water", ""],
            required: false,
            default: ''
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
        },
        hp: Number,
        attack: Number, 
        defense: Number,
        spAtk: Number,
        spDef: Number,
        speed: Number,
        likes: { 
            type: Number,
             default: 0 
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;