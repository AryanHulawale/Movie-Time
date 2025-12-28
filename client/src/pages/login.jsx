import React, { useState } from "react";
import api from "../axios/axios";
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null)
    

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);
            if (response.data.user.role == "user") {
                navigate("/dashboard");
            } else {
                navigate("/admin-dashboard");
            }
        } catch (error) {
            console.log(error)
            setError(error.response?.data?.message)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="absolute top-0 left-0 w-full flex justify-between p-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-md" />
                    <span className="font-bold text-lg">MovieApp</span>
                </div>
                <button onClick={() => navigate("/register")} className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
                    Sign Up
                </button>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center">
                        {/* You can replace this with an icon */}
                        <span className="text-white text-xl">🎬</span>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
                <p className="text-gray-400 text-center mb-6">
                    Enter your credentials to access your account
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-300">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@example.com"
                            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-gray-300">Password</label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-blue-500 text-sm"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>

            

                    {/* Error Message */}
                    {error && (
                        <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 py-3 rounded-md text-white font-bold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p onClick={() => navigate("/register")} className="text-center text-gray-400 mt-4">
                    Don't have an account?{" "}
                    <span className="text-blue-500 cursor-pointer">Create an account</span>
                </p>
            </div>

            <footer className="absolute bottom-4 text-gray-500 text-sm">
                © 2023 MovieApp. All rights reserved.
            </footer>
        </div>
    );
};

export default Login;
