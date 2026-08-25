import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
 
function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
 
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
 
        if (!storedUser) {
            navigate("/login");
            return;
        }
 
        setUser(JSON.parse(storedUser));
    }, [navigate]);
 
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        navigate("/login");
    };
 
    if (!user) {
        return null;
    }
 
    return (
        <div className="dashboard-page">

            <div className="navigation">
                <p>Dashboard Page</p>
            </div>

            <div className="sidebar">
                <button
                    onClick={handleLogout}
                    className="logout-button"
                >
                    Logout
                </button>
            </div>

            <div className="dashboard-container">
                <h2>
                    Welcome, {user.username}!
                </h2>
            </div>

        </div>
    );
}
export default Dashboard;