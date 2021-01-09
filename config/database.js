const mongoose = require("mongoose");
const process = require('dotenv').config();
const Env = process.parsed;

const driverConnect = (app) => {
  const url =  Env.DB_URL + "/" + Env.DB_NAME;
  console.log("Establish new connection with url", url);
  mongoose.Promise = global.Promise;
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);
  mongoose
    .connect(url)
    .then((result) => {
      const server = app.listen(Env.PORT);
      const io = require("./socket").init(server);
      io.on("connection", (socket) => {
        console.log("Client connected");
      });
    })
    .catch((err) => console.log(err));
};

let instance = null;
class Connection {
  constructor() {
    this._conn = null;
  }

  get conn() {
    return this._conn;
  }

  connect(app) {
    this._conn = driverConnect(app);
  }

  static init() {
    if (!instance) {
      instance = new Connection();
    }

    return instance;
  }
}
module.exports = Connection.init();
