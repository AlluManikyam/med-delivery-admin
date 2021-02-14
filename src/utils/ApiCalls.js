import axios from "axios";
import global from "../constants/global";

// Get Indoor data api
let commonUtils = {
  login(payload) {
    // const  authorization  =  JSON.parse(localStorage.getItem("authorization"));
    return axios
      .post(`${global.baseUrl}/user/login`, payload)
      .then((response) => {
       return response.data
      });
  },
};

export default commonUtils;
