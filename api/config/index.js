const dotEnv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV !== "prod") {
  const configFile = "../../.env." + process.env.NODE_ENV;
  dotEnv.config({ path: path.resolve(__dirname, configFile) });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URL,
};
