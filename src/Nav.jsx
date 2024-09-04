import React from "react"; // Import the CSS file
import Button from "./Button";

function Nav() {
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
        </li>
      </ol>
    </nav>
  );
}

export default Nav;
