const express = require("express");
const cors = require("cors");
const { PORT } = require("./api/config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());

const startServer = () => {
  app.get("/", (req, res) => {
    res.send("Employee Manager API is working");
  });

  // Handle 404
  app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });

  // Catch errors
  app.use((error, req, res, next) => {
    res.status(error.status || 500).json(error);
  });

  app.listen(PORT, () => {
    console.log(`Employee Manager API is running on port ${PORT}`);
  });
};

startServer();
