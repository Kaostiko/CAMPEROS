const connection = require("../config/db");

class ActivityController {
  //pagina con todas las actividades
  viewactivity = (req, res) => {
    let sql = `SELECT * FROM activity join town on town.town_id = activity.town_id join city on town.city_id = city.city_id   join region on city.region_id = region.region_id WHERE is_deleted = 0 ORDER BY activity_id DESC`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("activity", { result });
    });
  };

  viewactivity_user = (req, res) => {
    let sql = `SELECT * FROM activity join town on town.town_id = activity.town_id join city on town.city_id = city.city_id   join region on city.region_id = region.region_id WHERE is_deleted = 0 ORDER BY activity.activity_likes DESC`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(err);
      res.render("activity_user", { result });
    });
  };

  //Abrir formulario para una nueva actividades
  showFormActivity = (req, res) => {
    let { town_id } = req.params;
    res.render("showFormActivity", { town_id });
  };

  createActivity = (req, res) => {
    let town_id = req.params.town_id;
    let { activity_name, activity_type } = req.body;
    let img = req.file.filename;

    //console.log("Llego hasta aquiiiiiiiiiiiiiiii");
    let sql = `INSERT INTO activity (activity_name, activity_type, activity_img, town_id) VALUES ("${activity_name}", "${activity_type}", "${img}", ${town_id})`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.redirect(`/town/oneTown/${town_id}`);
    });
  };

  showFormEditActivity = (req, res) => {
    let { activity_id } = req.params;
    let sql = `SELECT * FROM activity WHERE activity_id = ${activity_id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("editActivity", { result });
    });
  };

  FormEditActivity = (req, res) => {
    let { activity_name, activity_type } = req.body;
    let { activity_id } = req.params;

    let sql = `UPDATE activity SET activity_name = "${activity_name}", activity_type = "${activity_type}" WHERE activity_id = ${activity_id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE activity SET activity_name = "${activity_name}", activity_type = "${activity_type}", activity_img = "${img}" WHERE activity_id = ${activity_id}`;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/activity`);
    });
  };

  deleteActivity = (req, res) => {
    let { activity_id } = req.params;
    let { town_id } = req.body;

    let sql = `DELETE FROM activity  WHERE activity_id = ${activity_id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/activity`);
    });
  };

  logicDeleteActivity = (req, res) => {
    let { activity_id } = req.params;
    let { town_id } = req.body;

    let sql = `UPDATE activity SET is_deleted = 1 WHERE activity_id = ${activity_id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/activity`);
    });
  };

  user_like = (req, res) => {
    let { activity_id } = req.params;
    let sql = `UPDATE activity set activity_likes = activity_likes + 1 where activity_id = ${activity_id}`;
    let sql2 = `SELECT * FROM activity join town on town.town_id = activity.town_id join city on town.city_id = city.city_id   join region on city.region_id = region.region_id WHERE is_deleted = 0`;

    connection.query(sql, (err, result1) => {
      if (err) throw err;
      connection.query(sql2, (err1, result) => {
        if (err1) throw err1;
        res.render("activity_user", { result });
      });
    });
  };

  /* oneActivity = (req, res) => {
    let { activity_id } = req.params;
    let { town_id } = req.body;

    let sql = `SELECT * FROM activity WHERE town_id = ${town_id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("onlyActivity", { result });
    });
  }; */
}

module.exports = new ActivityController();
