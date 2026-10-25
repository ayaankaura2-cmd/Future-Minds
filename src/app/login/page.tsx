'use client';

import React, { useState } from 'react';
import { createAuthClient } from '@/lib/supabase-browser';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const supabase = createAuthClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) {
            setError('Sign in failed. Check your email and password.');
            setLoading(false);
            return;
        }

        const next = new URLSearchParams(window.location.search).get('next') || '/admin';
        const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/admin';
        window.location.href = safeNext;
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-bold text-[#0b1a30]">Staff sign in</h1>
                <p className="text-sm text-slate-500">
                    For Future Minds administrators and instructors only.
                </p>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    autoComplete="email"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0066FF] text-white font-semibold rounded-lg py-2 text-sm disabled:opacity-60"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>
        </div>
    );
}