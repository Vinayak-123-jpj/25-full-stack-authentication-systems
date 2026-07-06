"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const onForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", { email });
            toast.success(response.data.message || "Reset link sent!");
            setSubmitted(true);
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
                        Forgot Password
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        {submitted 
                            ? "Check your email for a link to reset your password." 
                            : "Enter your email address and we'll send you a link to reset your password."
                        }
                    </p>
                </div>

                {!submitted ? (
                    <form onSubmit={onForgotPassword} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                                placeholder="name@example.com"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Sending Link...
                                </>
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-slate-300 font-medium mb-6">Reset Link Sent Successfully!</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Resend email link
                        </button>
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
