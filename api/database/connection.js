const mongoose = require("mongoose");
const { DB_URL } = require("../config");

module.exports = () => {
  try {
    mongoose.set("strictQuery", false);

    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db Connected!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
