const authRoutes = require("./auth");

const route = (app) => {
  app.get("/", function (req, res, next) {
    res.send("UnAuthorized");
  });
  app.use("/auth", authRoutes);
};

module.exports = route;