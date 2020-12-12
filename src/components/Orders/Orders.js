import React from "react";
import MaterialTable from "material-table";
let users = require("../../constants/users.json");

function Orders() {
  return (
    <>
      {users && users.user.length > 0 ? (
        <div className="w-100">
          <div className="orders">Orders</div>
          <div className="dashboard">
            <MaterialTable
              title=""
              columns={[
                { title: "Id", field: "id" },
                { title: "Name", field: "name" },
                { title: "Age", field: "age" },
                { title: "Gender", field: "gender" },
                { title: "Email", field: "email" },
                { title: "PhoneNo", field: "phoneNo" },
              ]}
              data={users.user}
            />
          </div>
        </div>
      ) : (
        <div className="dashboard hv-100 align-items-center">
        <div>
          <img className="no-orders-icon" alt="no-orders" src="/images/icons/no-orders@3x.png" />
          <div className="no-orders-title">No Orders</div>
          <div className="you-dont-have-any-orders-right-now">You don’t have any orders right now.</div>
          <button type="submit" className="row btn btn-info new-order">
            Add New Order
          </button>
        </div>
        </div>
      )}
    </>
  );
}

export default Orders;
