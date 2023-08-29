const connection = require("../config/db");
const bcrypt = require("bcrypt");

class IndexController {
  //vista home - sin logear
  showLogin = (req, res) => {
    res.render("index");
  };

  // abrir perfil privado
  login = (req, res) => {
    const { email, password } = req.body;

    //Ver si está registrado - Usuario
    let sql = `SELECT * FROM town WHERE email = '${email}'`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length == 1) {
        let hash = result[0].password;

        //comprobar password y hash
        bcrypt.compare(password, hash, (err, resul) => {
          if (resul) {
            res.redirect(`/town/oneTown/${result[0].town_id}`);
          } else {
            console.log("Contraseña incorrecta");
            res.render("index", { message: "Contraseña incorrecta" });
          }
        });
      } else {
        res.render("index", { message: "El usuario no está dado de alta" });
      }
    });
  };

  /* viewHome = (req, res) => {
    let {town_id} =req.body;
    let sql = "SELECT * FROM town ";

    connection.query(sql, (err, result) => {
      // console.log("****************************", result);
      if (err) throw err;
      res.render("index", { result });
    });
  }; */
}

module.exports = new IndexController();
