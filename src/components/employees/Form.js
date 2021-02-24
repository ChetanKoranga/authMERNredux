import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addEmployee } from "../../actions/employees";

const Form = () => {
  const [emp_id, setEmp_id] = useState("");
  const [emp_name, setEmp_name] = useState("");
  const [emp_designation, setEmp_designation] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const employee = { emp_id, emp_name, emp_designation };

    dispatch(addEmployee(employee));
  };

  return (
    <div className="card card-body mt-4 mb-4">
      <h2>Add Employee</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            className="form-control"
            type="text"
            name="emp_id"
            onChange={(e) => {
              setEmp_id(e.target.value);
            }}
            value={emp_id}
          />
        </div>
        <div className="form-group">
          <label>Employee Name</label>
          <input
            className="form-control"
            type="text"
            name="emp_name"
            onChange={(e) => {
              setEmp_name(e.target.value);
            }}
            value={emp_name}
          />
        </div>
        <div className="form-group">
          <label>Employee Designation</label>
          <input
            className="form-control"
            type="text"
            name="emp_designation"
            onChange={(e) => {
              setEmp_designation(e.target.value);
            }}
            value={emp_designation}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
