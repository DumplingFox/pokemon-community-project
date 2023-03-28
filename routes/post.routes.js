const express = require("express");
const router = express.Router();
const app = express();
const multer = require('multer')

//importing mongoose schema file
const Upload = require("../models/Upload.model");

// require cloudinary
const fileUploader = require('../config/cloudinary.config');

//require post model
const PostSomething = require("../models/Post.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
// const isLoggedOut = require("../middleware/isLoggedOut");
// const isLoggedIn = require("../middleware/isLoggedIn");



//READ: list of posts from community
router.get("/community", (req, res, next) => {
    PostSomething.find()
        .then(postArr => {
            const data = {
                post: postArr
            }
            res.render("community/community", data)
        })
        .catch(e => {
            console.log("error getting posts from DB", e);
            next(e);
        })
})

//CREATE : GET post

router.get("/community/post/create", (req, res, next) => {

    res.render("community/post-create");

})

// CREATE: POST posts

router.post("/community/post/create", fileUploader.single('post-image'), (req, res, next) => {

    const { title, content } = req.body;
    if (req.file) {
        PostSomething.create({ title, content, imageUrl: req.file.path })
            .then(responseFromDB => {
                res.redirect("/community");
            })
            .catch(e => {
                console.log("error creating posts from DB", e);
                next(e);
            })
    } else {
        PostSomething.create({ title, content })
            .then(responseFromDB => {
                res.redirect("/community");
            })
            .catch(e => {
                console.log("error creating posts from DB", e);
                next(e);
            })

    }
})

//READ: post details
router.get("/community/post/:postId", (req, res, next) => {

    const { postId } = req.params;

    PostSomething.findById(postId)
        .then(postDetails => {
            res.render("community/post-details", postDetails);
        })
        .catch(e => {
            console.log("error getting post details from DB", e);
            next(e);
        });

});

// UPDATE: GET post

router.get("/community/post/:postId/edit", (req, res, next) => {
    const { postId } = req.params;

    let postDetails;

    PostSomething.findById(postId)
        .then(postFromDB => {
            postDetails = postFromDB; //update variable in the parent scope
            const data = {
                post: postDetails,
            }

            res.render('community/post-edit', data);

        })
        .catch(error => next(error));
});


// UPDATE: POST post

router.post("/community/post/:postId/edit", fileUploader.single('post-image'), (req, res, next) => {
    const { postId } = req.params;
    const { title, content, existingImage } = req.body;

    let imageUrl;

    if (req.file) {
        imageUrl = req.file.path;
    } else {
        imageUrl = existingImage;
    }

    PostSomething.findByIdAndUpdate(postId, { title, content, imageUrl }, { new: true })
        .then(updatedPost => {
            res.redirect(`/community/post/${updatedPost.id}`); //redirect to post details page
        })
        .catch(error => next(error));
});

//DELETE post
router.post('/community/post/:postId/delete', (req, res, next) => {
    const { postId } = req.params;

    PostSomething.findByIdAndDelete(postId)
        .then(() => res.redirect('/community'))
        .catch(error => next(error));
});




module.exports = router;