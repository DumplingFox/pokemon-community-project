module.exports = (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
    if (!req.params.recipeId) {
        return res.redirect("/auth/login");
    } else {
        return req.params.recipeId;
        next();
    }


};