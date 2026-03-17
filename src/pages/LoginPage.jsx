import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import AnimatedContent from '@/components/AnimatedContent';

const LoginPage = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const { signIn } = useAuth();
 const { toast } = useToast();
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
 e.preventDefault();
 setIsSubmitting(true);

 try {
 const { error } = await signIn(email, password);
 
 if (error) throw error;

 toast({
 title:"Success!",
 description:"You have successfully signed in.",
 });
 navigate('/dashboard'); // Redirect to dashboard after login
 } catch (error) {
 // Error is already handled by AuthContext toast
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <>
 <Helmet>
 <title>Login | Unifiedhive</title>
 <meta name="description"content="Login to your Unifiedhive account."/>
 </Helmet>

 <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 dark:bg-[#050A14] px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="fade"className="max-w-md w-full space-y-8 bg-white dark:bg-[#0A1228] p-8 rounded-xl shadow-lg dark:shadow-black/20 border border-gray-100">
 <div className="text-center">
 <Link to="/"className="inline-block mb-6">
 <img 
 src="https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/1430f2a1851e05749c053aa021c5da01.png"
 alt="Unifiedhive Logo"
 className="w-16 h-16"
 src="https://images.unsplash.com/photo-1690766637215-76d8ae09e158"/>
 </Link>
 <h2 className="mt-2 text-3xl font-extrabold text-[#001F3F] dark:text-white font-heading">
 Welcome Back
 </h2>
 <p className="mt-2 text-sm text-muted-foreground">
 Sign in to your account to manage your services
 </p>
 </div>

 <form className="mt-8 space-y-6"onSubmit={handleSubmit}>
 <div className="rounded-md shadow-sm space-y-4">
 <div>
 <label htmlFor="email-address"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Email address
 </label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Mail size={20} className="text-gray-400"/>
 </div>
 <input
 id="email-address"
 name="email"
 type="email"
 autoComplete="email"
 required
 className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-white/[0.08] placeholder-gray-500 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-[#FFC107] focus:border-[#FFC107] focus:z-10 sm:text-sm"
 placeholder="Enter your email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 />
 </div>
 </div>
 <div>
 <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
 Password
 </label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Lock size={20} className="text-gray-400"/>
 </div>
 <input
 id="password"
 name="password"
 type="password"
 autoComplete="current-password"
 required
 className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-white/[0.08] placeholder-gray-500 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-[#FFC107] focus:border-[#FFC107] focus:z-10 sm:text-sm"
 placeholder="Enter your password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 </div>
 </div>
 </div>

 <div className="flex items-center justify-between">
 <div className="text-sm">
 <a href="#"className="font-medium text-[#001F3F] dark:text-white hover:text-[#FFC107] transition-colors">
 Forgot your password?
 </a>
 </div>
 </div>

 <div>
 <Button
 type="submit"
 className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-[#001F3F] bg-[#FFC107] hover:bg-[#FFB300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFC107] transition-all duration-200"
 disabled={isSubmitting}
 >
 {isSubmitting ? 'Signing in...' : 'Sign in'}
 <ArrowRight className="ml-2 -mr-1 h-5 w-5 text-[#001F3F]"aria-hidden="true"/>
 </Button>
 </div>

 <div className="text-center mt-4">
 <p className="text-sm text-muted-foreground">
 Don't have an account?{' '}
 <Link to="/signup"className="font-medium text-[#001F3F] dark:text-white hover:text-[#FFC107] transition-colors">
 Sign up
 </Link>
 </p>
 </div>
 </form>
 </AnimatedContent>
 </div>
 </>
 );
};

export default LoginPage;