import React, { useEffect } from 'react';

// This component acts as a backup/manager for the script in index.html 
// to ensure it handles route changes or single-page app behavior correctly if needed.
// However, since we placed the main script in index.html, this component now primarily
// ensures cleanup or additional API configurations if necessary.

const TawkToChat = () => {
    useEffect(() => {
        // Configure Tawk.to to sit slightly higher to match the new UI layout
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_API.customStyle = {
            visibility: {
                desktop: {
                    position: 'br',
                    xOffset: '24px',
                    yOffset: '40px'
                },
                mobile: {
                    position: 'br',
                    xOffset: '16px',
                    yOffset: '40px'
                }
            }
        };

        // If Tawk_API exists, we can use it to maximize/minimize or set attributes
        if (window.Tawk_API && window.Tawk_API.onLoad) {
            // Setup any listeners here if needed
        }

        // Clean up isn't typically needed for the persistent widget,
        // but we can ensure it's visible on mount in case it was hidden
        if (window.Tawk_API && window.Tawk_API.showWidget) {
            window.Tawk_API.showWidget();
        }
    }, []);

    return null;
};

export default TawkToChat;