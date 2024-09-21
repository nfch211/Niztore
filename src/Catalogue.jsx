import React, { useState } from "react";
import OrdersBackend from "./OrdersBackend";
import "./Catalogue.css";

const Catalogue = ({
  products,
  onRemove,
  onQuantityChange,
  isLoggedIn,
  onPay,
}) => {
  const [deliveryDate, setDeliveryDate] = useState("3days");
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [getError, setGetError] = useState("");
  const totalPrice = products.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
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

  const handlePay = async () => {
    setIsLoading(true);
    const payDate = new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const deliveryTime = getFormattedDate(deliveryDate === "3days" ? 3 : 7);

    // Prepare individual orders for each product
    const orders = products.map((product) => ({
      OrderedProductName: product.name,
      OrderedProductPrice: product.price,
      OrderedProductQuantity: product.quantity,
      DeliveryTime: deliveryTime,
      PayDate: payDate,
    }));

    try {
      setPostData(orders);
      await onPay(products, payDate, deliveryTime);
    } catch (error) {
      setGetError(error);
    } finally {
      setIsLoading(false);
    }
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
                onChange={(e) =>
                  onQuantityChange(index, parseInt(e.target.value, 10))
                }
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
              <strong>Total Price: {finalPrice.toFixed(2)} $ HKD</strong>
            </p>
          </div>
          <button
            disabled={isLoading}
            className="pay-button"
            onClick={handlePay}
          >
            {isLoading ? (
              <div className="loading-overlay">
                <div className="loading-content">
                  <div className="spinner"></div>
                  <p>Loading...</p>
                </div>
              </div>
            ) : null}
            {isLoading ? "Paying" : "Pay"}
          </button>
          {getError ? <p>{getError}</p> : null}
        </div>
      )}
      <OrdersBackend
        setOrders={() => {}} // We don't need to set orders in Catalogue
        isLoggedIn={isLoggedIn}
        postData={postData}
      />
    </div>
  );
};

export default Catalogue;
