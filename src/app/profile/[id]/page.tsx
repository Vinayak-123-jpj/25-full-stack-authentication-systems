"use client";
import React from "react";
import Link from "next/link";

export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-950 text-slate-100 relative overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-2xl z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-400 mb-6 border border-indigo-500/20">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm5 3h-10a2 2 0 01-2-2v-1a2 2 0 012-2h10a2 2 0 012 2v1a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Profile Identifier
                </h1>
                <p className="text-sm text-slate-400 mb-6">
                    This is your unique database identifier token used for authentication queries.
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-blue-400 break-all select-all hover:bg-slate-900 transition-colors cursor-pointer" title="Double click to copy">
                    {params.id}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/80">
                    <Link
                        href="/profile"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 w-full rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all duration-200 text-sm"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}