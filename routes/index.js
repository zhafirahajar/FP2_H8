const route = require("express").Router();
const userControllers = require("../controllers/userControllers");

// USER REGIS - LOGIN ROUTE
route.post("/users/register", userControllers.register);
route.post("/users/login", userControllers.login);

// MIDDLEWARE CHECK TOKEN
route.use(userControllers.loginMiddleware);

// USER MANAGEMENT ROUTE
route.put("/users/:userId", userControllers.edit);
route.delete("/users/:userIde", userControllers.delete);

// PHOTOS ROUTE
route.post("/photos");
route.get("/photos");
route.put("/photos/:photoId");
route.delete("/photos/:photoId");

// COMMENTS ROUTE
route.post("/comments");
route.get("/comments");
route.put("/comments/:commentId");
route.delete("/comments/:commentId");

// SOCIAL MEDIAS ROUTE
route.post("/socialmedias");
route.get("/socialmedias");
route.put("/socialmedias/:socialmediaId");
route.delete("/socialmedias/:socialmediaId");

module.exports = route;
