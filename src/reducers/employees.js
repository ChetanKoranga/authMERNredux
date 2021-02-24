import { ADD_EMPLOYEE } from "../actions/types";

const initialState = {
  employees: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    default:
      return state;
  }
}
