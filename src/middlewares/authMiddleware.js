// En authMiddleware.js
function authMiddleware(req, res, next) {
    console.log("Middleware de autenticación ejecutado");
    if (!req.session.userLogged) {
        console.log("Redirigiendo a /users/login");
        return res.redirect('/users/login');
    }
    next();
}

module.exports = authMiddleware;