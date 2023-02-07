const { NotFoundError, ConflictError } = require("../../utils/app-errors");
const Employee = require("../models/Employee");

exports.find = async () => {
  const employees = await Employee.find();
  return employees;
};

exports.create = async (data) => {
  const employee = await Employee.findOne({ email: data.email });

  if (employee) {
    throw new ConflictError("Email address is already in use");
  }

  const newEmployee = new Employee(data);
  const result = await newEmployee.save();
  return result;
};

exports.update = async (id, data) => {
  const employee = await Employee.findById(id);

  if (!employee) {
    throw new NotFoundError("Employee not found");
  }

  const { firstName, lastName, email, number, gender, photo } = data;

  // If email is changed, check whether new email already is use
  if (email !== employee.email) {
    const prevEmployee = await Employee.findOne({ email });

    if (prevEmployee) {
      throw new ConflictError("Email address is already in use");
    }
  }

  employee.firstName = firstName || employee.firstName;
  employee.lastName = lastName || employee.lastName;
  employee.email = email || employee.email;
  employee.number = number || employee.number;
  employee.gender = gender || employee.gender;
  employee.photo = photo || employee.photo;

  const result = await employee.save();
  return result;
};

exports.delete = async (id) => {
  const employee = await Employee.findById(id);

  if (!employee) {
    throw new NotFoundError("Employee not found");
  }

  const result = await Employee.deleteOne({ _id: id });
  return result;
};
