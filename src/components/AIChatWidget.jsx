import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Minus, Bot, User, Sparkles, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UHAnalytics } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/customSupabaseClient';
import { websiteContent } from '@/lib/websiteKnowledgeBase';
import { processUserMessage } from '@/lib/chatBotLogic';
import ReactMarkdown from 'react-markdown';

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hello! 👋 I'm the Unifiedhive AI. I've been trained on our entire service catalog and methodology. Ask me about **DevOps**, **Zero Trust Security**, **Pricing**, or how we can help optimize your IT costs.",
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [leadData, setLeadData] = useState({ name: '', email: '' });

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [messages, isOpen]);

    const toggleChat = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        UHAnalytics.trackClick(newState ? 'open_chat' : 'close_chat', 'ai_widget');
    };

    // Helper to detect intent for booking/contact
    const checkIntent = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('book') || lower.includes('demo') || lower.includes('schedule') || lower.includes('call')) {
            return 'booking';
        }
        return 'general';
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMsg = { role: 'user', content: inputText.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Intent check for immediate lead capture
        if (checkIntent(userMsg.content) === 'booking' && !showLeadForm) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I can definitely help you schedule a demo! Could you please provide your name and email so our team can prepare for the call?"
            }]);
            setShowLeadForm(true);
            setIsTyping(false);
            return;
        }

        try {
            // Simulated AI processing time for natural interaction
            await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));

            const match = processUserMessage(userMsg.content);
            let finalResponseText = match.text;

            if (match.relatedLink) {
                finalResponseText += `\n\n[${match.linkText}](${match.relatedLink})`;
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: finalResponseText
            }]);

            UHAnalytics.track('ai_chat_response', {
                query_length: userMsg.content.length,
                response_length: finalResponseText.length
            });

        } catch (error) {
            console.error('Chat Error:', error);

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again or email Info@unifiedhive.com."
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        setShowLeadForm(false);

        // Save lead to DB
        await supabase.from('contact_submissions').insert([{
            name: leadData.name,
            email: leadData.email,
            message: 'Lead captured via AI Chat - Requested Demo'
        }]);

        setMessages(prev => [...prev, {
            role: 'user',
            content: `My name is ${leadData.name} and email is ${leadData.email}`
        }, {
            role: 'assistant',
            content: `Thanks ${leadData.name}! I've forwarded your details to our team. You can also [book a time directly here](/book-demo). Is there anything specific you'd like to discuss during the demo?`
        }]);

        setLeadData({ name: '', email: '' });
    };

    // Custom renderer for markdown links to use React Router
    const MarkdownComponents = {
        a: ({ href, children }) => {
            if (href?.startsWith('/')) {
                return (
                    <Link to={href} className="text-foreground font-bold underline decoration-[#FFD700] decoration-2 underline-offset-2 hover:text-[#003366]" onClick={() => setIsOpen(false)}>
                        {children}
                    </Link>
                );
            }
            return <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{children}</a>;
        },
        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        strong: ({ children }) => <span className="font-semibold text-foreground">{children}</span>
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                className={cn(
                    "fixed bottom-4 left-4 z-[999] p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-2 border-white",
                    isOpen ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gradient-to-r from-[#001F3F] to-[#003366] text-white hover:scale-105"
                )}
                onClick={toggleChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close Chat" : "Open AI Assistant"}
            >
                {isOpen ? <X size={24} /> : <div className="relative"><Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-[#FFD700]" /><Bot size={28} /></div>}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 left-4 z-[999] w-[90vw] md:w-[400px] h-[600px] max-h-[75vh] bg-white dark:bg-[#0A1228] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-white/[0.06] ring-1 ring-black/5"
                    >
                        {/* Header */}
                        <div className="bg-[#001F3F] p-4 flex items-center justify-between text-white shrink-0 shadow-md relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="bg-white/10 p-2 rounded-full border border-white/20">
                                    <Bot size={20} className="text-[#FFD700]" />
                                </div>
                                <div>
                                    <h3 className="font-bold font-heading text-base">Unifiedhive AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span className="text-[10px] text-gray-300 font-medium">Online • GPT-Powered</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 p-1.5 rounded-lg transition-colors relative z-10"
                                aria-label="Minimize chat"
                            >
                                <Minus size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50 dark:bg-[#050A14]/50">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex gap-3 max-w-[90%]",
                                        msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border",
                                        msg.role === 'user'
                                            ? "bg-white border-gray-100 text-gray-600 dark:text-gray-400"
                                            : "bg-[#001F3F] border-[#001F3F] text-[#FFD700]"
                                    )}>
                                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>

                                    <div className={cn(
                                        "p-3.5 rounded-2xl text-sm shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-[#001F3F] text-white rounded-tr-none"
                                            : "bg-white dark:bg-[#0A1228] text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-white/[0.08] rounded-tl-none"
                                    )}>
                                        {msg.role === 'assistant' ? (
                                            <ReactMarkdown components={MarkdownComponents}>
                                                {msg.content}
                                            </ReactMarkdown>
                                        ) : (
                                            <p>{msg.content}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-[#001F3F] text-[#FFD700] flex items-center justify-center shrink-0">
                                        <Bot size={16} />
                                    </div>
                                    <div className="bg-white dark:bg-[#0A1228] border border-gray-100 dark:border-white/[0.08] p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}

                            {showLeadForm && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white dark:bg-[#0A1228] border border-[#FFD700] rounded-xl p-4 shadow-md mx-4"
                                >
                                    <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                                        <Calendar size={16} /> Schedule Demo
                                    </h4>
                                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            required
                                            className="w-full text-sm p-2 border rounded focus:border-[#001F3F] outline-none"
                                            value={leadData.name}
                                            onChange={e => setLeadData({ ...leadData, name: e.target.value })}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            required
                                            className="w-full text-sm p-2 border rounded focus:border-[#001F3F] outline-none"
                                            value={leadData.email}
                                            onChange={e => setLeadData({ ...leadData, email: e.target.value })}
                                        />
                                        <Button type="submit" size="sm" className="w-full bg-[#001F3F] hover:bg-[#003366] text-white">
                                            Confirm Details
                                        </Button>
                                    </form>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-[#0A1228] border-t border-gray-100 shrink-0">
                            <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
                                <textarea
                                    ref={inputRef}
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage(e);
                                        }
                                    }}
                                    placeholder="Ask about pricing, services, or support..."
                                    className="flex-1 bg-gray-50 dark:bg-[#050A14] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 transition-all resize-none max-h-24 min-h-[44px]"
                                    rows={1}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className={cn(
                                        "w-11 h-11 rounded-xl shrink-0 transition-all duration-200",
                                        inputText.trim()
                                            ? "bg-[#001F3F] hover:bg-[#003366] text-white shadow-lg dark:shadow-black/20 translate-y-0"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    )}
                                    disabled={!inputText.trim() || isTyping}
                                >
                                    {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className={inputText.trim() ? "ml-0.5" : ""} />}
                                </Button>
                            </form>
                            <div className="text-[10px] text-center text-gray-400 mt-2 font-medium">
                                AI can make mistakes. Please verify important details.
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatWidget;