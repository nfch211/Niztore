const bearerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2OTA1MzAwLCJpYXQiOjE3MjY4MTg5MDAsImp0aSI6ImVjYWM0OTdjMzAzMDQwZTJiMDBiMTBlNjczNDhiM2I5IiwidXNlcl9pZCI6MX0.XP1FmpbqpuukyLOkwr2Rzerw0Nsy0QO2RpqzW_YriOY";
const apiUrl =
  "https://nicksrestapi-plan-sea-linux.azurewebsites.net/api/orders/";

const postData = {
  OrderedProductName: "apple",
  OrderedProductPrice: 5,
  OrderedProductQuantity: 1,
  DeliveryTime: "23 Sep 2024",
  PayDate: "20 Sep 2024 15:58",
};

fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
  body: JSON.stringify(postData),
})
  .then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${text}`
        );
      });
    }
    return response.json();
  })
  .then((data) => {
    console.log("Response from the server:", data);
  })
  .catch((error) => {
    console.error("Error sending the request:", error.message);
  });
