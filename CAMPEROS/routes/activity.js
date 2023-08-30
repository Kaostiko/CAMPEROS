var express = require("express");
const activityController = require("../controllers/activityController");
const uploadImage = require("../middlewares/multer");
var router = express.Router();

//  GET activity page.
router.get("/", activityController.viewactivity);

//  GET user activity page.
router.get("/activity_user", activityController.viewactivity_user);

//Abrir formulario para nueva actividades

router.get("/formActivity/:town_id", activityController.showFormActivity);

//recibir información de la actividad
router.post(
  "/createActivity/:town_id",
  uploadImage("activity"),
  activityController.createActivity
);

// abrir formulario con datos para modificar
router.get(
  "/showEditActivity/:activity_id",
  activityController.showFormEditActivity
);

//Enviar formulario actualizando los datos
router.post(
  "/formEditActivity/:activity_id",
  uploadImage("activity"),
  activityController.FormEditActivity
);

//Borrado total
router.get("/deleteActivity/:activity_id", activityController.deleteActivity);

//Borrado logico
router.get(
  "/logicDeleteActivity/:activity_id",
  activityController.logicDeleteActivity
);

//User dar like a una actividad
router.get("/like_user/:activity_id", activityController.user_like);

//Obtener actividades nuevas
router.get("/filtro1", activityController.filtro_reciente);

//Obtener actividades más likes
router.get("/filtro2", activityController.filtro_likes);

//Obtener actividades nuevas
router.get("/filtro1User", activityController.filtro_reciente_user);

//Obtener actividades más likes
router.get("/filtro2User", activityController.filtro_likes_user);

// Solo una publicación
/* router.get("/onlyActivity/:activity_id", activityController.oneActivity); */
module.exports = router;
