const Employee = require("./models/Employee");

module.exports = async () => {
  try {
    const employees = require("./employees.json");

    // exit from function if intial data is empty
    if (!employees?.length) {
      return;
    }

    const data = await Employee.find().exec();

    // exit from function if database already has data
    if (data.length !== 0) {
      return;
    }

    await Employee.insertMany(employees);
    console.log("Data seed success");
  } catch (error) {
    console.error("Data seed failed");
  }
};
