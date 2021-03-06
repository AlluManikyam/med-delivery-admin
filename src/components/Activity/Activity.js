import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import commonUtils from "../../utils/ApiCalls.js";
let moment = require("moment");

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ActivityTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.orders);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("name")}
                className={getClassNamesFor("name")}
              >
                CUSTOMER NAME
              </button>
            </th>
            <th>
              {" "}
              <button
                type="button"
                onClick={() => requestSort("phone")}
                className={getClassNamesFor("phone")}
              >
                PHONE
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("created_date")}
                className={getClassNamesFor("created_date")}
              >
                ORDER ON
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("created_date")}
                className={getClassNamesFor("created_date")}
              >
                DELIVERED ON
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("amount_status")}
                className={getClassNamesFor("amount_status")}
              >
                AMOUNT STATUS
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("amount")}
                className={getClassNamesFor("amount")}
              >
                AMOUNT
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("driver_name")}
                className={getClassNamesFor("driver_name")}
              >
                DRIVER NAME
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("delivery_status")}
                className={getClassNamesFor("delivery_status")}
              >
                DELIVERY STATUS
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, key) => (
            <tr key={key}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>
                {moment(new Date(item.created_date)).format("DD MMM YYYY")}
              </td>
              <td className="text-center">-</td>
              <td className="text-center">-</td>
              <td className="text-center">${item.amount}</td>
              <td className="text-center">-</td>
              <td>{item.delivery_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="d-flex justify-content-center">
        <button className="row btn btn-info load-more-button">Load More</button>
      </div> */}
    </>
  );
};

export default function Activity() {
  const [date, setDate] = useState(null);
  const [activityList, setActivityList] = useState([]);
  useEffect(() => {
    let user_id = JSON.parse(localStorage.getItem("userData"))._id;
    commonUtils.getActivityOrders(user_id).then((response) => {
      if (response && response.status === "success") {
        setActivityList(response.data);
      }
    });
  }, []);

  return (
    <>
      {activityList && activityList.length > 0 ? (
        <div className="container">
          <div className="row">
            <div className="orders">Activity</div>
          </div>
          <div className="row py-3 align-items-center">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Search"
                className="search-bar"
              ></input>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center">
              <div className="order-date-picker mr-3">
                <DatePicker
                  className="w-100"
                  onChange={setDate}
                  value={date}
                  yearPlaceholder="yyyy"
                  monthPlaceholder="mm"
                  dayPlaceholder="dd"
                />
              </div>
            </div>
          </div>
          <ActivityTable orders={activityList} />
        </div>
      ) : (
        <div className="dashboard hv-85 align-items-center">
          <div>
            <img
              className="no-orders-icon"
              alt="no-activity"
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
