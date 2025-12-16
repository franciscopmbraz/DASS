import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Sign up the user with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name,
                    },
                },
            });

            if (authError) throw authError;

            if (authData.user) {
                // 2. Insert into users table (optional if using triggers, but good for explicit control)
                const { error: dbError } = await supabase
                    .from('users')
                    .insert([
                        {
                            id: authData.user.id,
                            email: formData.email,
                            full_name: formData.name
                        }
                    ]);

                if (dbError) {
                    // If insert fails, it might be due to RLS or duplicate key if trigger exists.
                    // For this simple example, we'll log it but consider auth success as primary.
                    console.error('Error inserting user data:', dbError);
                }

                setSuccess(true);
                setFormData({ name: '', email: '', password: '' });
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/valorant/1920/1080')] bg-cover bg-center opacity-20 blur-sm mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950"></div>

                {/* Animated Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[128px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[128px]"></div>
            </div>

            <Link to="/" className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors z-20">
                <X className="w-8 h-8" />
            </Link>

            <div className="relative z-10 glass-card p-8 rounded-2xl shadow-2xl border border-white/10 w-full max-w-md backdrop-blur-xl">
                <h1 className="text-3xl font-bold mb-2 text-center text-white">
                    Get Early Access
                </h1>
                <p className="text-center text-slate-400 mb-8">Join the revolution in esports coaching</p>

                {success ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <div className="text-green-400 text-xl font-bold mb-2">Account Created!</div>
                        <p className="text-slate-300 mb-8">Please check your email to confirm your account.</p>
                        <Link to="/login" className="block w-full bg-brand-600 hover:bg-brand-500 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40">
                            Go to Login
                        </Link>
                    </div>
                ) : (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center">
                                <span className="mr-2">⚠️</span> {error}
                            </div>
                        )}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-500 transition-all focus:border-transparent"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-500 transition-all focus:border-transparent"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-500 transition-all focus:border-transparent"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>
                )}
                <div className="mt-8 text-center text-sm text-slate-400">
                    <p>Already have an account? <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium hover:underline">Log in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
