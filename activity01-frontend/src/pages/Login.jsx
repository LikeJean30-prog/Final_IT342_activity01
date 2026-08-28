import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { loginUser } from "../api/userApi";
 
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
 
    const navigate = useNavigate();
 
    const handleSubmit = async (event) => {
        event.preventDefault();
 
        // Clear previous messages
        setError("");
        setMessage("");
 
        // Client-side validation
        if (!username.trim()) {
            setError("Username is required.");
            return;
        }
 
        if (!password) {
            setError("Password is required.");
            return;
        }
 
        try {
            // Send login request to Spring Boot
            const data = await loginUser({
                username: username,
                password: password
            });
 
            // Store only non-sensitive user information.
            // Password is NOT stored.
            sessionStorage.setItem(
                "user",
                JSON.stringify({
                    id: data.id,
                    username: data.username,
                    token:data.token
                })
            );
 
            // Display success message
            setMessage(
                `Login successful! Welcome, ${data.username}.`
            );
 
            // Clear password from the form
            setPassword("");
 
            // Redirect to Dashboard after 1 second
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
 
        } catch (error) {
            setError(error.message);
        }
    };
 
    return (
        <div className="login-page">
            <div className="login-container">
 
                <h1>User Login</h1>
 
                <form onSubmit={handleSubmit}>
 
                    {/* Username */}
                    <div className="form-group">
                        <label htmlFor="username">
                            Username
                        </label>
 
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            placeholder="Enter your username"
                            required
                        />
                    </div>
 
                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>
 
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter your password"
                            required
                        />
                    </div><br/>
 
                    {/* Login button */}
                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button><br/>
 
                </form>
 
                {/* Error message */}
                <br/>
                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <br/> 
                {/* Success message */}
                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}
 
                {/* Registration link */}
                <br/><p className="register-prompt">
                    Don't have an account?{" "}
                    <Link to="/register" className="register-link">
                        Register
                    </Link>
                </p>
 
            </div>
        </div>
    );
}
 
export default Login;