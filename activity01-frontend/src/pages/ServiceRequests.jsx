import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/ServiceRequests.css";
import {
    getServiceRequests,
    createServiceRequest,
    updateServiceRequest,
    deleteServiceRequest
} from "../api/serviceRequestApi";

function ServiceRequests() {
    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");

        if (!storedUser) {
            navigate("/login");
            return;
        }

        setUser(JSON.parse(storedUser));
        loadRequests();
    }, [navigate]);

    const loadRequests = async () => {
        try {
            const data = await getServiceRequests();
            setRequests(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setCategory("");
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        if (!title.trim() || !description.trim() || !category.trim()) {
            setError("All fields are required.");
            return;
        }

        try {
            if (editingId) {
                await updateServiceRequest(editingId, { title, description, category });
                setMessage("Service request updated successfully.");
            } else {
                await createServiceRequest({ title, description, category });
                setMessage("Service request created successfully.");
            }

            resetForm();
            loadRequests();

        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (request) => {
        setEditingId(request.id);
        setTitle(request.title);
        setDescription(request.description);
        setCategory(request.category);
        setError("");
        setMessage("");
    };

    const handleDelete = async (id) => {
        setError("");
        setMessage("");

        try {
            await deleteServiceRequest(id);
            setMessage("Service request deleted successfully.");
            loadRequests();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) {
        return null;
    }

    return (
        <div className="service-requests-page">

            <div className="navigation">
                <p>My Service Requests</p>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>

            <div className="service-requests-container">

                <form onSubmit={handleSubmit} className="request-form">
                    <h3>{editingId ? "Edit Service Request" : "New Service Request"}</h3>

                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input
                            id="category"
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="e.g. Maintenance, IT, Facilities"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the request"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            {editingId ? "Update" : "Create"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}

                <div className="request-list">
                    {requests.length === 0 && (
                        <p className="empty-message">No service requests yet.</p>
                    )}

                    {requests.map((request) => (
                        <div key={request.id} className="request-card">
                            <div className="request-header">
                                <h4>{request.title}</h4>
                                <span className="request-category">{request.category}</span>
                            </div>

                            <p className="request-description">{request.description}</p>

                            <div className="request-meta">
                                <span>Created by: {request.createdBy}</span>
                                <span>
                                    {new Date(request.dateCreated).toLocaleString()}
                                </span>
                            </div>

                            <div className="request-actions">
                                <button
                                    onClick={() => handleEdit(request)}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(request.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default ServiceRequests;