import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User, Phone, Briefcase, Building2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import AnimatedContent from '@/components/AnimatedContent';
import { supabase } from '@/lib/customSupabaseClient';

const SignUpPage = () => {
 const [formData, setFormData] = useState({
 firstName: '',
 lastName: '',
 email: '',
 phone: '',
 company: '',
 jobTitle: '',
 password: '',
 confirmPassword: ''
 });
 const [showPassword, setShowPassword] = useState(false);
 const [agreed, setAgreed] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isOAuthLoading, setIsOAuthLoading] = useState(null);
 const [passwordStrength, setPasswordStrength] = useState(0); // 0-4
 
 const { signUp, signInWithOAuth } = useAuth();
 const { toast } = useToast();
 const navigate = useNavigate();

 // Real-time validation regex
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Basic E.164 format validation

 useEffect(() => {
 // Password strength calculation
 const pwd = formData.password;
 let strength = 0;
 if (pwd.length >= 8) strength += 1;
 if (/[A-Z]/.test(pwd)) strength += 1;
 if (/[0-9]/.test(pwd)) strength += 1;
 if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;
 setPasswordStrength(strength);
 }, [formData.password]);

 const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormData(prev => ({ ...prev, [name]: value }));
 };

 const getStrengthColor = () => {
 switch (passwordStrength) {
 case 0: return 'bg-gray-200';
 case 1: return 'bg-red-500';
 case 2: return 'bg-orange-500';
 case 3: return 'bg-yellow-500';
 case 4: return 'bg-green-500';
 default: return 'bg-gray-200';
 }
 };

 const getStrengthLabel = () => {
 switch (passwordStrength) {
 case 0: return '';
 case 1: return 'Weak';
 case 2: return 'Fair';
 case 3: return 'Good';
 case 4: return 'Strong';
 default: return '';
 }
 };

 const handleOAuth = async (provider) => {
 try {
 setIsOAuthLoading(provider);
 // Supabase providers are strictly: 'google', 'azure' (for Microsoft), 'apple' (for iCloud)
 console.log(`Initiating OAuth for provider: ${provider}`);
 
 const { error } = await signInWithOAuth(provider);
 
 if (error) {
 console.error("OAuth Error Details:", error);
 throw error;
 }
 // If successful, Supabase client redirects the browser window. 
 // We don't stop the loading state immediately to prevent UI flash before redirect.
 } catch (error) {
 setIsOAuthLoading(null);
 // Error handling is done in AuthContext, but we log here for debugging
 console.error(`${provider} sign-in error:`, error);
 }
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 
 if (!agreed) {
 toast({
 variant:"destructive",
 title:"Agreement Required",
 description:"Please agree to the Terms of Service and Privacy Policy.",
 });
 return;
 }

 if (formData.password !== formData.confirmPassword) {
 toast({
 variant:"destructive",
 title:"Passwords Mismatch",
 description:"Passwords do not match. Please try again.",
 });
 return;
 }

 if (!emailRegex.test(formData.email)) {
 toast({ variant:"destructive", title:"Invalid Email", description:"Please enter a valid email address."});
 return;
 }

 if (!phoneRegex.test(formData.phone.replace(/[^0-9+]/g, ''))) {
 toast({ variant:"destructive", title:"Invalid Phone", description:"Please enter a valid phone number."});
 return;
 }

 setIsSubmitting(true);

 try {
 // 1. Sign up user
 const { data: authData, error: authError } = await signUp(formData.email, formData.password);
 
 if (authError) throw authError;

 if (authData?.user) {
 // 2. Create profile
 const { error: profileError } = await supabase
 .from('profiles')
 .insert([
 {
 id: authData.user.id,
 first_name: formData.firstName,
 last_name: formData.lastName,
 email: formData.email,
 phone: formData.phone,
 company: formData.company,
 job_title: formData.jobTitle
 }
 ]);

 if (profileError) {
 console.error("Profile creation failed:", profileError);
 // Continue anyway, user is created
 }

 toast({
 title:"Account Created!",
 description:"Welcome to Unifiedhive. Redirecting to dashboard...",
 });

 setTimeout(() => {
 navigate('/dashboard');
 }, 1500);
 }
 } catch (error) {
 // Error handled by context toast usually
 console.error(error);
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <>
 <Helmet>
 <title>Sign Up | Unifiedhive</title>
 <meta name="description"content="Create your Unifiedhive account to access exclusive IT resources and manage your services."/>
 <meta property="og:title"content="Sign Up | Unifiedhive"/>
 <meta property="og:description"content="Create your Unifiedhive account."/>
 <meta property="og:image"content="https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/32e2f0ba808a982fc7905f7808be64c1.png"/>
 </Helmet>

 <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 dark:bg-[#050A14] px-4 sm:px-6 lg:px-8">
 <div className="max-w-2xl w-full space-y-8 bg-white dark:bg-[#0A1228] p-8 rounded-xl shadow-lg dark:shadow-black/20 border border-gray-100">
 <AnimatedContent type="text"className="text-center">
 <Link to="/"className="inline-block mb-6">
 <img 
 src="https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/65a7b1a51649e52a56ad0d3c553b286e.png"
 alt="Unifiedhive Logo"
 className="w-16 h-16 object-contain"
 width="64"
 height="64"
 />
 </Link>
 <h1 className="text-3xl font-extrabold text-foreground font-heading">Create Account</h1>
 <p className="mt-2 text-muted-foreground">Join Unifiedhive today</p>
 </AnimatedContent>

 {/* OAuth Section */}
 <div className="space-y-3">
 <Button 
 variant="outline"
 className="w-full justify-center gap-3 h-12 hover:bg-gray-50 relative"
 onClick={() => handleOAuth('google')}
 disabled={!!isOAuthLoading}
 aria-label="Sign up with Google"
 >
 {isOAuthLoading === 'google' ? (
 <Loader2 className="animate-spin w-5 h-5 absolute"/>
 ) : (
 <img src="https://www.svgrepo.com/show/475656/google-color.svg"alt=""className="w-5 h-5"aria-hidden="true"/>
 )}
 <span className={isOAuthLoading === 'google' ? 'invisible' : ''}>Sign up with Google</span>
 </Button>
 <Button 
 variant="outline"
 className="w-full justify-center gap-3 h-12 hover:bg-gray-50 relative"
 onClick={() => handleOAuth('azure')}
 disabled={!!isOAuthLoading}
 aria-label="Sign up with Microsoft"
 >
 {isOAuthLoading === 'azure' ? (
 <Loader2 className="animate-spin w-5 h-5 absolute"/>
 ) : (
 <img src="https://www.svgrepo.com/show/452269/microsoft.svg"alt=""className="w-5 h-5"aria-hidden="true"/>
 )}
 <span className={isOAuthLoading === 'azure' ? 'invisible' : ''}>Sign up with Microsoft</span>
 </Button>
 <Button 
 variant="outline"
 className="w-full justify-center gap-3 h-12 hover:bg-gray-50 relative"
 onClick={() => handleOAuth('apple')}
 disabled={!!isOAuthLoading}
 aria-label="Sign up with Apple"
 >
 {isOAuthLoading === 'apple' ? (
 <Loader2 className="animate-spin w-5 h-5 absolute"/>
 ) : (
 <img src="https://www.svgrepo.com/show/445156/apple.svg"alt=""className="w-5 h-5"aria-hidden="true"/>
 )}
 <span className={isOAuthLoading === 'apple' ? 'invisible' : ''}>Sign up with Apple</span>
 </Button>
 </div>

 <div className="relative">
 <div className="absolute inset-0 flex items-center">
 <div className="w-full border-t border-gray-300 dark:border-white/[0.08]"></div>
 </div>
 <div className="relative flex justify-center text-sm">
 <span className="px-2 bg-white dark:bg-[#0A1228] text-muted-foreground">Or continue with email</span>
 </div>
 </div>

 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* First Name */}
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
 <label htmlFor="firstName"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name *</label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <User size={18} className="text-gray-400"aria-hidden="true"/>
 </div>
 <input
 type="text"
 id="firstName"
 name="firstName"
 required
 className="pl-10 w-full p-3 bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-lg bg-white dark:bg-[#0A1228] dark:bg-white/10 dark:text-white focus:ring-[#FFD700] focus:border-[#FFD700] outline-none"
 placeholder="John"
 value={formData.firstName}
 onChange={handleInputChange}
 />
 </div>
 </motion.div>

 {/* Last Name */}
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
 <label htmlFor="lastName"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name *</label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <User size={18} className="text-gray-400"aria-hidden="true"/>
 </div>
 <input
 type="text"
 id="lastName"
 name="lastName"
 required
 className="pl-10 w-full p-3 bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-lg bg-white dark:bg-[#0A1228] dark:bg-white/10 dark:text-white focus:ring-[#FFD700] focus:border-[#FFD700] outline-none"
 placeholder="Doe"
 value={formData.lastName}
 onChange={handleInputChange}
 />
 </div>
 </motion.div>

 {/* Email */}
 <motion.div className="md:col-span-2"initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
 <label htmlFor="email"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Mail size={18} className="text-gray-400"aria-hidden="true"/>
 </div>
 <input
 type="email"
 id="email"
 name="email"
 required
 className="pl-10 w-full p-3 bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-lg bg-white dark:bg-[#0A1228] dark:bg-white/10 dark:text-white focus:ring-[#FFD700] focus:border-[#FFD700] outline-none"
 placeholder="john@company.com"
 value={formData.email}
 onChange={handleInputChange}
 />
 {formData.email && !emailRegex.test(formData.email) && (
 <p className="text-xs text-red-500 mt-1"role="alert">Invalid email format</p>
 )}
 </div>
 </motion.div>

 {/* Phone */}
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
 <label htmlFor="phone"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Phone size={18} className="text-gray-400"aria-hidden="true"/>
 </div>
 <input
 type="tel"
 id="phone"
 name="phone"
 required
 className="pl-10 w-full p-3 bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-lg bg-white dark:bg-[#0A1228] dark:bg-white/10 dark:text-white focus:ring-[#FFD700] focus:border-[#FFD700] outline-none"
 placeholder="+1 (555) 000-0000"
 value={formData.phone}
 onChange={handleInputChange}
 />
 </div>
 </motion.div>

 {/* Job Title */}
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
 <label htmlFor="jobTitle"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title *</label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Briefcase size={18} className="text-gray-400"aria-hidden="true"/>
 </div>
 <input
 type="text"
 id="jobTitle"
 name="jobTitle"
 required
 className="pl-10 w-full p-3 bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-lg bg-white dark:bg-[#0A1228] dark:bg-white/10 dark:text-white focus:ring-[#FFD700] focus:border-[#FFD700] outline-none"
 placeholder="CTO"
 value={formData.jobTitle}
 onChange={handleInputChange}
 />
 </div>
 </motion.div>

 {/* Company */}
 <motion.div className="md:col-span-2"initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
 <label htmlFor="company"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name *</label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Building2 size={18} className="text-gray-400"aria-hidden="true"/>
 </div>
 <input
 type="text"
 id="company"
 name="company"
 required
 className="pl-10 w-full p-3 bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-lg bg-white dark:bg-[#0A1228] dark:bg-white/10 dark:text-white focus:ring-[#FFD700] focus:border-[#FFD700] outline-none"
 placeholder="Unifiedhive Inc."
 value={formData.company}
 onChange={handleInputChange}
 />
 </div>
 </motion.div>

 {/* Password */}
 <motion.div className="md:col-span-2"initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
 <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password *</label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Lock size={18} className="text-gray-400"aria-hidden="true"/>
 </div>
 <input
 type={showPassword ?"text":"password"}
 id="password"
 name="password"
 required
 className="pl-10 w-full p-3 bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-lg bg-white dark:bg-[#0A1228] dark:bg-white/10 dark:text-white focus:ring-[#FFD700] focus:border-[#FFD700] outline-none"
 placeholder="••••••••"
 value={formData.password}
 onChange={handleInputChange}
 />
 <button
 type="button"
 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-400"
 onClick={() => setShowPassword(!showPassword)}
 aria-label={showPassword ?"Hide password":"Show password"}
 >
 {showPassword ? <EyeOff size={18} aria-hidden="true"/> : <Eye size={18} aria-hidden="true"/>}
 </button>
 </div>
 
 {/* Strength Indicator */}
 {formData.password && (
 <div className="mt-2"aria-live="polite">
 <div className="flex justify-between text-xs mb-1">
 <span>Strength: <span className="font-semibold">{getStrengthLabel()}</span></span>
 </div>
 <div className="flex gap-1 h-1.5">
 {[1, 2, 3, 4].map((step) => (
 <div 
 key={step} 
 className={`flex-1 rounded-full transition-all duration-300 ${step <= passwordStrength ? getStrengthColor() : 'bg-gray-200'}`} 
 />
 ))}
 </div>
 </div>
 )}
 </motion.div>

 {/* Confirm Password */}
 <motion.div className="md:col-span-2"initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
 <label htmlFor="confirmPassword"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password *</label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Lock size={18} className="text-gray-400"aria-hidden="true"/>
 </div>
 <input
 type="password"
 id="confirmPassword"
 name="confirmPassword"
 required
 className="pl-10 w-full p-3 bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-lg bg-white dark:bg-[#0A1228] dark:bg-white/10 dark:text-white focus:ring-[#FFD700] focus:border-[#FFD700] outline-none"
 placeholder="••••••••"
 value={formData.confirmPassword}
 onChange={handleInputChange}
 />
 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
 <p className="text-xs text-red-500 mt-1"role="alert">Passwords do not match</p>
 )}
 </div>
 </motion.div>
 </div>

 {/* Terms */}
 <div className="flex items-start">
 <div className="flex items-center h-5">
 <input
 id="terms"
 type="checkbox"
 className="w-4 h-4 border border-gray-300 dark:border-white/[0.08] rounded bg-gray-50 dark:bg-[#050A14] focus:ring-3 focus:ring-[#FFD700]"
 checked={agreed}
 onChange={(e) => setAgreed(e.target.checked)}
 />
 </div>
 <label htmlFor="terms"className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
 I agree to the <Link to="/terms"className="text-foreground hover:underline">Terms of Service</Link> and <Link to="/privacy"className="text-foreground hover:underline">Privacy Policy</Link>.
 </label>
 </div>

 <Button
 type="submit"
 disabled={isSubmitting || !agreed}
 className="w-full h-12 bg-[#001F3F] hover:bg-[#003366] text-white font-bold text-lg transition-all duration-200 shadow-lg dark:shadow-black/20"
 >
 {isSubmitting ? 'Creating Account...' : 'Create Account'}
 </Button>

 <div className="text-center mt-4">
 <p className="text-sm text-muted-foreground">
 Already have an account?{' '}
 <Link to="/login"className="font-medium text-foreground hover:text-[#FFD700] transition-colors">
 Log in
 </Link>
 </p>
 </div>
 </form>
 </div>
 </div>
 </>
 );
};

export default SignUpPage;