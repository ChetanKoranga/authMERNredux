const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../model/user");
const Employee = require("../model/employee");
const { employeeDataValidation } = require("../validation");

router.post("/create", async (req, res) => {
  // validate the user
  const owner_id = jwt.decode(req.headers.token).id;
  const { error } = employeeDataValidation(req.body);
  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  const isIdExist = await User.findOne({ emp_id: req.body.emp_id });
  if (isIdExist) {
    return res.status(400).json({ error: "Employee ID already exists." });
  }

  const employee = new Employee({
    emp_id: req.body.emp_id,
    emp_name: req.body.emp_name,
    emp_designation: req.body.emp_designation,
    owner_id: owner_id,
  });

  try {
    const savedEmployee = await employee.save();
    res.json({ error: null, data: savedEmployee });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
