const { authenticate } = require("../config/jwt.config");
const Pirate = require("../controllers/Pirate.controllers");
const User = require("../controllers/User.controllers");

module.exports = (app) => {
    app.get("/api/pirates", Pirate.findAll);
    app.get("/api/pirates/:id", Pirate.findOne);
    app.post("/api/pirates", Pirate.create);
    app.post("/api/register", User.register);
    app.post("/api/login", User.login);
    app.put("/api/logout", User.logout);
    app.get("api/users", User.getAll);
    app.put("/api/pirates/:id", Pirate.update);
    app.delete("/api/pirates/:id", Pirate.delete)
}