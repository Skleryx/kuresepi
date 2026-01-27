import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Typically Supabase requires email confirmation, but we can handle redirects
            navigate('/');
            // Or show a message "Check your email"
            alert('Registration successful! Please check your email for confirmation link.');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
            <div className="w-full max-w-md bg-bg-secondary/80 backdrop-blur-cyber rounded-2xl border border-border-glow p-8 shadow-card">
                <h2 className="text-3xl font-serif text-neon-green mb-6 text-center">Join Kuresepi</h2>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-text-muted mb-2 font-montserrat">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-bg-main border border-border-soft rounded-lg px-4 py-3 text-text-main focus:border-neon-teal focus:outline-none focus:shadow-neon transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-text-muted mb-2 font-montserrat">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-bg-main border border-border-soft rounded-lg px-4 py-3 text-text-main focus:border-neon-teal focus:outline-none focus:shadow-neon transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-text-muted mb-2 font-montserrat">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-bg-main border border-border-soft rounded-lg px-4 py-3 text-text-main focus:border-neon-teal focus:outline-none focus:shadow-neon transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-soft text-white font-bold py-3 rounded-lg shadow-neon hover:shadow-neonStrong transition-all duration-300"
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="mt-6 text-center text-text-muted text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-neon-lime hover:text-white transition-colors">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
