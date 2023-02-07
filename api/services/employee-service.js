const EmployeeRepository = require("../database/repositories/employee-repository");

exports.getEmployees = async () => {
  const result = await EmployeeRepository.find();
  return result;
};

exports.createEmployee = async (data) => {
  const result = await EmployeeRepository.create(data);
  return result;
};

exports.updateEmployee = async (id, data) => {
  const result = await EmployeeRepository.update(id, data);
  return result;
};

exports.deleteEmployee = async (id) => {
  const result = await EmployeeRepository.delete(id);
  return result;
};
