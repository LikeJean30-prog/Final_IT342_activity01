import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login"; 
import Dashboard from "./pages/Dashboard";
import ServiceRequests from "./pages/ServiceRequests";

function RequireAuth({ children }) {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? children : <Navigate to="/login" replace />;
} 

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/requests" element={<RequireAuth><ServiceRequests /></RequireAuth>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;