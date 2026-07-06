"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // Step 1: Read token from URL on mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token");
        if (urlToken) {
            setToken(urlToken);
        } else {
            setLoading(false);
        }
    }, []);

    // Step 2: Verify token once it's set
    useEffect(() => {
        if (!token) return;

        const verifyUserEmail = async () => {
            try {
                setLoading(true);
                await axios.post('/api/users/verifyemail', { token });
                setVerified(true);
                toast.success("Email verified successfully!");
            } catch (err: any) {
                setError(true);
                const errorMessage = err.response?.data?.error || err.message || "Verification failed";
                console.error("Verification error:", errorMessage);
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        verifyUserEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-950 text-slate-100 relative overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-2xl z-10 text-center">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    Email Verification
                </h1>

                {loading ? (
                    <div className="py-12">
                        <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <p className="text-slate-400">Verifying your email address, please wait...</p>
                    </div>
                ) : verified ? (
                    <div className="py-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-100 mb-2">Account Verified!</h2>
                        <p className="text-sm text-slate-400 mb-6">
                            Your email has been verified. You can now access all features.
                        </p>
                        <Link
                            href="/login"
                            className="inline-block py-3 px-6 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20"
                        >
                            Log In to Dashboard
                        </Link>
                    </div>
                ) : error ? (
                    <div className="py-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-400 mb-6 border border-red-500/20">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-100 mb-2">Verification Failed</h2>
                        <p className="text-sm text-slate-400 mb-6">
                            The verification link is invalid or has expired. Please sign in and request a new verification email.
                        </p>
                        <Link
                            href="/login"
                            className="inline-block py-3 px-6 w-full rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all duration-200"
                        >
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <div className="py-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 mb-6 border border-amber-500/20">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-100 mb-2">No Token Found</h2>
                        <p className="text-sm text-slate-400 mb-6">
                            Please use the verification link sent to your email. Make sure the full URL is copied correctly.
                        </p>
                        <Link
                            href="/login"
                            className="inline-block py-3 px-6 w-full rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all duration-200"
                        >
                            Back to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}