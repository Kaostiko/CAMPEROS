var express = require("express");
const townController = require("../controllers/townController");
var router = express.Router();
const upLoadImage = require("../middlewares/multer");

// GET TOWN PAGE
router.get("/", townController.viewHome);

// GET USER PAGE
router.get("/town_user", townController.viewHome_user);

// Get formulario de alta pueblo
router.get("/formTown", townController.getFormTown);

//Enviar formulario a BBDD
router.post(
  "/createFormTown",
  upLoadImage("town"),
  townController.createFormTown
);

//Ver solo un pueblo
router.get("/oneTown/:town_id", townController.showOneTown);

//Ver solo un pueblo user(camper)
router.get("/oneTown_user/:town_id", townController.showOneTown_user);

//Ver formulario para editar pueblo
router.get(
  "/showEditTown/:town_id",
  upLoadImage("town"),
  townController.showFormEditTown
);

router.post(
  "/formEditTown/:town_id",
  upLoadImage("town"),
  townController.formEditTown
);

//eliminar pueblo
router.get("/deleteTown/:town_id", townController.deleteTown);

module.exports = router;
