import React from "react";
import MaterialTable from "material-table";
let users = require("../../constants/users.json");

function Activity() {
  return (
    <>
      {users && users.user.length < 0 ? (
        <div className="w-100">
          <div className="orders">Activity</div>
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
            <img
              className="no-orders-icon"
              alt="no orders"
              src="/images/icons/no-activity@3x.png"
            />
            <div className="no-orders-title">No Activity</div>
            <div className="you-dont-have-any-orders-right-now">
              You don’t have any activity right now.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Activity;
