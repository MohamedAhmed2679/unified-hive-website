import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// ─── Inline SVG Social Icons ───
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
);
const RedditIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 000-.463.327.327 0 00-.462 0c-.545.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.205-.094z" /></svg>
);
const MicrosoftIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z" /></svg>
);

const socialLinks = [
  { name: "LinkedIn", icon: LinkedInIcon, url: "https://www.linkedin.com/company/unifiedhive" },
  { name: "X", icon: XIcon, url: "https://x.com/UnifiedHive" },
  { name: "Facebook", icon: FacebookIcon, url: "https://www.facebook.com/profile.php?id=61585777135146" },
  { name: "Instagram", icon: InstagramIcon, url: "https://www.instagram.com/unifiedhive?igsh=MTJpYzBnYzdib2J3Yg%3D%3D&utm_source=qr" },
  { name: "TikTok", icon: TikTokIcon, url: "https://www.tiktok.com/@unifiedhive?_r=1&_t=ZS-92WVvdL70nw" },
  { name: "YouTube", icon: YouTubeIcon, url: "https://www.youtube.com/channel/UCuOzD6hbJpcaRqgswo37CzA" },
  { name: "GitHub", icon: GitHubIcon, url: "https://github.com/Unifiedhive" },
  { name: "Reddit", icon: RedditIcon, url: "https://www.reddit.com/u/unifiedhive/s/maZUsP5lmO" },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
        const subject = encodeURIComponent("Subscribe to Unified Hive Newsletter");
        const body = encodeURIComponent(`Hello,\n\nI would like to subscribe to the Unified Hive newsletter. Please add my email address (${email}) to your mailing list.\n\nThank you!`);
        window.location.href = `mailto:info@unifiedhive.com?subject=${subject}&body=${body}`;
        
        toast({ title: "Ready to Send", description: "Your email client has been opened. Please send the message to subscribe." });
        setEmail('');
        setIsSubmitting(false);
    }, 500);
  };

  return (
    <footer className="relative border-t border-white/[0.04] theme-transition" role="contentinfo">
      {/* Gradient glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />

      <div className="absolute inset-0 bg-[#050A14] dark:opacity-100 opacity-0" />
      <div className="absolute inset-0 bg-[#001F3F] dark:opacity-0 opacity-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 relative z-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2.5 mb-4">
              <img src="https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/65a7b1a51649e52a56ad0d3c553b286e.png" alt="Unified Hive Logo" className="w-9 h-9 object-contain" width="36" height="36" />
              <span className="text-lg font-bold font-heading tracking-tight">Unified Hive</span>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">Operational resilience through smart IT consulting</p>
            <div className="flex flex-col space-y-3 mt-auto">
              <span className="text-xs font-semibold text-[#FFD700] uppercase tracking-[0.15em]">Join our digital hive 🐝</span>
              <div className="flex items-center space-x-3 flex-wrap gap-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#FFD700] transition-all duration-300 hover:scale-110 tap-target"
                    aria-label={`Follow us on ${link.name}`}
                    title={link.name}
                  >
                    <link.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700] mb-5 block">Quick Links</span>
            <ul className="space-y-3">
              {[
                { name: "Solutions", path: "/solutions" },
                { name: "About", path: "/about" },
                { name: "Blog", path: "/blog" },
                { name: "Contact", path: "/contact" },
                { name: "Book a Demo", path: "/book-demo" }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700] mb-5 block">Contact</span>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="tel:+201151152279" className="flex items-start gap-3 hover:text-[#FFD700] transition-colors">
                  <Phone size={16} className="mt-0.5 text-[#06B6D4] flex-shrink-0" />
                  <span className="text-gray-400">+20 115 115 2279</span>
                </a>
              </li>
              <li>
                <a href="mailto:Info@unifiedhive.com" className="flex items-start gap-3 hover:text-[#FFD700] transition-colors">
                  <Mail size={16} className="mt-0.5 text-[#06B6D4] flex-shrink-0" />
                  <span className="text-gray-400 break-all">Info@unifiedhive.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-[#06B6D4] flex-shrink-0" />
                <span className="text-gray-400">700 A.D. Mosley Street, Ferris TX 75125, US</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700] mb-5 block">Newsletter</span>
            <p className="text-sm text-gray-400 mb-4">Get the latest insights and updates</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500 focus:outline-none focus:border-[#06B6D4]/50 focus:ring-1 focus:ring-[#06B6D4]/20 transition-all duration-300 text-sm"
                required
                disabled={isSubmitting}
              />
              <Button type="submit" className="w-full btn-premium text-sm" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Unified Hive. All rights reserved.</p>
            <div className="flex space-x-6 text-xs">
              <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-gray-500 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;