const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/my-account", (req, res, next) => {
  res.render("users/my-account.hbs");
})

module.exports = router;
