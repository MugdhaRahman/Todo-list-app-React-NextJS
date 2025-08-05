"use client";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleGitHubSignIn = () => {
        signIn("github", { callbackUrl: "/" });
    };

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear errors when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setSuccess("Account created successfully! You can now sign in.");
            setFormData({
                name: "",
                email: "",
                password: "",
                passwordConfirm: ""
            });

            // Auto sign in after successful signup
            setTimeout(async () => {
                const result = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    callbackUrl: "/",
                    redirect: true
                });
            }, 2000);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full px-6 py-8 mx-auto bg-[url('/flash.png')] bg-cover bg-center">
            <div className="backdrop-blur-xl bg-background/10 border border-foreground/20 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="p-8 space-y-6">
                    <h1 className="text-2xl font-bold text-foreground">
                        Sign Up to ToDo List
                    </h1>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-2 rounded-lg text-sm">
                            {success}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-foreground">
                                Your name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="bg-background/20 border border-foreground/30 text-foreground placeholder-foreground/70 rounded-lg focus:ring-foreground focus:border-foreground block w-full p-2.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-foreground">
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="name@mail.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="bg-background/20 border border-foreground/30 text-foreground placeholder-foreground/70 rounded-lg focus:ring-foreground focus:border-foreground block w-full p-2.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-foreground">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                minLength={6}
                                className="bg-background/20 border border-foreground/30 text-foreground placeholder-foreground/70 rounded-lg focus:ring-foreground focus:border-foreground block w-full p-2.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="passwordConfirm" className="block mb-2 text-sm font-medium text-foreground">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                id="passwordConfirm"
                                placeholder="••••••••"
                                value={formData.passwordConfirm}
                                onChange={handleInputChange}
                                required
                                minLength={6}
                                className="bg-background/20 border border-foreground/30 text-foreground placeholder-foreground/70 rounded-lg focus:ring-foreground focus:border-foreground block w-full p-2.5"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary/30 hover:bg-secondary/50 text-foreground font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>

                        <div className="flex items-center justify-center">
                            <div className="border-t border-foreground/30 flex-grow mr-3"></div>
                            <span className="text-foreground/70 text-sm">or</span>
                            <div className="border-t border-foreground/30 flex-grow ml-3"></div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGitHubSignIn}
                            disabled={loading}
                            className="w-full bg-primary/30 hover:bg-secondary/50 text-foreground font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 disabled:opacity-50"
                        >
                            <div className="flex justify-center items-center">
                                <FaGithub className="w-5 h-5 me-3.5" />
                                Continue With Github
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                        >
                            <div className="flex justify-center items-center">
                                <FaGoogle className="w-5 h-5 mr-3.5" />
                                Continue With Google
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}