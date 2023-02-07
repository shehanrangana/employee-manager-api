const express = require("express");
const cors = require("cors");
const { PORT } = require("./api/config");
const dbConnection = require("./api/database/connection");

// import routes
const employeeRoutes = require("./api/routes/employee");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());

const startServer = () => {
  // Establish database connection
  dbConnection();

  // Routes
  app.use("/employee", employeeRoutes);

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
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json(error);
  });

  app.listen(PORT, () => {
    console.log(`Employee Manager API is running on port ${PORT}`);
  });
};

startServer();
