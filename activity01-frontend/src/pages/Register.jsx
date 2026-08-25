import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css"; 
import { registerUser } from "../api/userApi"; 

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
    event.preventDefault();
 
    setMessage("");
    setError("");
 
    if (!username.trim()) {
        setError("Username is required.");
        return;
    }
 
    if (!password) {
        setError("Password is required.");
        return;
    }
 
    if (!confirmPassword) {
        setError("Please confirm your password.");
        return;
    }
 
    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }
 
    try {
        const data = await registerUser({
            username: username,
            password: password
        });
 
        setMessage(
            `Registration successful! Welcome, ${data.username}.`
        );
 
        setUsername("");
        setPassword("");
        setConfirmPassword("");
 
    } catch (error) {
        setError(error.message);
    }
};

    return (
        <div className="register-container">
            <h1>User Registration</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label><br/>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label><br/>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label><br/>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        required
                    />
                </div><br/>

                <button type="submit">Register</button>
            </form><br/>

            {message && <p className="login-link">{message}</p>}
            {error && <p className="login-link">{error}</p>}

            <br/><p className="Login-prompt">
                Already have an account?{" "}
                <Link to="/login" className="login-link">Login</Link>
            </p>
        </div>
    );
}

export default Register;