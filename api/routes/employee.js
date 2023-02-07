const express = require("express");
const { body } = require("express-validator");
const validate = require("../middlewares/validator");

// import controllers
const EmployeeController = require("../controllers/employee-controller");

const router = express.Router();

router.get("/", EmployeeController.getEmployees);

router.post(
  "/",
  validate([
    body("firstName").notEmpty().isAlpha().isLength({ min: 3, max: 10 }),
    body("lastName").notEmpty().isLength({ min: 3, max: 10 }),
    body("email").isEmail(),
    body("number").isMobilePhone("si-LK"),
    body("gender").notEmpty().isIn(["M", "F"]),
  ]),
  EmployeeController.createEmployee
);

router.put(
  "/:empId",
  validate([
    body("firstName").notEmpty().isAlpha().isLength({ min: 3, max: 10 }),
    body("lastName").notEmpty().isLength({ min: 3, max: 10 }),
    body("email").isEmail(),
    body("number").isMobilePhone("si-LK"),
    body("gender").notEmpty().isIn(["M", "F"]),
  ]),
  EmployeeController.updateEmployee
);

router.delete("/:empId", EmployeeController.deleteEmployee);

module.exports = router;
