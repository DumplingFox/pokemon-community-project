const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
      enum: ["Africa", "Asia", "Australia", "Europe", "Middle East", "North America", "South America", "New Zealand"]
    },
    imgUrl: {
      type: String,
      required: false,
      default: "picture of pikachu or smth" // remember to insert an image here
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
