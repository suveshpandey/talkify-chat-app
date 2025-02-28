import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const VerifyEmailPage = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [isVerifying, setIsVerifying] = useState(false);
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const { verifyEmail, resendVerificationCode } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) {
            toast.error('No email found for verification');
            navigate('/signup');
        }
    }, [email, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || code.length !== 6) return;
        
        setIsVerifying(true);
        setError('');
        try {
            await verifyEmail(email, code);
            navigate('/');
        } catch (error) {
            setError('Invalid or expired verification code');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        if (!email) return;
        
        setCooldown(60);
        try {
            await resendVerificationCode(email);
        } catch (error) {
            setCooldown(0);  // Reset cooldown on error
        }
    };
    
    useEffect(() => {
        let intervalId: number | null = null;
    
        if (cooldown > 0) {
            intervalId = window.setInterval(() => {
                setCooldown(c => c - 1);
            }, 1000);
        }
    
        return () => {
            if (intervalId !== null) {
                window.clearInterval(intervalId);
            }
        };
    }, [cooldown]);

    if (!email) return null;

    return (
        <div className="">
            <div className="font-[sans-serif] h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 flex items-center justify-center duration-200 transition-all">
                <div className="max-w-md w-full p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg mx-4">
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-indigo-400 mb-6 text-center">
                        Verify Your Email
                    </h2>
                    <p className="text-gray-600 dark:text-slate-300 mb-6 text-center">
                        We've sent a 6-digit code to <span className="font-semibold">{email}</span>
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-slate-300 text-sm mb-2">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={6}
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0,6))}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-indigo-400 focus:border-transparent text-center text-xl duration-200 transition-all"
                                placeholder="XXXXXX"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isVerifying}
                            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isVerifying ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader />
                                    Verifying...
                                </div>
                            ) : (
                                'Verify Email'
                            )}
                        </button>

                        <div className="mt-4 text-center">
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={cooldown > 0}
                                className="text-blue-600 dark:text-indigo-400 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                                Resend Code {cooldown > 0 && `(${cooldown}s)`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;