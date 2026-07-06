"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Welcome back! Login successful");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            const errorMessage = error.response?.data?.error || error.message || "Login failed";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
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
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Sign in to access your secure dashboard
                    </p>
                </div>

                <form onSubmit={onLogin} className="space-y-5">
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
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="password" className="text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <Link 
                                href="/forgotpassword" 
                                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            id="password"
                            type="password"
                            required
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                            placeholder="••••••••"
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
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
                    <p className="text-sm text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}