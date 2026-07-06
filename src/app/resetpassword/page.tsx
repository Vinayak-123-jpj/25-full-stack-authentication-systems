"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token");
        if (urlToken) {
            setToken(urlToken);
        } else {
            setError(true);
            toast.error("Invalid reset token. Please check your link.");
        }
    }, []);

    const onResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword", { token, password });
            toast.success(response.data.message || "Password reset successful!");
            router.push("/login");
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || "Something went wrong";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-950 text-slate-100">
            <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        Reset Password
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        {error 
                            ? "No valid token was found in the URL. Please trigger a new password reset email."
                            : "Enter your new password below to update your credentials."
                        }
                    </p>
                </div>

                {!error ? (
                    <form onSubmit={onResetPassword} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                New Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !password || !confirmPassword}
                            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Resetting Password...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-4">
                        <Link
                            href="/forgotpassword"
                            className="inline-block py-3 px-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all duration-200 shadow-lg"
                        >
                            Go to Forgot Password
                        </Link>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
                    <Link href="/login" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
