import React, { useState } from "react";
import DatePicker from "react-date-picker";
let users = require("../../constants/users.json");

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

const OrdersTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
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
                Name
              </button>
            </th>
            <th>
              {" "}
              <button
                type="button"
                onClick={() => requestSort("age")}
                className={getClassNamesFor("age")}
              >
                Age
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("gender")}
                className={getClassNamesFor("gender")}
              >
                Gender
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("phoneNo")}
                className={getClassNamesFor("phoneNo")}
              >
                Phone Number
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("email")}
                className={getClassNamesFor("email")}
              >
                Email
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.age}</td>
              <td>{item.gender}</td>
              <td>{item.phoneNo}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <button className="row btn btn-info load-more-button">Load More</button>
      </div>
    </>
  );
};

export default function Orders() {
  const [date, setDate] = useState(null);
  return (
    <>
      {users && users.user.length < 0 ? (
        <div className="container">
          <div className="row">
            <div className="orders">Orders</div>
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
              <button className="row btn btn-info new-order-button">
                Add New Order
              </button>
            </div>
          </div>
          <OrdersTable products={users.user} />
        </div>
      ) : (
        <div className="dashboard hv-100 align-items-center">
          <div>
            <img
              className="no-orders-icon"
              alt="no-orders"
              src="/images/icons/no-orders@3x.png"
            />
            <div className="no-orders-title">No Orders</div>
            <div className="you-dont-have-any-orders-right-now">
              You don’t have any orders right now.
            </div>
            <button type="submit" className="row btn btn-info new-order">
              Add New Order
            </button>
          </div>
        </div>
      )}
    </>
  );
}
