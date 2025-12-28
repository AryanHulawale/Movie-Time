import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";

const register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await api.post("/auth/register", { email, password, role });
            localStorage.setItem("token", response.data.user.token);
            localStorage.setItem("role", response.data.user.role);
            if(role == "user"){
                navigate("/dashboard");
            }else{
                navigate("/admin-dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            <div className="absolute top-0 left-0 w-full flex justify-between p-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-md" />
                    <span className="font-bold text-lg text-white">MovieApp</span>
                </div>
                <button onClick={() => navigate("/login")} className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
                    Log In
                </button>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center">
                        {/* You can replace this with an icon */}
                        <span className="text-white text-xl">🎬</span>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Create Account</h2>
                <p className="text-gray-400 mb-6 text-center">
                    Join the club for exclusive movie access and admin features.
                </p>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex gap-2 mb-4">
                        <button
                            type="button"
                            onClick={() => setRole("user")}
                            className={`flex-1 px-4 py-2 rounded-lg ${role === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                                }`}
                        >
                            Viewer
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("admin")}
                            className={`flex-1 px-4 py-2 rounded-lg ${role === "admin" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                                }`}
                        >
                            Admin
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                    >
                        Register Now
                    </button>
                </form>

                <p className="text-gray-400 text-center mt-4">
                    Already a member?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Sign in here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default register;
