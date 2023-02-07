const EmployeeService = require("../services/employee-service");
const { STATUS_CODES } = require("../utils/enums");

exports.getEmployees = async (req, res, next) => {
  try {
    const data = await EmployeeService.getEmployees();
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const payload = req.body;

    const data = await EmployeeService.createEmployee(payload);
    return res.status(STATUS_CODES.CREATED).json(data);
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.empId;
    const payload = req.body;

    const data = await EmployeeService.updateEmployee(employeeId, payload);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.empId;

    await EmployeeService.deleteEmployee(employeeId);

    return res.status(STATUS_CODES.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};
