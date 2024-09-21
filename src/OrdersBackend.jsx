import React, { useEffect, useCallback } from "react";

export default function OrdersBackend({
  setOrders,
  isLoggedIn,
  postData = null,
  triggerFetch = false,
}) {
  const apiUrl =
    "https://nicksrestapi-plan-sea-linux.azurewebsites.net/orders/";

  const fetchData = useCallback(async () => {
    if (!isLoggedIn) {
      setOrders([]);
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found");
      setOrders([]);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  }, [isLoggedIn, setOrders]);

  const postOrder = useCallback(async (orderData) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Order posted successfully:", responseData);
    } catch (error) {
      console.error("Error posting order:", error);
    }
  }, []);

  useEffect(() => {
    if (triggerFetch) {
      fetchData();
    }
  }, [triggerFetch, fetchData]);

  useEffect(() => {
    if (postData !== null && Array.isArray(postData)) {
      postData.forEach((orderData) => {
        postOrder(orderData);
      });
    }
  }, [postData, postOrder]);

  return null;
}
