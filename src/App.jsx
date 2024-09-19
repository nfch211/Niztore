import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Card from "./Card";
import Nav from "./Nav";
import Backend from "./Backend";
import Sidebar from "./Sidebar";
import Catalogue from "./Catalogue";
import Orders from "./Orders";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [confirmedProducts, setConfirmedProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [view, setView] = useState("shop");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const query = "select * from customer";

  useEffect(() => {
    const handleMouseMove = (event) => {
      const screenWidth = window.innerWidth;
      setSidebarVisible(event.clientX > screenWidth - 50);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  function getDataFromBackend(data) {
    if (Array.isArray(data)) {
      setBackendData(data);
    } else {
      console.error("Received data is not an array:", data);
    }
  }

  function handleProductSelect(name, price) {
    setSelectedProducts((prevProducts) => [
      ...prevProducts,
      { name, price, quantity: 1 },
    ]);
  }

  function handleProductRemove(index) {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((_, i) => i !== index)
    );
  }

  function handleConfirm() {
    const productDict = selectedProducts.reduce((acc, product) => {
      acc[product.name] = { price: product.price, quantity: product.quantity };
      return acc;
    }, {});
    console.log(productDict);
    setSuccessMessage("Products confirmed successfully!");
    setConfirmedProducts((prevProducts) => [
      ...prevProducts,
      ...selectedProducts,
    ]);
    setSelectedProducts([]);
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  function handleCatalogueRemove(index) {
    setConfirmedProducts((prevProducts) =>
      prevProducts.filter((_, i) => i !== index)
    );
  }

  function handleQuantityChange(index, quantity) {
    setConfirmedProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[index].quantity = quantity;
      return newProducts;
    });
  }

  function handlePay(products, payDate, deliveryTime) {
    const newOrder = { products, payDate, deliveryTime };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setSuccessMessage("Payment successful!");
    setConfirmedProducts([]);
    console.log("Order Details:", newOrder);
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  function handleLogin() {
    setIsLoggedIn(true);
    setUsername("User"); // You can replace this with actual username logic
    console.log("User logged in");
  }

  function handleSignUp() {
    // Implement sign up logic here
    console.log("Sign up clicked");
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    setUsername("");
    setSelectedProducts([]);
    setConfirmedProducts([]);
    setView("shop"); // Reset view to shop on sign out
    console.log("User signed out");
  }

  return (
    <>
      <Backend accessBackend={getDataFromBackend} query={query} />
      <Header
        setView={setView}
        login={isLoggedIn}
        username={username}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onSignOut={handleSignOut}
      />
      {view === "shop" && <Nav setView={setView} />}
      {isLoggedIn && (
        <Sidebar
          isVisible={isSidebarVisible}
          products={selectedProducts}
          onRemove={handleProductRemove}
          onConfirm={handleConfirm}
          successMessage={successMessage}
        />
      )}
      {view === "shop" && (
        <div className="displayarea container">
          {backendData.map((product) => (
            <Card
              key={product.id}
              productname={product.ProductName}
              productprice={product.ProductPrice}
              productdescription={product.ProductDescription}
              productimage={product.ProductLink}
              onProductSelect={handleProductSelect}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}
      {view === "catalogue" && (
        <Catalogue
          products={confirmedProducts}
          onRemove={handleCatalogueRemove}
          onQuantityChange={handleQuantityChange}
          onPay={handlePay}
        />
      )}
      {view === "orders" && <Orders orders={orders} />}
    </>
  );
}

export default App;
