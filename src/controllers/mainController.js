let path = require("path");
const controller = {
    home: (req, res) => { 
    //     console.log("hola")
    // let logged 
    // if (req.cookies.userEmail) {
    //   logged = true
    // } 
    let ruta = path.resolve(__dirname, "../views/index");
        // res.render(ruta, { logged });
        res.render(ruta);
  }
}

module.exports = controller;