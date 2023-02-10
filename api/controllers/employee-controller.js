const EmployeeService = require("../services/employee-service");
const { STATUS_CODES } = require("../utils/enums");

/**
 * @async
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
exports.getEmployees = async (req, res, next) => {
  try {
    const { orderBy, order } = req.query;
    const data = await EmployeeService.getEmployees(orderBy, order);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * @async
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
exports.createEmployee = async (req, res, next) => {
  try {
    const payload = req.body;

    const data = await EmployeeService.createEmployee(payload);
    return res.status(STATUS_CODES.CREATED).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * @async
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
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

/**
 * @async
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
exports.getEmployeeById = async (req, res, next) => {
  try {
    const employeeId = req.params.empId;

    const data = await EmployeeService.getEmployeeById(employeeId);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * @async
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.empId;

    await EmployeeService.deleteEmployee(employeeId);

    return res.status(STATUS_CODES.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};
