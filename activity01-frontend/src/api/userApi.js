const API_URL = "http://127.0.0.1:8080/api";
 
export async function registerUser(userData) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
 
    const data = await response.json();
 
    if (!response.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : "Registration failed."
        );
    }
 
    return data;
}
 
export async function loginUser(userData) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
 
    const data = await response.json();
 
    if (!response.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : "Login failed."
        );
    }
 
    return data;
}