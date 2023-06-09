import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import ChangePassword from "./pages/ChangePassword";
import Post from "./pages/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/user" Component={User} />
        <Route path="/change-password" Component={ChangePassword} />
        <Route path="/post" Component={Post} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
