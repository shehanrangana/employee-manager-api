const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3, // set to 3 since initial data has names that length less than 6 characters
      maxLength: 10,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3, // set to 3 since initial data has names that length less than 6 characters
      maxLength: 10,
    },
    email: {
      type: String,
    },
    number: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["M", "F", ""],
    },
    photo: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
