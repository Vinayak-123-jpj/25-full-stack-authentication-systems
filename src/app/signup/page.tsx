"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success("Account created! A verification email has been sent.");
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.message);
            const errorMessage = error.response?.data?.error || error.message || "Signup failed";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length >= 6) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-950 text-slate-100 relative overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-2xl z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Sign up to begin your secure experience
                    </p>
                </div>

                <form onSubmit={onSignup} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                            placeholder="johndoe"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                            placeholder="name@example.com"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                            placeholder="At least 6 characters"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={buttonDisabled || loading}
                        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Creating account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
                    <p className="text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}