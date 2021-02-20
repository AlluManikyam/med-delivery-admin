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

  addOrder(payload) {
    const  authorization  =  localStorage.getItem("authorization");
    let options={
      headers: {
        Authorization: authorization
      }
    }
    return axios
      .post(`${global.baseUrl}/customer-order`, payload,options)
      .then((response) => {
       return response.data
      });
  },
  getOrders(user_id) {
    const  authorization  =  localStorage.getItem("authorization");
    let options={
      headers: {
        Authorization: authorization
      }
    }
    return axios
      .get(`${global.baseUrl}/customer-order/${user_id}`,options)
      .then((response) => {
       return response.data
      });
  },
};

export default commonUtils;
