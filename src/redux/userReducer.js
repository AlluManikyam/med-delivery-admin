import { initialState } from "./initialState";

export const user_reducer = (state = initialState, action) => {
  console.log("action...",action);

  switch (action.type) {
    case "STORE_LOGIN_DATA":
      return {
        ...state,
        loginData: action.data,
      };
    default:
      return state;
 
  }
};
