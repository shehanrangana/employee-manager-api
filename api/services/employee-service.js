const EmployeeRepository = require("../database/repositories/employee-repository");

/**
 * @async
 * @param {string} orderBy
 * @param {string} order
 * @returns
 */
exports.getEmployees = async (orderBy, order) => {
  const result = await EmployeeRepository.find(orderBy, order);
  return result;
};

/**
 * @async
 * @param {Object} data
 * @returns
 */
exports.createEmployee = async (data) => {
  const result = await EmployeeRepository.create(data);
  return result;
};

/**
 * @async
 * @param {string} id
 * @param {Object} data
 * @returns
 */
exports.updateEmployee = async (id, data) => {
  const result = await EmployeeRepository.update(id, data);
  return result;
};

/**
 * @async
 * @param {string} id
 * @returns
 */
exports.getEmployeeById = async (id) => {
  const result = await EmployeeRepository.findById(id);
  return result;
};

/**
 * @async
 * @param {string} id
 * @returns
 */
exports.deleteEmployee = async (id) => {
  const result = await EmployeeRepository.delete(id);
  return result;
};
