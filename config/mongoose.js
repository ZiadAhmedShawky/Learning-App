const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const dbConnection = () => {
  mongoose.connect(
    process.env.DB_URI
  );
};
module.exports = dbConnection;
