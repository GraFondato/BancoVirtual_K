const path = require("path");

const rutaRegistro = path.resolve(__dirname, "../views/partials/users/register");

const controller = {
    register: (req, res) => {
        res.render(rutaRegistro);
    },
}

module.exports = controller;