var express = require("express");
const indexController = require("../controllers/indexController");
var router = express.Router();

/* GET home page. */
router.get("/", indexController.showLogin);

router.post("/", indexController.login);

//localhost:3000/home
router.get("/home/:town_id");

module.exports = router;
