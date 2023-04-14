import { Route, Routes } from "react-router-dom";
import Login from "../src/pages/loginPage";
import "./App.css";
import SignUp from "./pages/signupPage";
import HomePage from "./pages/homePage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={ <HomePage />} />

    </Routes>
  );
}

export default App;
