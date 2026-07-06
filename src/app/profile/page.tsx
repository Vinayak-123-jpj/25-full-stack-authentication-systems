"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserProfileData {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
}

export default function ProfilePage() {
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
            toast.error("Failed to fetch user details");
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
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-950 text-slate-100 relative overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

            <div className="w-full max-w-2xl p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-2xl z-10">
                <div className="flex justify-between items-center mb-8 border-b border-slate-800/80 pb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            User Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Manage your account and view profile information
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all duration-200"
                    >
                        Sign Out
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <p className="text-sm text-slate-400">Loading user profile details...</p>
                    </div>
                ) : user ? (
                    <div className="space-y-6">
                        {/* Verification notice if not verified */}
                        {!user.isVerified && (
                            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-start gap-3">
                                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-sm">Email Verification Pending</h4>
                                    <p className="text-xs text-amber-500/80 mt-1">
                                        Your email has not been verified yet. Please check your inbox for the link we sent, or visit your email provider to verify.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                                <span className="text-xs font-semibold text-slate-500 block mb-1 uppercase tracking-wider">Username</span>
                                <span className="text-lg font-bold text-slate-100">{user.username}</span>
                            </div>
                            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                                <span className="text-xs font-semibold text-slate-500 block mb-1 uppercase tracking-wider">Email Address</span>
                                <span className="text-lg font-bold text-slate-100">{user.email}</span>
                            </div>
                            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                                <span className="text-xs font-semibold text-slate-500 block mb-1 uppercase tracking-wider">Role</span>
                                <span className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                    {user.isAdmin ? (
                                        <span className="px-2 py-1 text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-md">Administrator</span>
                                    ) : (
                                        <span className="px-2 py-1 text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-md">Standard User</span>
                                    )}
                                </span>
                            </div>
                            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                                <span className="text-xs font-semibold text-slate-500 block mb-1 uppercase tracking-wider">Account Status</span>
                                <span className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                    {user.isVerified ? (
                                        <span className="px-2 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md">Verified</span>
                                    ) : (
                                        <span className="px-2 py-1 text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-md">Unverified</span>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap gap-4">
                            <Link
                                href={`/profile/${user._id}`}
                                className="px-5 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20 flex items-center gap-2 text-sm"
                            >
                                View Public Profile Token
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>

                            <button
                                onClick={getUserDetails}
                                className="px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all duration-200 text-sm"
                            >
                                Refresh Details
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-red-400">Failed to load user information.</p>
                        <button
                            onClick={getUserDetails}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}