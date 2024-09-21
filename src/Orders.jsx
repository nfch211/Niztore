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

  const handleFilterChange = (value) => {
    setFilterBy(value);
    setSelectedFilter(null);
  };

  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
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
        <div className="order-list">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-item">
              <h3 className="order-id">Order ID: {order.id}</h3>
              <div className="order-details">
                <p>
                  <strong>Product:</strong> {order.OrderedProductName}
                </p>
                <p>
                  <strong>Price:</strong> {order.OrderedProductPrice} HKD
                </p>
                <p>
                  <strong>Quantity:</strong> {order.OrderedProductQuantity}
                </p>
                <p>
                  <strong>Delivery Time:</strong>{" "}
                  {order.DeliveryTime || "Not specified"}
                </p>
                <p>
                  <strong>Pay Date:</strong> {order.PayDate || "Not specified"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
