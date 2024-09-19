import React, { useState } from "react";

function Card({
  productname,
  productimage,
  productdescription,
  productprice,
  onProductSelect,
  isLoggedIn,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  function handleBuySVGonClick() {
    if (isLoggedIn) {
      onProductSelect(productname, productprice);
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300); // Reset after 300ms
    }
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
          <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
            <svg
              className={`buy-svg ${isClicked ? "clicked" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill={isLoggedIn && isHovered ? "blue" : "currentColor"}
              viewBox="0 0 16 16"
              onClick={handleBuySVGonClick}
              onMouseEnter={() => isLoggedIn && setIsHovered(true)}
              onMouseLeave={() => isLoggedIn && setIsHovered(false)}
              style={{
                transition: "all 0.3s ease",
                transform: isClicked ? "scale(0.9)" : "scale(1)",
                opacity: isLoggedIn ? 1 : 0.5,
                cursor: isLoggedIn ? "pointer" : "not-allowed",
              }}
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
            {!isLoggedIn && (
              <span
                style={{ fontSize: "12px", color: "red", marginLeft: "10px" }}
              >
                Please login
              </span>
            )}
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
