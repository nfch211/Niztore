import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Backend({ accessBackend, query }) {
  const apiUrl =
    "https://nicksrestapi-plan-sea-linux.azurewebsites.net/api/products/";

  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    axios
      .get(apiUrl, {
        withCredentials: false, // Include credentials if needed
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setResponseData(response.data);
        accessBackend(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      });
  }, [apiUrl, accessBackend]);

  return null;
}
