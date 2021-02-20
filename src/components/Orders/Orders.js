import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import DatePicker from "react-date-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import commonUtils from "../../utils/ApiCalls.js";
import swal from "sweetalert";
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

const OrdersTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(
    props.customerOrders
  );
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
};

export default function Orders() {
  const [date, setDate] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [ordersList, setOrdersList] = useState([]);
  const [quarantineStatus, setQuarantineStatus] = useState(0);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    let user_id = JSON.parse(localStorage.getItem("userData"))._id;
    commonUtils.getOrders(user_id).then((response) => {
      if (response && response.status === "success") {
        setOrdersList(response.data);
      }
    });
  }, []);
  //! Add Maintenance
  const AddNewOrder = () => {
    setModal(!modal);
    setDate(new Date());
    setModalType("add");
  };
  const changeQuarantineStatus = (status) => {
    setQuarantineStatus(status);
  };
  const onSubmitNewOrder = (values) => {
    values.user_id = JSON.parse(localStorage.getItem("userData"))._id;
    values.quarantine_status = quarantineStatus;
    commonUtils.addOrder(values).then((response) => {
      if (response && response.status === "success") {
        swal({
          text: response.msg,
          icon: "success",
        });
        let user_id = JSON.parse(localStorage.getItem("userData"))._id;
        commonUtils.getOrders(user_id).then((response) => {
          if (response && response.status === "success") {
            setOrdersList(response.data);
          }
        });
      } else {
        swal({
          text: response.msg,
          icon: "error",
        });
      }
      setModal(!modal);
    });
  };
  return (
    <>
      {ordersList && ordersList.length > 0 ? (
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
              <button
                className="row btn btn-info new-order-button"
                onClick={AddNewOrder}
              >
                Add New Order
              </button>
            </div>
          </div>
          <OrdersTable customerOrders={ordersList} />
        </div>
      ) : (
        <div className="dashboard hv-85 align-items-center">
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
            <button
              type="submit"
              onClick={AddNewOrder}
              className="row btn btn-info new-order"
            >
              Add New Order
            </button>
          </div>
        </div>
      )}
      {/* Add or Edit Maintenance UI */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="w-100">
          {modalType === "add" ? "Add New Order" : "Edit Order"}
        </ModalHeader>
        <ModalBody style={{ height: "80vh", overflowY: "scroll" }}>
          <Formik
            initialValues={{
              name: "",
              apartment: "",
              city: "",
              state: "",
              zip: "",
              phone: "",
              amount: "",
            }}
            onSubmit={onSubmitNewOrder}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name must be required"),
              apartment: Yup.string().required("Apartment must be required"),
              city: Yup.string().required("City must be required"),
              state: Yup.string().required("State must be required"),
              zip: Yup.string().required("Zipcode must be required"),
              phone: Yup.string().required("Phone number must be required"),
              amount: Yup.string().required("Amount must be required"),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <React.Fragment>
                  <form className="p-3" onSubmit={handleSubmit}>
                    <div className="mb-3 floating">
                      <div class="field">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder=" "
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.name && touched.name
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        <label for="name">Name</label>
                      </div>
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="mb-3 floating">
                      <div class="field">
                        <input
                          type="text"
                          name="apartment"
                          id="apartment"
                          placeholder=" "
                          value={values.apartment}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.apartment && touched.apartment
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        <label for="apartment">Apartment</label>
                      </div>
                      {errors.apartment && touched.apartment && (
                        <div className="input-feedback">{errors.apartment}</div>
                      )}
                    </div>
                    <div className="mb-3 floating">
                      <div class="field">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          placeholder=" "
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.city && touched.city
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        <label for="city">City</label>
                      </div>
                      {errors.city && touched.city && (
                        <div className="input-feedback">{errors.city}</div>
                      )}
                    </div>
                    <div className="mb-3 floating">
                      <div class="field">
                        <input
                          type="text"
                          name="state"
                          id="state"
                          placeholder=" "
                          value={values.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.state && touched.state
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        <label for="state">State</label>
                      </div>
                      {errors.state && touched.state && (
                        <div className="input-feedback">{errors.state}</div>
                      )}
                    </div>
                    <div className="mb-3 floating">
                      <div class="field">
                        <input
                          type="text"
                          name="zip"
                          id="zip"
                          placeholder=" "
                          value={values.zip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.zip && touched.zip
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        <label for="zip">ZIP</label>
                      </div>
                      {errors.zip && touched.zip && (
                        <div className="input-feedback">{errors.zip}</div>
                      )}
                    </div>
                    <div className="mb-3 floating">
                      <div class="field">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          placeholder=" "
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.phone && touched.phone
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        <label for="phone">Phone</label>
                      </div>
                      {errors.phone && touched.phone && (
                        <div className="input-feedback">{errors.phone}</div>
                      )}
                    </div>
                    <div className="mb-3 floating">
                      <div class="field">
                        <input
                          type="text"
                          name="amount"
                          id="amount"
                          placeholder=" "
                          value={values.amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.amount && touched.amount
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        <label for="amount">Amount (USD)</label>
                      </div>
                      {errors.amount && touched.amount && (
                        <div className="input-feedback">{errors.amount}</div>
                      )}
                    </div>
                    <FormGroup tag="fieldset">
                      <label>QUARANTINE</label>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="quarantine"
                            onChange={() => changeQuarantineStatus(1)}
                            checked={quarantineStatus === 1}
                          />{" "}
                          Yes
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="quarantine"
                            onChange={() => changeQuarantineStatus(0)}
                            checked={quarantineStatus === 0}
                          />{" "}
                          No
                        </Label>
                      </FormGroup>
                    </FormGroup>
                    <FormGroup className="w-100">
                      <Button className="w-100 px-4 order-button">
                        {modalType === "add" ? "Add Order" : "Update Order"}
                      </Button>
                    </FormGroup>
                  </form>
                </React.Fragment>
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
}
