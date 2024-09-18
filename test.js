import axios from "axios";

const token = "";
const config = {
  headers: {
    Authentication: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

const data = { key1: "value1", key2: "value2" };


axios.post('url':'12345', data, config).then(response=>{console.log(response.data)}).catch(err=>{console.log("Error posting data: ", error)})