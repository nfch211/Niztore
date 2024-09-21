import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({
  isVisible,
  products,
  onRemove,
  onConfirm,
  successMessage,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [quantities, setQuantities] = useState(products.map(() => 1));

  useEffect(() => {
    setQuantities(products.map(() => 1));
  }, [products]);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
    products[index].quantity = value;
  };

  return (
    <div
      className={`sidebar ${isVisible ? "visible" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="sidebar-indicator">
        <span>&lt;</span>
      </div>
      <div className="sidebar-content">
        <h2>Selected Products</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="product-list">
          {products.length === 0 ? (
            <p>No products selected.</p>
          ) : (
            products.map((product, index) => (
              <div key={index} className="product-box">
                <p>
                  <strong>{product.name}</strong>
                </p>
                <p>{product.price} $ HKD</p>
                <input
                  type="number"
                  min="1"
                  value={quantities[index]}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  className="quantity-input"
                />
                <button onClick={() => onRemove(index)}>Delete</button>
              </div>
            ))
          )}
        </div>
        <div className="confirm-section">
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
