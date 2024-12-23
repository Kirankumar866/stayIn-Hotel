import React, { useEffect, useState } from "react";
import { deleteUser, getBookingsByUserId, getUser } from "../utils/ApiFunction";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Profile = () => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        roles: [{ id: "", name: "" }],
    });

    const [bookings, setBookings] = useState([
        {
            id: "",
            room: { id: "", roomType: "" },
            checkInDate: "",
            checkOutDate: "",
            bookingConfirmationCode: "",
        },
    ]);

    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId);
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByUserId(userId);
                setBookings(response);
            } catch (error) {
                console.error("Error fetching bookings:", error.message);
                setErrorMessage(error.message);
            }
        };

        fetchBookings();
    }, [userId]);

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );
        if (confirmed) {
            await deleteUser(userId)
                .then((response) => {
                    setMessage(response.data);

                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("userRole");
                    navigate("/");
                    window.location.reload();
                })
                .catch((error) => {
                    setErrorMessage(error);
                });
        }
    };

    return (
        <div className="container mt-4">
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            {message && <p className="text-success text-center">{message}</p>}
            {user ? (
                <div className="card p-4 shadow-sm">
                    <h4 className="text-center mb-4">User Profile</h4>
                    <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-center mb-4">
                            <img
                                src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                                alt="Profile"
                                className="rounded-circle img-fluid"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="mb-3">
                                <strong>ID:</strong> {user.id}
                            </div>
                            <div className="mb-3">
                                <strong>First Name:</strong> {user.firstName}
                            </div>
                            <div className="mb-3">
                                <strong>Last Name:</strong> {user.lastName}
                            </div>
                            <div className="mb-3">
                                <strong>Email:</strong> {user.email}
                            </div>
                            <div>
                                <strong>Roles:</strong>
                                <ul className="list-unstyled">
                                    {user.roles.map((role) => (
                                        <li key={role.id}>{role.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h4 className="text-center mt-4">Booking History</h4>
                    {bookings.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Booking ID</th>
                                        <th>Room ID</th>
                                        <th>Room Type</th>
                                        <th>Check-In Date</th>
                                        <th>Check-Out Date</th>
                                        <th>Confirmation Code</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={index}>
                                            <td>{booking.bookingId}</td>
                                            <td>{booking.room.id}</td>
                                            <td>{booking.room.roomType}</td>
                                            <td>{moment(booking.checkInDate).format("MMM Do, YYYY")}</td>
                                            <td>{moment(booking.checkOutDate).format("MMM Do, YYYY")}</td>
                                            <td className="user-select-text">{booking.bookingConfirmationCode}</td>
                                            <td className="text-success">On-going</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center">You have not made any bookings yet.</p>
                    )}

                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
                            Close Account
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
