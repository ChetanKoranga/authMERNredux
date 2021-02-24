import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { ADD_EMPLOYEE } from "./types";

// GET EMPLOYEES

// DELETE EMPLOYEE

// ADD EMPLOYEE
export const addEmployee = (mployee) => (dispatch, getState) => {
  const employee = JSON.stringify(mployee);
  axios
    .post(
      "http://localhost:3001/employee/create",
      employee,
      tokenConfig(getState),
    )
    .then((res) => {
      dispatch(createMessage({ addEmployee: "Employee Added" }));
      dispatch({
        type: ADD_EMPLOYEE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status)),
    );
};
