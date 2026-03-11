import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

const BOOKING_LINK = 'https://outlook.office.com/book/UnifiedHive4@Unifiedhive.com/';

/**
 * BookingEmbed — Microsoft Bookings button link
 * Frame access is restricted by MS 365 so we provide the standalone button the client requested.
 */
const BookingEmbed = ({ className = '' }) => {
    return (
        <div className={`flex justify-center mb-6 ${className}`}>
            <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#F0C800] text-[#050A14] font-bold rounded-full hover:shadow-lg hover:shadow-[#FFD700]/25 transition-all duration-300 hover:-translate-y-0.5 text-base"
            >
                <Calendar size={20} />
                Schedule online
                <ExternalLink size={16} className="opacity-60" />
            </a>
        </div>
    );
};

export default BookingEmbed;
