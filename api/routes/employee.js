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
    body("firstName").notEmpty().isAlpha().isLength({ min: 3, max: 10 }), // set min=3 since initial data has names that length less than 6 characters
    body("lastName").notEmpty().isLength({ min: 3, max: 10 }), // set min=3 since initial data has names that length less than 6 characters
    body("email").optional({ checkFalsy: true }).isEmail(),
    body("number").optional({ checkFalsy: true }).isMobilePhone("si-LK"),
    body("gender").optional({ checkFalsy: true }).isIn(["M", "F", ""]),
  ]),
  EmployeeController.createEmployee
);

router.put(
  "/:empId",
  validate([
    body("firstName").notEmpty().isAlpha().isLength({ min: 3, max: 10 }), // set min=3 since initial data has names that length less than 6 characters
    body("lastName").notEmpty().isLength({ min: 3, max: 10 }), // set min=3 since initial data has names that length less than 6 characters
    body("email").optional({ checkFalsy: true }).isEmail(),
    body("number").optional({ checkFalsy: true }).isMobilePhone("si-LK"),
    body("gender").optional({ checkFalsy: true }).isIn(["M", "F", ""]),
  ]),
  EmployeeController.updateEmployee
);

router.get("/:empId", EmployeeController.getEmployeeById);

router.delete("/:empId", EmployeeController.deleteEmployee);

module.exports = router;
