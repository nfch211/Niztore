import React, { useState, useEffect, useMemo } from "react";
import OrdersBackend from "./OrdersBackend";
import "./Orders.css";

const Orders = ({ isLoggedIn }) => {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filterBy, setFilterBy] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFetchOrders = () => {
    setIsFetching(true);
  };

  const handleOrdersFetched = (newOrders) => {
    setOrders(newOrders);
    setIsFetching(false);
  };

  const uniqueFilters = useMemo(() => {
    if (filterBy === "all") return [];
    const values = [
      ...new Set(orders.map((order) => order[filterBy] || "Not specified")),
    ];
    return values.sort((a, b) => a.localeCompare(b));
  }, [orders, filterBy]);

  const filteredOrders = useMemo(() => {
    if (filterBy === "all" || !selectedFilter) {
      return orders;
    }
    return orders.filter(
      (order) => (order[filterBy] || "Not specified") === selectedFilter
    );
  }, [orders, filterBy, selectedFilter]);

  const groupedOrders = useMemo(() => {
    const groups = {};
    filteredOrders.forEach((order) => {
      const key = `${order.DeliveryTime || "Not specified"}_${
        order.PayDate || "Not specified"
      }`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(order);
    });
    return groups;
  }, [filteredOrders]);

  const handleFilterChange = (value) => {
    setFilterBy(value);
    setSelectedFilter(null);
  };

  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
  };

  const calculateTotalPrice = (groupOrders) => {
    return groupOrders
      .reduce((total, order) => {
        const price = parseFloat(order.OrderedProductPrice) || 0;
        const quantity = parseInt(order.OrderedProductQuantity) || 0;
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };

  const renderOrderTable = (groupOrders, groupKey) => {
    const [deliveryTime, payDate] = groupKey.split("_");
    const totalPrice = calculateTotalPrice(groupOrders);

    return (
      <div key={groupKey} className="order-group">
        <h3>
          Delivery Time: {deliveryTime}, Pay Date: {payDate}
        </h3>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Price (HKD)</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {groupOrders.map((order) => {
              const price = parseFloat(order.OrderedProductPrice) || 0;
              const quantity = parseInt(order.OrderedProductQuantity) || 0;
              const subtotal = (price * quantity).toFixed(2);
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.OrderedProductName}</td>
                  <td>{order.OrderedProductPrice}</td>
                  <td>{order.OrderedProductQuantity}</td>
                  <td>{subtotal}</td>
                </tr>
              );
            })}
            <tr className="total-row">
              <td colSpan="4" className="total-label">
                Total
              </td>
              <td className="total-price">{totalPrice} HKD</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders</h2>
      <div className="controls">
        <button
          className="fetch-button"
          onClick={handleFetchOrders}
          disabled={isFetching}
        >
          {isFetching ? "Fetching..." : "Fetch Orders"}
        </button>
        <div className="filter-controls">
          <label>Filter:</label>
          <select
            className="filter-select"
            value={filterBy}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="DeliveryTime">Filter by Delivery Time</option>
            <option value="PayDate">Filter by Pay Date</option>
          </select>
        </div>
      </div>
      {filterBy !== "all" && (
        <div className="filter-options">
          {uniqueFilters.map((filter) => (
            <button
              key={filter}
              className={`filter-option ${
                selectedFilter === filter ? "selected" : ""
              }`}
              onClick={() => handleFilterSelect(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      )}
      <OrdersBackend
        setOrders={handleOrdersFetched}
        isLoggedIn={isLoggedIn}
        triggerFetch={isFetching}
      />
      {isFetching ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="order-groups">
          {Object.entries(groupedOrders).map(([groupKey, groupOrders]) =>
            renderOrderTable(groupOrders, groupKey)
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
