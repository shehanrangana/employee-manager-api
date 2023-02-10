const { create } = require("../../api/database/repositories/employee-repository");
const Employee = require("../../api/database/models/Employee");
const { ConflictError } = require("../../api/utils/app-errors");

jest.mock("../../api/database/models/Employee");

it("Should return ConflictError when email address already in use when creating a new employee", async () => {
  Employee.findOne.mockImplementationOnce(() => ({
    _id: 1,
    firstName: "",
    lastName: "",
    email: "test@example.com",
    number: "",
    gender: "",
  }));

  const data = { firstName: "fake name", lastName: "fake name", email: "test@example.com", number: "", gender: "" };
  const func = async () => await create(data);
  await expect(func).rejects.toThrow(ConflictError);
});
