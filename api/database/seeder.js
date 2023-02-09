const Employee = require("./models/Employee");
const employees = require("./employees.json");

module.exports = async () => {
  try {
    const data = await Employee.find().exec();

    if (data.length !== 0) {
      return;
    }

    await Employee.insertMany(employees);
    console.log("Data seed success");
  } catch (error) {
    console.error("Data seed failed");
  }
};
