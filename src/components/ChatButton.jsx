import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatButton = () => {
 return (
 <a 
 href="https://tawk.to/chat/69220cc3b6e2ce195ce6c6b1/1jankgrcm" 
 target="_blank" 
 rel="noopener noreferrer"
 className="fixed bottom-24 right-4 md:right-auto md:bottom-4 md:left-4 z-50"
 >
 <Button 
 className="bg-[#FFC107] hover:bg-[#FFB300] text-[#4A142C] font-bold shadow-lg hover:shadow-xl dark:shadow-black/30 transition-all duration-300 hover:-translate-y-1 rounded-full px-6 py-6 h-auto text-lg gap-2"
 >
 <MessageCircle size={24} />
 Chat with Us
 </Button>
 </a>
 );
};

export default ChatButton;