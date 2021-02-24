const mongoose = require("mongoose");

const empolyeeSchema = new mongoose.Schema({
  emp_id: {
    type: Number,
    required: true,
    min: 0,
  },
  emp_name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  emp_designation: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  owner_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Employee", empolyeeSchema);
