const authRoutes = require("./auth");
const feedRoutes = require("./feed");

const route = (app) => {
  app.get("/", function (req, res, next) {
    res.send("UnAuthorized");
  });
  app.use("/auth", authRoutes);
  app.use("/feed", feedRoutes);
};

module.exports = route;