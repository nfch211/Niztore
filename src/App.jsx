import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Card from "./Card";
import Nav from "./Nav";
import Backend from "./Backend";
import Sidebar from "./Sidebar";
import Catalogue from "./Catalogue";
import Orders from "./Orders";
import Login from "./Login";
import SignUp from "./SignUp";
import OrdersBackend from "./OrdersBackend";
import SignUpBackend from "./SignUpBackend";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [confirmedProducts, setConfirmedProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [view, setView] = useState("shop");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [postOrderData, setPostOrderData] = useState(null);

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
      setIsLoading(false);
    } else {
      console.error("Received data is not an array:", data);
      setIsLoading(false);
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
    const newOrder = {
      OrderedProductName: products.map((p) => p.name).join(", "),
      OrderedProductPrice: products
        .reduce((total, p) => total + parseFloat(p.price) * p.quantity, 0)
        .toFixed(2),
      OrderedProductQuantity: products.reduce(
        (total, p) => total + p.quantity,
        0
      ),
      DeliveryTime: deliveryTime,
      PayDate: payDate,
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setSuccessMessage("Payment successful!");
    setConfirmedProducts([]);
    console.log("Order Details:", newOrder);
    setPostOrderData(newOrder);
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  function handleLogin(userData) {
    setIsLoggedIn(true);
    setUsername(userData.user_profile.name);
    setLoginSuccess(true);
    setView("shop");
    localStorage.setItem("authToken", userData.access);
    console.log("User logged in:", userData.access);
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    setUsername("");
    setSelectedProducts([]);
    setConfirmedProducts([]);
    setView("shop");
    localStorage.removeItem("authToken");
    console.log("User signed out");
  }

  function handleLoginEmailInput(e) {
    setLoginEmail(e.target.value);
  }

  function handleLoginPasswordInput(e) {
    setLoginPassword(e.target.value);
  }

  function handleSignUpEmailInput(e) {
    setSignUpEmail(e.target.value);
  }

  function handleSignUpPasswordInput(e) {
    setSignUpPassword(e.target.value);
  }

  function handleSignUpNameInput(e) {
    setSignUpName(e.target.value);
  }

  async function submitUserCredential() {
    setLoginError("");
    setLoginSuccess(false);
    console.log(`Login Email: ${loginEmail}, Password: ${loginPassword}`);
    const url =
      "https://nicksrestapi-plan-sea-linux.azurewebsites.net/api/login/";
    const data = { email: loginEmail, password: loginPassword };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.detail || "Login failed");
      }

      console.log("Response from server:", responseData);
      handleLogin(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoginError(
        error.message ||
          "Login failed. Please check your credentials and try again."
      );
    }
  }

  async function submitSignUpCredential(profileData) {
    setSignUpError("");
    setSignUpSuccess(false);
    setLoginEmail(profileData.email);
    setLoginPassword(profileData.password);
    console.log("Profile Data:", profileData);

    try {
      const responseData = await SignUpBackend.submitSignUpCredential(
        profileData,
        handleSignUp,
        setSignUpError
      );
      console.log("Response from server:", responseData);
      setSignUpSuccess(true);
    } catch (error) {
      console.error("Error during sign up:", error);
      // Error is already set by SignUpBackend, no need to set it again here
    }
  }

  const getOrdersFromBackend = useCallback((data) => {
    setOrders(data);
  }, []);

  async function handleSignUp(userData) {
    setSignUpSuccess(true);
    try {
      await submitUserCredential();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      )}
      <Backend accessBackend={getDataFromBackend} query={query} />
      <Header
        setView={setView}
        login={isLoggedIn}
        username={username}
        onLogin={() => setView("login")}
        onSignUp={() => setView("signup")}
        onSignOut={handleSignOut}
      />
      {view === "shop" && <Nav setView={setView} />}
      {isLoggedIn && view === "shop" && (
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
      {view === "orders" && (
        <Orders
          orders={orders}
          accessBackend={getOrdersFromBackend}
          isLoggedIn={isLoggedIn}
        />
      )}
      {view === "login" && (
        <Login
          HandleLoginEmail={handleLoginEmailInput}
          HandleLoginPassword={handleLoginPasswordInput}
          LoginEmail={loginEmail}
          LoginPassword={loginPassword}
          SubmitUserCredentials={submitUserCredential}
          LoginError={loginError}
          LoginSuccess={loginSuccess}
        />
      )}
      {view === "signup" && (
        <SignUp
          HandleSignUpEmail={handleSignUpEmailInput}
          HandleSignUpPassword={handleSignUpPasswordInput}
          HandleSignUpName={handleSignUpNameInput}
          SignUpEmail={signUpEmail}
          SignUpPassword={signUpPassword}
          SignUpName={signUpName}
          SubmitSignUpCredentials={submitSignUpCredential}
          SignUpError={signUpError}
          SignUpSuccess={signUpSuccess}
          handleSignUp={handleSignUp}
          setSignUpError={setSignUpError}
        />
      )}
      <OrdersBackend
        accessBackend={getOrdersFromBackend}
        isLoggedIn={isLoggedIn}
        postData={postOrderData}
      />
    </>
  );
}

export default App;
