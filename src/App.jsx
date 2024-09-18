// src/App.js
import { useState, useEffect } from "react";
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
  const query = "select * from customer";

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [confirmedProducts, setConfirmedProducts] = useState([]); // New state for confirmed products
  const [orders, setOrders] = useState([]); // New state for orders
  const [successMessage, setSuccessMessage] = useState("");
  const [view, setView] = useState("shop"); // New state to manage the view

  useEffect(() => {
    const handleMouseMove = (event) => {
      const screenWidth = window.innerWidth;
      if (event.clientX > screenWidth - 50) {
        setSidebarVisible(true);
      } else if (event.clientX < screenWidth - 300) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
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
    setConfirmedProducts(selectedProducts); // Store confirmed products
    setSelectedProducts([]);
    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
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
    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
  }

  return (
    <>
      <Backend accessBackend={getDataFromBackend} query={query} />
      <Header setView={setView} login={true} username="User" />
      {view === "shop" ? (
        <>
          <Nav setView={setView} />
          <Sidebar
            isVisible={isSidebarVisible}
            products={selectedProducts}
            onRemove={handleProductRemove}
            onConfirm={handleConfirm}
            successMessage={successMessage}
          />
          <div className="displayarea container">
            {backendData.map((product) => (
              <Card
                key={product.id} // Assuming each product has a unique id
                productname={product.ProductName}
                productprice={product.ProductPrice}
                productdescription={product.ProductDescription}
                productimage={product.ProductLink}
                onProductSelect={handleProductSelect}
              />
            ))}
          </div>
        </>
      ) : view === "catalogue" ? (
        <Catalogue
          products={confirmedProducts}
          onRemove={handleCatalogueRemove}
          onQuantityChange={handleQuantityChange}
          onPay={handlePay}
        />
      ) : (
        <Orders orders={orders} />
      )}
    </>
  );
}

export default App;
