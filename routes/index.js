const authRoutes = require("./auth");
const postRoutes = require("./post");

const route = (app) => {
  app.get("/", function (req, res, next) {
    res.send("UnAuthorized");
  });
  app.use("/auth", authRoutes);
  app.use("/post", postRoutes);
};

module.exports = route;