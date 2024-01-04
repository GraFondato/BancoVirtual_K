// En authMiddleware.js
function authMiddleware(req, res, next) {
    console.log("Middleware de autenticación ejecutado");
    if (!req.session.userLogged) {
        console.log("Redirigiendo a /users/profile");
        return res.redirect('/users/profile');
    }
    next();
}

module.exports = authMiddleware;