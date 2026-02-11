"use client";
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { signIn } from 'next-auth/react';

/**
 * A glassmorphism-style login form component with animated labels and Google login.
 */
export function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <div className="w-full max-w-sm p-8 space-y-6 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl relative z-10">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                <p className="mt-2 text-sm text-zinc-400">Sign in to Zenith Platform</p>
            </div>
            <form action={formAction} className="space-y-8">
                {/* Email Input with Animated Label */}
                <div className="relative z-0 group">
                    <input
                        type="email"
                        name="email"
                        id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-zinc-600 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer transition-colors"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_email"
                        className="absolute text-sm text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        <User className="inline-block mr-2 -mt-1" size={16} />
                        Email Address
                    </label>
                </div>
                {/* Password Input with Animated Label */}
                <div className="relative z-0 group">
                    <input
                        type="password"
                        name="password"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-zinc-600 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer transition-colors"
                        placeholder=" "
                        required
                        minLength={6}
                    />
                    <label
                        htmlFor="floating_password"
                        className="absolute text-sm text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        <Lock className="inline-block mr-2 -mt-1" size={16} />
                        Password
                    </label>
                </div>

                <div className="flex items-center justify-between">
                    <a href="#" className="text-xs text-zinc-400 hover:text-white transition">Forgot Password?</a>
                </div>

                <div className="space-y-2">
                    <Button
                        type="submit"
                        aria-disabled={isPending}
                        disabled={isPending}
                        className="group w-full flex items-center justify-center py-6 bg-violet-600 hover:bg-violet-700 rounded-lg text-white font-semibold shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>
                    {errorMessage && (
                        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase tracking-wider">Or continue with</span>
                    <div className="flex-grow border-t border-white/10"></div>
                </div>

                {/* Google Login Button */}
                <button
                    type="button"
                    onClick={() => signIn('google')}
                    className="w-full flex items-center justify-center py-2.5 px-4 bg-white hover:bg-zinc-100 rounded-lg text-zinc-900 font-medium transition-all duration-300"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.841C34.553 4.806 29.613 2.5 24 2.5C11.983 2.5 2.5 11.983 2.5 24s9.483 21.5 21.5 21.5S45.5 36.017 45.5 24c0-1.538-.135-3.022-.389-4.417z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12.5 24 12.5c3.059 0 5.842 1.154 7.961 3.039l5.839-5.841C34.553 4.806 29.613 2.5 24 2.5C16.318 2.5 9.642 6.723 6.306 14.691z"></path><path fill="#4CAF50" d="M24 45.5c5.613 0 10.553-2.306 14.802-6.341l-5.839-5.841C30.842 35.846 27.059 38 24 38c-5.039 0-9.345-2.608-11.124-6.481l-6.571 4.819C9.642 41.277 16.318 45.5 24 45.5z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l5.839 5.841C44.196 35.123 45.5 29.837 45.5 24c0-1.538-.135-3.022-.389-4.417z"></path>
                    </svg>
                    Sign in with Google
                </button>

            </form>
            <p className="text-center text-xs text-zinc-500">
                Don&apos;t have an account? <a href="/signup" className="font-semibold text-violet-400 hover:text-violet-300 transition">Sign Up</a>
            </p>
        </div>
    );
}
