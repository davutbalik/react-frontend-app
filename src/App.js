import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post(
        "http://localhost:8000/api/customers",
        {
          name: name,
          city: city,
        },
        axiosConfig
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
const handleData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/customers");
      if (response.ok) {
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        setResult(jsonResponse);
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
    handleData();
  }, []);

return (
    <div className="App">
      <h1>Backend-Frontend</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <br />
        <input
          type="text"
          name="city"
          onChange={(e) => setCity(e.target.value)}
          placeholder="Surname"
        />
        <hr />
        <button type="submit">Submit</button>
        <hr />
        <ul>
          {result.map((item, index) => {
            return (
              <li key={index}>
                <p>
                  {item.name} {item.city}
                </p>
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
}
export default App;