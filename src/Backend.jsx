import React, { useEffect, useCallback, useState } from "react";

export default function Backend({ accessBackend, query }) {
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const apiUrl = "http://localhost:8000/api/products/";

  const fetchData = useCallback(async () => {
    const currentTime = Date.now();
    if (currentTime - lastFetchTime < 60000) {
      // 60000 ms = 1 minute
      return; // Skip fetching if less than 1 minute has passed
    }

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      accessBackend(data);
      setLastFetchTime(currentTime);
    } catch (error) {
      console.error("Error fetching data:", error);
      accessBackend([]); // Call accessBackend with empty array to indicate loading is complete
    }
  }, [accessBackend, apiUrl, lastFetchTime]);

  useEffect(() => {
    fetchData();
    // Set up an interval to fetch data every 5 minutes
    const intervalId = setInterval(fetchData, 300000); // 300000 ms = 5 minutes

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [fetchData, query]);

  return null;
}
