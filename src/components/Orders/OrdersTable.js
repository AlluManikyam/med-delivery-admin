import React, { useEffect, useState } from "react";
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

export default function OrdersTable(props) {
  const {readyToDeliveryListRecords,sendReadyToDeliveryList}=props
  const [readyToDeliveryList, setReadyToDeliveryList] = useState([]);

  const { items, requestSort, sortConfig } = useSortableData(
    props.customerOrders
  );

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  useEffect(() => {
    console.log("readyToDeliveryList..",readyToDeliveryList);
    sendReadyToDeliveryList(readyToDeliveryList);
  }, [readyToDeliveryList,sendReadyToDeliveryList]);

  useEffect(() => {
    sendReadyToDeliveryList(readyToDeliveryListRecords);
    setReadyToDeliveryList(readyToDeliveryListRecords)
  }, [sendReadyToDeliveryList,readyToDeliveryListRecords]);

  const prepareReadyToDeliveryItems = (record) => {
    let deliveryList = readyToDeliveryList.filter((rdl) => {
      return rdl._id === record._id;
    });
    if (deliveryList.length) {
      setReadyToDeliveryList(
        readyToDeliveryList.filter((rdl) => {
          return rdl._id !== record._id;
        })
      );
    } else {
      setReadyToDeliveryList([...readyToDeliveryList, record]);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
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
                onClick={() => requestSort("quarantine_status")}
                className={getClassNamesFor("quarantine_status")}
              >
                QUARANTINE
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
              <td>
                <input
                  type="checkbox"
                  onChange={() => prepareReadyToDeliveryItems(item)}
                  style={{ width: 15, height: 15,cursor:"pointer" }}
                  checked={readyToDeliveryListRecords.some(rdl => rdl._id === item._id)}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>
                {moment(new Date(item.created_date)).format("DD MMM YYYY")}
              </td>
              <td>{item.quarantine_status ? "Yes" : "No"}</td>
              <td>${item.amount}</td>
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
}
