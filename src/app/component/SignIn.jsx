// component/SignIn.js
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGitHubSignIn = () => {
        signIn("github", { callbackUrl: "/" });
    };

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
    };

    // const handleInputChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     });
    //     if (error) setError("");
    // };
    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError("");
    //
    //     try {
    //         const result = await signIn("credentials", {
    //             email: formData.email,
    //             password: formData.password,
    //             callbackUrl: "/",
    //             redirect: false
    //         });
    //
    //         if (result?.error) {
    //             setError("Invalid email or password");
    //         } else if (result?.ok) {
    //             window.location.href = "/"; // Redirect to home
    //         }
    //     } catch (error) {
    //         setError("Something went wrong. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary px-6">
            <div className="backdrop-blur-xl bg-background/10 border border-foreground/20 rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Sign In to Your Account
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/*<form onSubmit={handleSubmit} className="space-y-4 mb-6">*/}
                {/*    <div>*/}
                {/*        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">*/}
                {/*            Email*/}
                {/*        </label>*/}
                {/*        <input*/}
                {/*            type="email"*/}
                {/*            name="email"*/}
                {/*            id="email"*/}
                {/*            value={formData.email}*/}
                {/*            onChange={handleInputChange}*/}
                {/*            required*/}
                {/*            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"*/}
                {/*            placeholder="Enter your email"*/}
                {/*        />*/}
                {/*    </div>*/}

                {/*    <div>*/}
                {/*        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">*/}
                {/*            Password*/}
                {/*        </label>*/}
                {/*        <input*/}
                {/*            type="password"*/}
                {/*            name="password"*/}
                {/*            id="password"*/}
                {/*            value={formData.password}*/}
                {/*            onChange={handleInputChange}*/}
                {/*            required*/}
                {/*            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"*/}
                {/*            placeholder="Enter your password"*/}
                {/*        />*/}
                {/*    </div>*/}

                {/*    <button*/}
                {/*        type="submit"*/}
                {/*        disabled={loading}*/}
                {/*        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"*/}
                {/*    >*/}
                {/*        {loading ? "Signing In..." : "Sign In"}*/}
                {/*    </button>*/}
                {/*</form>*/}

                {/*<div className="flex items-center justify-center mb-4">*/}
                {/*    <div className="border-t border-gray-300 flex-grow mr-3"></div>*/}
                {/*    <span className="text-gray-500 text-sm">or</span>*/}
                {/*    <div className="border-t border-gray-300 flex-grow ml-3"></div>*/}
                {/*</div>*/}

                <div className="space-y-3">
                    <button
                        onClick={handleGitHubSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                    >
                        <FaGithub className="w-5 h-5 mr-3" />
                        Continue with GitHub
                    </button>

                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                    >
                        <FaGoogle className="w-5 h-5 mr-3" />
                        Continue with Google
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}