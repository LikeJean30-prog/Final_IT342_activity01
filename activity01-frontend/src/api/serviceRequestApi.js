const API_URL = "http://127.0.0.1:8080/api/requests";

function getToken() {
    const storedUser = sessionStorage.getItem("user");

    if (!storedUser) {
        throw new Error("Not authenticated.");
    }

    const user = JSON.parse(storedUser);
    return user.token;
}

async function handleResponse(response) {
    const contentType = response.headers.get("content-type");
    const data = contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        throw new Error(
            typeof data === "string" ? data : "Request failed."
        );
    }

    return data;
}

export async function getServiceRequests() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    return handleResponse(response);
}

export async function getServiceRequest(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    return handleResponse(response);
}

export async function createServiceRequest(requestData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(requestData)
    });

    return handleResponse(response);
}

export async function updateServiceRequest(id, requestData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(requestData)
    });

    return handleResponse(response);
}

export async function deleteServiceRequest(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    return handleResponse(response);
}