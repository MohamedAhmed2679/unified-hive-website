import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, PlayCircle, Tag, Facebook, Instagram, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedContent from '@/components/AnimatedContent';

const BlogPage = () => {
 const [searchTerm, setSearchTerm] = useState('');

 const socialLinks = [
 { 
 name:"TikTok", 
 img:"https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/8b229057e83650107cf2c235f8e4e2a9.png", 
 url:"https://www.tiktok.com/"
 },
 { name:"Instagram", icon: Instagram, url:"https://www.instagram.com/"},
 { name:"Facebook", icon: Facebook, url:"https://www.facebook.com/"},
 { name:"GitHub", icon: Github, url:"https://github.com/"},
 { 
 name:"Reddit", 
 img:"https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/b2e9ce001e4122238a8ff14b1d0ca282.png", 
 url:"https://www.reddit.com/"
 }
 ];

 const blogPosts = [
 {
 id: 1,
 title:"The Future of Zero Trust Security",
 excerpt:"Why traditional perimeter security is failing and how Zero Trust architecture provides a robust framework for the modern distributed enterprise.",
 author:"Michael Rodriguez",
 date:"Nov 15, 2025",
 category:"Security",
 image:"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
 },
 {
 id: 2,
 title:"Optimizing Cloud Costs with Kubernetes",
 excerpt:"Practical strategies for managing resource allocation and scaling in Kubernetes clusters to reduce cloud infrastructure spend by up to 40%.",
 author:"Sarah Chen",
 date:"Nov 10, 2025",
 category:"Cloud & DevOps",
 image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
 },
 {
 id: 3,
 title:"AI-Driven Observability: Beyond Monitoring",
 excerpt:"How artificial intelligence is transforming IT operations by predicting incidents before they occur and automating root cause analysis.",
 author:"David Kim",
 date:"Nov 05, 2025",
 category:"Observability",
 image:"https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
 },
 {
 id: 4,
 title:"Modernizing Legacy Apps without Rewriting",
 excerpt:"Strategies for containerizing and refactoring monolithic applications to gain cloud-native benefits without a complete code rewrite.",
 author:"Emily Watson",
 date:"Oct 28, 2025",
 category:"Migration",
 image:"https://images.unsplash.com/photo-1558494949-ef526b00cd43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
 }
 ];

 const videos = [
 {
 id: 1,
 title:"Webinar: Mastering Multi-Cloud Strategy",
 duration:"45 min",
 thumbnail:"https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
 },
 {
 id: 2,
 title:"Tutorial: Setting up Prometheus & Grafana",
 duration:"20 min",
 thumbnail:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
 }
 ];

 const filteredPosts = blogPosts.filter(post => 
 post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
 post.category.toLowerCase().includes(searchTerm.toLowerCase())
 );

 const structuredData = {
"@context":"https://schema.org",
"@type":"Blog",
"name":"Unifiedhive Blog",
"description":"Insights on Cloud, Security, and DevOps",
"blogPost": blogPosts.map(post => ({
"@type":"BlogPosting",
"headline": post.title,
"description": post.excerpt,
"datePublished": post.date,
"author": {
"@type":"Person",
"name": post.author
 },
"image": post.image
 }))
 };

 const breadcrumbData = {
"@context":"https://schema.org",
"@type":"BreadcrumbList",
"itemListElement": [
 {
"@type":"ListItem",
"position": 1,
"name":"Home",
"item":"https://unifiedhive.com/"
 },
 {
"@type":"ListItem",
"position": 2,
"name":"Blog",
"item":"https://unifiedhive.com/blog"
 }
 ]
 };

 return (
 <>
 <Helmet>
 <title>Blog & Insights | Unifiedhive</title>
 <meta name="description"content="Latest insights, tutorials, and news on Cloud, Security, DevOps, and IT operations from Unifiedhive experts."/>
 <meta property="og:title"content="Blog & Insights | Unifiedhive"/>
 <meta property="og:description"content="Latest insights from Unifiedhive."/>
 <meta property="og:image"content="https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/32e2f0ba808a982fc7905f7808be64c1.png"/>
 <script type="application/ld+json">
 {JSON.stringify(structuredData)}
 </script>
 <script type="application/ld+json">
 {JSON.stringify(breadcrumbData)}
 </script>
 </Helmet>

 <a href="#main-content"className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-white dark:bg-[#0A1228] text-foreground p-4 rounded-md shadow-lg dark:shadow-black/20 font-bold">
 Skip to main content
 </a>

 <div className="pt-20"id="main-content">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-[#001F3F] via-[#003366] to-[#001F3F] text-white py-16"aria-label="Blog Header">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text"className="text-center">
 <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
 Insights & Updates
 </h1>
 <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
 Expert perspectives on the evolving landscape of enterprise IT
 </p>
 
 <div className="max-w-xl mx-auto relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Search size={20} className="text-gray-400"aria-hidden="true"/>
 </div>
 <input
 type="text"
 className="block w-full pl-10 pr-3 py-3 rounded-lg border-none text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
 placeholder="Search articles, topics, or keywords..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 aria-label="Search blog posts"
 />
 </div>
 <div className="mt-8 flex justify-center items-center gap-6">
 {socialLinks.map((link) => (
 <motion.a
 key={link.name}
 href={link.url}
 target="_blank"
 rel="noopener noreferrer"
 className="text-white hover:text-[#FFC107] transition-colors duration-200 flex items-center justify-center"
 whileHover={{ scale: 1.2 }}
 whileTap={{ scale: 0.9 }}
 aria-label={`Follow us on ${link.name}`}
 >
 {link.icon ? (
 <link.icon size={28} aria-hidden="true"/>
 ) : (
 <img 
 src={link.img} 
 alt={link.name} 
 className="w-7 h-7 object-contain"
 />
 )}
 </motion.a>
 ))}
 </div>
 </AnimatedContent>
 </div>
 </section>

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="grid lg:grid-cols-3 gap-12">
 
 {/* Main Content - Blog Posts */}
 <div className="lg:col-span-2">
 <div className="flex items-center justify-between mb-8">
 <h2 className="text-2xl font-bold text-[#001F3F] dark:text-white font-heading">Latest Articles</h2>
 </div>

 <div className="space-y-12">
 {filteredPosts.length > 0 ? (
 filteredPosts.map((post, index) => (
 <AnimatedContent key={post.id} type="fade"delay={index * 0.1}>
 <article className="flex flex-col md:flex-row gap-6 bg-white dark:bg-[#0A1228] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full">
 <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
 <img 
 src={post.image} 
 alt={post.title} 
 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
 />
 </div>
 <div className="flex-1 p-6 flex flex-col justify-between">
 <div>
 <div className="flex items-center gap-3 mb-3 text-xs font-semibold text-[#FFC107] uppercase tracking-wider">
 <Tag size={14} aria-hidden="true"/>
 {post.category}
 </div>
 <h3 className="text-xl font-bold text-[#001F3F] dark:text-white mb-3 font-heading hover:text-[#FFC107] transition-colors cursor-pointer">
 {post.title}
 </h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
 {post.excerpt}
 </p>
 </div>
 
 <div className="flex items-center justify-between mt-auto">
 <div className="flex items-center text-xs text-muted-foreground space-x-4">
 <div className="flex items-center">
 <User size={14} className="mr-1"aria-hidden="true"/>
 {post.author}
 </div>
 <div className="flex items-center">
 <Calendar size={14} className="mr-1"aria-hidden="true"/>
 {post.date}
 </div>
 </div>
 <Button variant="link"className="text-[#001F3F] dark:text-white hover:text-[#FFC107] p-0 h-auto font-semibold focus-visible:ring-2 focus-visible:ring-[#FFC107] rounded">
 Read More <ArrowRight size={16} className="ml-1"aria-hidden="true"/>
 </Button>
 </div>
 </div>
 </article>
 </AnimatedContent>
 ))
 ) : (
 <div className="text-center py-12 bg-white/[0.03] dark:bg-white/[0.03] rounded-lg">
 <p className="text-muted-foreground">No articles found matching your search.</p>
 </div>
 )}
 </div>
 </div>

 {/* Sidebar - Videos & Updates */}
 <aside className="lg:col-span-1 space-y-12">
 
 {/* Video Section */}
 <AnimatedContent type="fade"delay={0.2}>
 <div>
 <h2 className="text-2xl font-bold text-[#001F3F] dark:text-white font-heading mb-6">Video Tutorials</h2>
 <div className="space-y-6">
 {videos.map(video => (
 <div key={video.id} className="group cursor-pointer"tabIndex="0"role="button"aria-label={`Watch video: ${video.title}`}>
 <div className="relative rounded-lg overflow-hidden mb-3 aspect-video">
 <img 
 src={video.thumbnail} 
 alt={`Thumbnail for ${video.title}`} 
 className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
 />
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full group-hover:bg-[#FFC107] transition-colors duration-300">
 <PlayCircle size={32} className="text-white group-hover:text-[#001F3F]"aria-hidden="true"/>
 </div>
 </div>
 <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
 {video.duration}
 </div>
 </div>
 <h3 className="font-semibold text-[#001F3F] dark:text-white group-hover:text-[#FFC107] transition-colors font-heading leading-tight">
 {video.title}
 </h3>
 </div>
 ))}
 </div>
 <Button variant="outline"className="w-full mt-6 border-[#001F3F] text-[#001F3F] hover:bg-[#001F3F] dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:hover:text-white hover:text-white focus-visible:ring-2 focus-visible:ring-[#001F3F]">
 View All Videos
 </Button>
 </div>
 </AnimatedContent>

 {/* Newsletter Widget */}
 <AnimatedContent type="fade"delay={0.4}>
 <div className="bg-[#001F3F] dark:bg-white/[0.06] text-white rounded-xl p-6">
 <h3 className="text-xl font-bold mb-2 font-heading">Stay Updated</h3>
 <p className="text-sm text-gray-300 mb-4">
 Get the latest tech insights delivered to your inbox.
 </p>
 <form className="space-y-3"onSubmit={(e) => {
 e.preventDefault();
 // Logic handled in footer/contact, simplified here
 alert("Please use the footer or contact page for subscription at this time.");
 }}>
 <label htmlFor="sidebar-email"className="sr-only">Email Address</label>
 <input 
 id="sidebar-email"
 type="email"
 placeholder="Your email"
 className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFC107] text-sm"
 required
 />
 <Button className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-[#001F3F] font-bold focus-visible:ring-2 focus-visible:ring-white">
 Subscribe
 </Button>
 </form>
 </div>
 </AnimatedContent>

 </aside>
 </div>
 </div>
 </div>
 </>
 );
};

export default BlogPage;