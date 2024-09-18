// src/Card.js
import React from "react";

function Card({
  productname,
  productimage,
  productdescription,
  productprice,
  onProductSelect,
}) {
  function handleBuySVGonClick() {
    onProductSelect(productname, productprice);
  }

  return (
    <div className="product container hovernow">
      <div className="product-name" style={{ height: "60px" }}>
        <h1 style={{ fontSize: "1vw", color: "rgb(94, 230, 230)" }}>
          {productname}
        </h1>
      </div>
      <div className="product-image">
        <img
          src={productimage}
          alt={productname}
          style={{ width: "100%", borderRadius: "15px" }}
        />
      </div>
      <div className="product-description">
        <p style={{ fontSize: "15px" }}>{productdescription}</p>
      </div>
      <div className="product-price" style={{ margin: "5px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "50%" }}>
            <svg
              className="buy-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-cart4"
              viewBox="0 0 16 16"
              onClick={handleBuySVGonClick}
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <p style={{ textAlign: "right", marginTop: "10px" }}>
              <strong>{productprice} $ HKD</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
