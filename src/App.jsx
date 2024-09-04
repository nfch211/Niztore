import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Card from "./Card";
import Nav from "./Nav";
import Backend from "./Backend";

function App() {
  const [backendData, setBackendData] = useState([]);
  const query = "select * from customer";

  function getDataFromBackend(data) {
    if (Array.isArray(data)) {
      console.log(data);
      setBackendData(data);
    } else {
      console.error("Received data is not an array:", data);
    }
  }

  return (
    <>
      <Backend accessBackend={getDataFromBackend} query={query} />
      <Header />
      <Nav />
      <div className="displayarea container">
        {backendData.map((product) => (
          <Card
            key={product.id} // Assuming each product has a unique id
            productname={product.ProductName}
            productprice={product.ProductPrice}
            productdescription={product.ProductDescription}
            productimage={product.ProductLink}
          />
        ))}
      </div>
    </>
  );
}

export default App;
