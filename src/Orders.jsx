// src/Orders.js
import React from "react";
import "./Orders.css";

const Orders = ({ orders }) => {
  return (
    <div className="orders">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-box">
              <p>
                <strong>Order Date:</strong> {order.payDate}
              </p>
              <p>
                <strong>Delivery Date:</strong> {order.deliveryTime}
              </p>
              <div className="product-list">
                {order.products.map((product, idx) => (
                  <div key={idx} className="product-box">
                    <p>
                      <strong>{product.name}</strong>
                    </p>
                    <p>Price: {product.price} $ HKD</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
