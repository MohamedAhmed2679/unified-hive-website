import React from 'react';

/**
 * GoogleMap — Embeds Google Maps for the company location.
 * Uses iframe embed (no API key required).
 * Location: 700 A.D. Mosley Street, Ferris TX 75125, US
 */
const GoogleMap = ({ className = '', height = '350px' }) => {
    // Official Google Maps Share Embed URL to bypass SAMEORIGIN policy without an API key
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3369.3088927806143!2d-96.6710474!3d32.5312847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864ea5d710777d07%3A0xe7f920f01eb652d3!2s700%20AD%20Mosley%20St%2C%20Ferris%2C%20TX%2075125!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus";

    return (
        <div className={`relative rounded-xl overflow-hidden border border-white/[0.08] dark:border-white/[0.08] ${className}`} style={{ height }}>
            <iframe
                src={mapSrc}
                className="absolute top-0 left-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Unified Hive location"
                title="Unified Hive Office Location"
                allowFullScreen
            />
        </div>
    );
};

export default GoogleMap;
