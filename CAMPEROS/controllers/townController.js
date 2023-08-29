const connection = require("../config/db");
const bcrypt = require("bcrypt");

class TownController {
  //vista town
  viewHome_user = (req, res) => {
    let sql =
      "SELECT * FROM town join city on town.city_id = city.city_id   join region on city.region_id = region.region_id ORDER BY region.region_name ASC ";

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("town_user", { result });
    });
  };

  viewHome = (req, res) => {
    let sql =
      "SELECT * FROM town join city on town.city_id = city.city_id   join region on city.region_id = region.region_id ORDER BY region.region_name ASC ";

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("town", { result });
    });
  };

  getFormTown = (req, res) => {
    let sql = "SELECT * FROM city";
    let sql2 = "SELECT * FROM region";

    connection.query(sql, (err, resultCity) => {
      if (err) throw err;
      connection.query(sql2, (err2, resultReg) => {
        if (err2) throw err2;
        res.render("formTown", { resultCity, resultReg });
      });
    });
  };

  createFormTown = (req, res) => {
    let { town_name, password, telephone, img, email, id_city, description } =
      req.body;
    console.log(req.body);
    img = req.file.filename;
    if (
      town_name === "" ||
      password === "" ||
      telephone === "" ||
      img === "" ||
      email === "" ||
      id_city === ""
    ) {
      return res.render("index", {
        message: "debes rellenar todos los campos",
      });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;

      let sql = `INSERT INTO town (town_name, password, telephone, img, email, city_id, description) VALUES ("${town_name}","${hash}","${telephone}","${img}", "${email}", ${id_city}, "${description}")`;

      connection.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect("/");
      });
    });
  };

  showOneTown = (req, res) => {
    let { town_id } = req.params;
    let sql = `SELECT * FROM town join city on town.city_id = city.city_id join region on city.region_id = region.region_id WHERE town_id = ${town_id};`;

    let sql2 = `SELECT * FROM activity WHERE town_id = ${town_id} and is_deleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      connection.query(sql2, (err2, result2) => {
        if (err2) throw err2;
        if (result2 != "") {
          res.render("oneTown", { result, result2 });
        } else {
          res.render("oneTownn", { result });
        }
      });
    });
  };

  showOneTown_user = (req, res) => {
    let { town_id } = req.params;
    let sql = `SELECT * FROM town join city on town.city_id = city.city_id join region on city.region_id = region.region_id WHERE town_id = ${town_id};`;

    let sql2 = `SELECT * FROM activity WHERE town_id = ${town_id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      connection.query(sql2, (err2, result2) => {
        if (err2) throw err2;
        if (result2 != "") {
          res.render("oneTown_user", { result, result2 });
        } else {
          res.render("oneTownn_user", { result });
        }
      });
    });
  };

  showFormEditTown = (req, res) => {
    let { town_id } = req.params;
    let sql = `SELECT * FROM town join city on town.city_id = city.city_id join region on city.region_id = region.region_id WHERE town_id = ${town_id};`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("editTown", { result });
    });
  };

  formEditTown = (req, res) => {
    let { town_name, password, telephone, email, description } = req.body;
    let { town_id } = req.params;

    let sql = `UPDATE town SET town_name = "${town_name}", password = "${password}", telephone = "${telephone}", email = "${email}", description = "${description}" WHERE town_id = ${town_id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE town SET town_name = "${town_name}", password = "${password}", telephone = "${telephone}", email = "${email}", description = "${description}", img = "${img}" WHERE town_id = ${town_id}`;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/town/oneTown/${town_id}`);
    });
  };

  deleteTown = (req, res) => {
    let { town_id } = req.params;

    let sql = `DELETE FROM town where town_id = ${town_id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("town");
    });
  };
}

module.exports = new TownController();
