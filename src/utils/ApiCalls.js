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
  getPendingOrders(user_id) {
    const  authorization  =  localStorage.getItem("authorization");
    let options={
      headers: {
        Authorization: authorization
      }
    }
    return axios
      .get(`${global.baseUrl}/customer-pending-orders/${user_id}`,options)
      .then((response) => {
       return response.data
      });
  },
  getActivityOrders(user_id) {
    const  authorization  =  localStorage.getItem("authorization");
    let options={
      headers: {
        Authorization: authorization
      }
    }
    return axios
      .get(`${global.baseUrl}/customer-activity-orders/${user_id}`,options)
      .then((response) => {
       return response.data
      });
  },
  sendRequestToDriver(payload) {
    const  authorization  =  localStorage.getItem("authorization");
    let options={
      headers: {
        Authorization: authorization
      }
    }
    return axios
      .put(`${global.baseUrl}/send-request-to-driver`, payload,options)
      .then((response) => {
       return response.data
      });
  },

}

export default commonUtils;
