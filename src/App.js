import { Route, Routes } from "react-router-dom";
import Login from "../src/pages/loginPage";
import "./App.css";
import SignUp from "./pages/signupPage";
import HomePage from "./pages/homePage";
import { useEffect, useState } from "react";

function App() {
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return;
    }
    setAuthToken(token);
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
      <Route
        path="/signup"
        element={<SignUp authToken={authToken} setAuthToken={setAuthToken} />}
      />
      <Route path="/" element={<HomePage authToken={authToken} setAuthToken={setAuthToken}/>} />
    </Routes>
  );
}

export default App;
