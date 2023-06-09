const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: false
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        likes: {
            type: Number,
            default: 0
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }


)

const Post = model("Post", postSchema);

module.exports = Post;