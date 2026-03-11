import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Copy, Check } from 'lucide-react';

/**
 * Magic Social Share Menu
 * Circular expand menu inspired by "Coding Stella" design.
 * Uses Web Share API on mobile, per-network URLs on desktop.
 * Privacy-friendly: no third-party trackers loaded.
 */
const MagicShareMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const menuRef = useRef(null);

    const shareData = {
        title: typeof document !== 'undefined' ? document.title : 'Unified Hive',
        text: typeof document !== 'undefined'
            ? document.querySelector('meta[name="description"]')?.content || 'Intelligent IT Solutions'
            : 'Intelligent IT Solutions',
        url: typeof window !== 'undefined' ? window.location.href : 'https://unifiedhive.com',
    };

    const enc = encodeURIComponent;
    const u = enc(shareData.url);
    const t = enc(shareData.title);
    const txt = enc(shareData.text);

    const networks = [
        {
            name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, color: '#0A66C2', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            )
        },
        {
            name: 'X', href: `https://x.com/intent/tweet?url=${u}&text=${t}`, color: '#000000', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            )
        },
        {
            name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, color: '#1877F2', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            )
        },
        {
            name: 'WhatsApp', href: `https://api.whatsapp.com/send?text=${t}%20${u}`, color: '#25D366', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            )
        },
        {
            name: 'Email', href: `mailto:?subject=${t}&body=${txt}%0A%0A${u}`, color: '#EA4335', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            )
        },
        { name: 'Copy Link', href: null, color: '#6366F1', icon: copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" /> },
    ];

    const handleToggle = async () => {
        // Try native share on mobile
        if (!isOpen && 'share' in navigator && /Mobi|Android/i.test(navigator.userAgent)) {
            try {
                await navigator.share(shareData);
                return;
            } catch { /* user cancelled or unsupported */ }
        }
        setIsOpen(!isOpen);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareData.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = shareData.url;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Calculate radial positions for bottom-left placement
    const getPosition = (index, total) => {
        const startAngle = -90; // top
        const spread = 90; // spread a quarter circle to the right
        const angle = startAngle + (spread / (total - 1)) * index;
        const rad = (angle * Math.PI) / 180;
        const radius = 90;
        return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
    };

    return (
        <div ref={menuRef} className="fixed bottom-[22px] left-[92px] md:left-[100px] z-[9998]" aria-label="Share this page">
            {/* Menu items */}
            <AnimatePresence>
                {isOpen && networks.map((net, i) => {
                    const pos = getPosition(i, networks.length);
                    return (
                        <motion.div
                            key={net.name}
                            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                            animate={{ opacity: 1, x: pos.x, y: pos.y, scale: 1 }}
                            exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                            className="absolute bottom-0 left-0"
                        >
                            {net.href ? (
                                <a
                                    href={net.href}
                                    target={net.name === 'Email' ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-200"
                                    style={{ backgroundColor: net.color }}
                                    aria-label={`Share on ${net.name}`}
                                    title={`Share on ${net.name}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {net.icon}
                                </a>
                            ) : (
                                <button
                                    onClick={handleCopy}
                                    className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-200"
                                    style={{ backgroundColor: net.color }}
                                    aria-label="Copy link"
                                    title="Copy link"
                                >
                                    {net.icon}
                                </button>
                            )}
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.button
                onClick={handleToggle}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${isOpen
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-white hover:shadow-[#06B6D4]/30 hover:shadow-2xl'
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close share menu' : 'Share this page'}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <X size={22} />
                        </motion.span>
                    ) : (
                        <motion.span key="share" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Share2 size={20} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default MagicShareMenu;
