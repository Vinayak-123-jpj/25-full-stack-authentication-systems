"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface UserProfileData {
    _id: string;
    username: string;
    email: string;
    isVerfied: boolean;
    isAdmin: boolean;
}

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/users/me');
            setUser(res.data.data);
        } catch (error: any) {
            console.log(error.message);
            // Don't show toast error here since middleware may redirect them anyway
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logged out successfully');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

            {/* Navigation Header */}
            <header className="z-10 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                        A
                    </div>
                    <span className="font-extrabold text-lg bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
                        AuthSystem
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    {user && (
                        <span className="text-sm text-slate-400 hidden sm:inline">
                            Signed in as <span className="text-slate-200 font-semibold">{user.username}</span>
                        </span>
                    )}
                    <button
                        onClick={logout}
                        className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-24 z-10 max-w-5xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-indigo-200 to-slate-400 bg-clip-text text-transparent">
                        Secure Authentication
                    </h1>
                    <p className="mt-4 text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
                        A modern, production-ready user identity solution built with Next.js App Router, MongoDB, Mongoose, and Tailwind CSS.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-slate-900/40 border border-slate-900 rounded-2xl w-full max-w-md">
                        <svg className="animate-spin h-8 w-8 text-blue-500 mb-3" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <p className="text-sm text-slate-500">Checking auth token details...</p>
                    </div>
                ) : (
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 backdrop-blur-sm flex flex-col justify-between hover:border-slate-800 transition-all duration-200 group">
                            <div>
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-100 mb-2">User Profile Dashboard</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    View your profile details, verification status, administrator privileges, and custom account information.
                                </p>
                            </div>
                            <Link href="/profile" className="text-blue-400 hover:text-blue-300 font-semibold text-sm inline-flex items-center gap-1 mt-6">
                                Go to Profile →
                            </Link>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 backdrop-blur-sm flex flex-col justify-between hover:border-slate-800 transition-all duration-200 group">
                            <div>
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-100 mb-2">Secure Middleware</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Protected routes and API routes. Users without cookies are automatically redirected, preventing unauthenticated page access.
                                </p>
                            </div>
                            <span className="text-emerald-400 font-semibold text-sm inline-flex items-center gap-1.5 mt-6">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> Active Protection
                            </span>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 backdrop-blur-sm flex flex-col justify-between hover:border-slate-800 transition-all duration-200 group">
                            <div>
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l8-4.752a2 2 0 012.22 0l8 4.752A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5m4.75-4.5V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v1.5m4.75-.75a2 2 0 01-2 2h-2a2 2 0 01-2-2" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-100 mb-2">Mailer Integration</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Fully functional email sender. Generates tokens for account verification and secure password recovery options.
                                </p>
                            </div>
                            <div className="text-slate-400 text-sm mt-6">
                                Powered by <span className="font-semibold text-slate-300">Nodemailer</span>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="z-10 border-t border-slate-900 py-6 text-center text-xs text-slate-600">
                &copy; {new Date().getFullYear()} NextJS Authentication System. Built for Web Development Course.
            </footer>
        </div>
    );
}
