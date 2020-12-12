import { STORE_LOGIN_DATA } from "./types";

export const storeLoginData = (data) => {
  return {
    type: STORE_LOGIN_DATA,
    data,
  };
};
