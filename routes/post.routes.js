const express = require("express");
const router = express.Router();

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

router.post("/community/post/create", (req, res, next) => {

    const postDetails = {
        title: req.body.title,
        content: req.body.content,
    }

    PostSomething.create(postDetails)
        .then(responseFromDB => {
            res.redirect("/community");
        })
        .catch(e => {
            console.log("error creating posts from DB", e);
            next(e);
        })
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

router.post("/community/post/:postId/edit", (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    PostSomething.findByIdAndUpdate(postId, { title, content }, { new: true })
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