// src/Catalogue.js
import React, { useState } from "react";
import "./Catalogue.css";

const Catalogue = ({ products, onRemove, onQuantityChange, onPay }) => {
  const [deliveryDate, setDeliveryDate] = useState("3days");

  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const deliveryCost = deliveryDate === "3days" ? 50 : 0;
  const finalPrice = totalPrice + deliveryCost;

  const getFormattedDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handlePay = () => {
    const payDate = new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const deliveryTime = getFormattedDate(deliveryDate === "3days" ? 3 : 7);
    onPay(products, payDate, deliveryTime);
  };

  return (
    <div className="catalogue">
      <h2>Catalogue</h2>
      {products.length === 0 ? (
        <p>No products confirmed.</p>
      ) : (
        <div className="product-list">
          {products.map((product, index) => (
            <div key={index} className="product-box">
              <p>
                <strong>{product.name}</strong>
              </p>
              <p>Price: {product.price} $ HKD</p>
              <input
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) => onQuantityChange(index, e.target.value)}
                className="quantity-input"
              />
              <button onClick={() => onRemove(index)}>Delete</button>
            </div>
          ))}
          <div className="delivery-options">
            <p>Select Delivery Date:</p>
            <label>
              <input
                type="radio"
                value="3days"
                checked={deliveryDate === "3days"}
                onChange={() => setDeliveryDate("3days")}
              />
              {` ${getFormattedDate(3)} (Adds 50$ HKD)`}
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="7days"
                checked={deliveryDate === "7days"}
                onChange={() => setDeliveryDate("7days")}
              />
              {` ${getFormattedDate(7)} (No Delivery Charge)`}
            </label>
          </div>
          <div className="total-price">
            <p>
              <strong>Total Price: {finalPrice} $ HKD</strong>
            </p>
          </div>
          <button className="pay-button" onClick={handlePay}>
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalogue;
