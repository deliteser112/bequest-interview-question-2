// App.tsx

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:8080";

function App() {
  const [data, setData] = useState<string>("");
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(API_URL);
      const { data } = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  const updateData = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      await getData();
      toast.success("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data");
    }
  };

  const verifyData = async () => {
    try {
      const response = await fetch(`${API_URL}/verify`);
      const { isValid } = await response.json();
      setIsDataValid(isValid);
      if (isValid) toast.success("Data integrity verified");
      else toast.error("Data is tampered by someone!");
    } catch (error) {
      console.error("Error verifying data:", error);
      toast.error("Failed to verify data integrity");
    }
  };

  const restoreData = async () => {
    try {
      const response = await fetch(`${API_URL}/restore`, { method: "POST" });
      const { data } = await response.json();
      setData(data);
      setIsDataValid(null);
      toast.success("Data restored successfully");
    } catch (error) {
      console.error("Error restoring data:", error);
      toast.error("Failed to restore data");
    }
  };

  const tamperData = async () => {
    try {
      await fetch(`${API_URL}/tamper`, { method: "POST" });
      toast.warn("Data tampered for testing");
    } catch (error) {
      console.error("Error tampering data:", error);
      toast.error("Failed to tamper data");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <ToastContainer />
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={restoreData}>
          Restore Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={tamperData}>
          Tamper Data
        </button>
      </div>
      {isDataValid !== null && (
        <div>
          Data is {isDataValid ? "valid" : "invalid"}
        </div>
      )}
    </div>
  );
}

export default App;