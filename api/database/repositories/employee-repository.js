const { NotFoundError, ConflictError } = require("../../utils/app-errors");
const Employee = require("../models/Employee");

/**
 * @async
 * @param {string} orderBy
 * @param {string} order
 * @returns
 */
exports.find = async (orderBy, order) => {
  // to avoid sort by not defined fields and control which fields can be used to sort
  const orderByValues = { firstName: 1, lastName: 1, email: 1, number: 1, gender: 1 };
  // to avoid sort by not defined orders and control which order can be used to sort
  const orderValues = { asc: 1, desc: 1 };

  let employees = [];

  if (orderByValues[orderBy] && orderValues[order]) {
    employees = await Employee.find()
      .collation({ locale: "en" })
      .sort({ [orderBy]: [order] });
  } else {
    employees = await Employee.find();
  }

  return employees;
};

/**
 * @async
 * @param {Object} data
 * @returns
 */
exports.create = async (data) => {
  if (data.email) {
    const employee = await Employee.findOne({ email: data.email });

    if (employee) {
      throw new ConflictError("Email address is already in use");
    }
  }

  const newEmployee = new Employee(data);
  const result = await newEmployee.save();
  return result;
};

/**
 * @async
 * @param {string} id
 * @param {Object} data
 * @returns
 */
exports.update = async (id, data) => {
  const employee = await Employee.findById(id);

  if (!employee) {
    throw new NotFoundError("Employee not found");
  }

  const { firstName, lastName, email, number, gender } = data;

  // If email is changed, check whether new email already is use
  if (email && email !== employee.email) {
    const prevEmployee = await Employee.findOne({ email });

    if (prevEmployee) {
      throw new ConflictError("Email address is already in use");
    }
  }

  employee.firstName = firstName;
  employee.lastName = lastName;
  employee.email = email;
  employee.number = number;
  employee.gender = gender;

  const result = await employee.save();
  return result;
};

/**
 * @async
 * @param {string} id
 * @returns
 */
exports.findById = async (id) => {
  const employee = await Employee.findById(id);

  if (!employee) {
    throw new NotFoundError("Employee not found");
  }

  return employee;
};

/**
 * @async
 * @param {string} id
 * @returns
 */
exports.delete = async (id) => {
  const employee = await Employee.findById(id);

  if (!employee) {
    throw new NotFoundError("Employee not found");
  }

  const result = await Employee.deleteOne({ _id: id });
  return result;
};
