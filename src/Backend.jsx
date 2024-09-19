import React, { useEffect } from "react";

export default function Backend({ accessBackend, query }) {
  const apiUrl =
    "https://nicksrestapi-plan-sea-linux.azurewebsites.net/api/products/";

  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        console.error("Error fetching data:", error);
        accessBackend([]); // Call accessBackend with empty array to indicate loading is complete
      }
    };

    fetchData();
  }, [accessBackend]);

  return null;
}
