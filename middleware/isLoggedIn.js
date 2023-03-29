module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  console.log(req.session.currentUser);
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }

  next();
};
