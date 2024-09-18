// src/Nav.js
import React from "react";
import Button from "./Button";

const Nav = ({ setView }) => {
  return (
    <nav className="nav" aria-label="breadcrumb" style={{ width: "100%" }}>
      <ol
        className="breadcrumb p-3 bg-body-tertiary rounded-3"
        style={{ width: "100%" }}
      >
        <li className="breadcrumb-item product-cat">
          <div>
            <Button name={"Top Sale"} />
          </div>
          <div>
            <Button name={"On Discount"} />
          </div>
          <div>
            <Button name={"New Launch"} />
          </div>
          <div>
            <button onClick={() => setView("shop")}>Shop</button>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Nav;
