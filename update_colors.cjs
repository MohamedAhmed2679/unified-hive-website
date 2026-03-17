const fs = require('fs');
const path = require('path');

const applyReplacements = (file) => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    if (file.includes('LoginPage.jsx')) {
        content = content.replace('text-[#4A142C] font-heading', 'text-[#001F3F] dark:text-white font-heading');
        content = content.replace('className="font-medium text-[#4A142C]', 'className="font-medium text-[#001F3F] dark:text-white');
        content = content.replace('className="font-medium text-[#4A142C]', 'className="font-medium text-[#001F3F] dark:text-white'); // Two instances
        content = content.replace(/text-\[\#4A142C\] bg-\[\#FFC107\]/g, 'text-[#001F3F] bg-[#FFC107]');
        content = content.replace(/text-\[\#4A142C\]"/g, 'text-[#001F3F]"'); // For ArrowRight
    }

    if (file.includes('MultiStepDemoForm.jsx')) {
        content = content.replace(/text-\[\#4A142C\] font-heading/g, 'text-[#001F3F] dark:text-white font-heading');
        content = content.replace(/bg-\[\#4A142C\] hover:bg-\[\#5A1A3C\] text-white/g, 'bg-[#001F3F] hover:bg-[#003366] text-white dark:bg-[#FFD700] dark:text-[#001F3F] dark:hover:bg-[#FFC107]');
        content = content.replace(/'bg-\[\#FFC107\]\/20 border-\[\#FFC107\] text-\[\#4A142C\]'/g, "'bg-[#FFC107]/20 border-[#FFC107] text-[#001F3F] dark:text-[#FFD700]'");
        content = content.replace(/'bg-\[\#4A142C\] border-\[\#4A142C\]'/g, "'bg-[#001F3F] border-[#001F3F] dark:bg-[#FFD700] dark:border-[#FFD700]'");
        content = content.replace(/text-\[\#4A142C\] font-semibold/g, 'text-[#001F3F] font-semibold');
        content = content.replace(/text-\[\#4A142C\] mb-2/g, 'text-[#001F3F] dark:text-white mb-2');
    }

    if (file.includes('BlogPage.jsx')) {
        content = content.replace(/from-\[\#4A142C\] via-\[\#5A1A3C\] to-\[\#4A142C\]/g, 'from-[#001F3F] via-[#003366] to-[#001F3F]');
        content = content.replace(/text-\[\#4A142C\] font-heading/g, 'text-[#001F3F] dark:text-white font-heading');
        content = content.replace(/text-\[\#4A142C\] mb-3/g, 'text-[#001F3F] dark:text-white mb-3');
        content = content.replace(/className="text-\[\#4A142C\] hover:text/g, 'className="text-[#001F3F] dark:text-white hover:text');
        content = content.replace(/group-hover:text-\[\#4A142C\]"/g, 'group-hover:text-[#001F3F]"');
        content = content.replace(/text-\[\#4A142C\] group-hover:text/g, 'text-[#001F3F] dark:text-white group-hover:text');
        content = content.replace(/border-\[\#4A142C\] text-\[\#4A142C\] hover:bg-\[\#4A142C\]/g, 'border-[#001F3F] text-[#001F3F] hover:bg-[#001F3F] dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:hover:text-white');
        content = content.replace(/focus-visible:ring-\[\#4A142C\]/g, 'focus-visible:ring-[#001F3F]');
        content = content.replace(/bg-\[\#4A142C\] text-white/g, 'bg-[#001F3F] dark:bg-white/[0.06] text-white');
        content = content.replace(/text-\[\#4A142C\] font-bold focus/g, 'text-[#001F3F] font-bold focus');
    }

    const simpleReplaceFiles = ['TermsOfServicePage.jsx', 'PrivacyPolicyPage.jsx', 'CookiePolicyPage.jsx', 'CookieNotice.jsx'];
    if (simpleReplaceFiles.some(f => file.includes(f))) {
        content = content.replace(/text-\[\#4A142C\]/g, 'text-[#001F3F] dark:text-white');
        content = content.replace(/text-\[\#4A142C\]/g, 'text-[#001F3F] dark:text-white');
        content = content.replace(/bg-\[\#4A142C\] hover:bg-\[\#5A1A3C\] text-white/g, 'bg-[#001F3F] hover:bg-[#003366] text-white dark:bg-[#FFD700] dark:text-[#001F3F]');
    }

    if (file.includes('DashboardPage.jsx')) {
        content = content.replace(/text-\[\#4A142C\]/g, 'text-[#001F3F] dark:text-white');
        content = content.replace(/bg-\[\#4A142C\]/g, 'bg-[#001F3F]');
        content = content.replace(/hover:bg-\[\#5A1A3C\]/g, 'hover:bg-[#003366]');
    }

    if (file.includes('ChatButton.jsx')) {
        content = content.replace(/text-\[\#4A142C\]/g, 'text-[#001F3F]');
    }

    fs.writeFileSync(file, content);
    console.log(`Successfully rewrote ${file}`);
}

[
    'src/pages/TermsOfServicePage.jsx',
    'src/pages/PrivacyPolicyPage.jsx',
    'src/pages/CookiePolicyPage.jsx',
    'src/pages/DashboardPage.jsx',
    'src/pages/BlogPage.jsx',
    'src/pages/LoginPage.jsx',
    'src/components/MultiStepDemoForm.jsx',
    'src/components/CookieNotice.jsx',
    'src/components/ChatButton.jsx'
].forEach(f => applyReplacements(path.join(__dirname, f)));
