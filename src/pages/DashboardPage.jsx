import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedContent from '@/components/AnimatedContent';

const DashboardPage = () => {
 const { user, signOut } = useAuth();
 const navigate = useNavigate();

 const handleSignOut = async () => {
 await signOut();
 navigate('/login');
 };

 return (
 <>
 <Helmet>
 <title>Dashboard | Unifiedhive</title>
 </Helmet>
 <div className="pt-24 pb-12 min-h-screen bg-gray-50 dark:bg-[#050A14]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="fade">
 <div className="glass-card shadow-lg dark:shadow-black/20 p-8 border border-gray-100">
 <h1 className="text-3xl font-bold text-[#001F3F] dark:text-white mb-6 font-heading">
 Welcome to Your Dashboard
 </h1>
 <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
 Hello, {user?.email || 'User'}! You are successfully logged in.
 </p>
 
 <div className="p-6 bg-blue-50 rounded-lg border border-blue-100 mb-8">
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-2">Account Status</h2>
 <p className="text-gray-700 dark:text-gray-300">Your account is active and verified.</p>
 </div>

 <Button 
 onClick={handleSignOut}
 className="bg-[#001F3F] text-white hover:bg-[#003366]"
 >
 Sign Out
 </Button>
 </div>
 </AnimatedContent>
 </div>
 </div>
 </>
 );
};

export default DashboardPage;