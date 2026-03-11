const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx') && f !== 'HomePage.jsx');

/* Second-pass patterns - handle remaining bare bg-white, bg-gray-50, and other light mode issues */
const replacements = [
    /* ── Remaining bare backgrounds ── */
    [/className="bg-white py/g, 'className="bg-white dark:bg-[#0A1228] py'],
    [/className="bg-gray-50 py/g, 'className="bg-gray-50 dark:bg-[#050A14] py'],
    [/className="bg-white rounded/g, 'className="bg-white dark:bg-[#0A1228] rounded'],
    [/className="bg-white p-/g, 'className="bg-white dark:bg-[#0A1228] p-'],
    [/className="bg-white shadow/g, 'className="bg-white dark:bg-[#0A1228] shadow'],
    [/className="bg-white border/g, 'className="bg-white dark:bg-[#0A1228] border'],
    [/ bg-white /g, ' bg-white dark:bg-[#0A1228] '],
    [/ bg-gray-50 /g, ' bg-gray-50 dark:bg-[#050A14] '],
    [/bg-white"/g, 'bg-white dark:bg-[#0A1228]"'],
    [/bg-gray-50"/g, 'bg-gray-50 dark:bg-[#050A14]"'],

    /* ── Text colors for dark mode ── */
    [/text-gray-900(?! dark:)/g, 'text-gray-900 dark:text-gray-100'],
    [/text-gray-800(?! dark:)/g, 'text-gray-800 dark:text-gray-100'],
    [/text-gray-700(?! dark:)/g, 'text-gray-700 dark:text-gray-300'],
    [/text-gray-600(?! dark:)/g, 'text-gray-600 dark:text-gray-400'],
    [/text-gray-500(?! dark:)/g, 'text-gray-500 dark:text-gray-400'],

    /* ── Border colors ── */
    [/border-gray-200(?! dark:)/g, 'border-gray-200 dark:border-white/[0.06]'],
    [/border-gray-300(?! dark:)/g, 'border-gray-300 dark:border-white/[0.08]'],

    /* ── Divide colors ── */
    [/divide-gray-200(?! dark:)/g, 'divide-gray-200 dark:divide-white/[0.06]'],

    /* ── Shadow adjustments ── */
    [/shadow-lg(?! dark:| hover:)/g, 'shadow-lg dark:shadow-black/20'],
    [/shadow-xl(?! dark:| hover:)/g, 'shadow-xl dark:shadow-black/30'],

    /* ── Fix double dark: patterns from multiple passes ── */
    [/dark:bg-\[#0A1228\] dark:bg-\[#0A1228\]/g, 'dark:bg-[#0A1228]'],
    [/dark:bg-\[#050A14\] dark:bg-\[#050A14\]/g, 'dark:bg-[#050A14]'],
    [/dark:text-gray-100 dark:text-gray-100/g, 'dark:text-gray-100'],
    [/dark:text-gray-300 dark:text-gray-300/g, 'dark:text-gray-300'],
    [/dark:text-gray-400 dark:text-gray-400/g, 'dark:text-gray-400'],
];

let updated = 0;
pages.forEach(page => {
    const filePath = path.join(pagesDir, page);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    replacements.forEach(([pattern, replacement]) => {
        content = content.replace(pattern, replacement);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ ${page}`);
        updated++;
    } else {
        console.log(`· ${page} (no changes)`);
    }
});

/* Also update components */
const componentsDir = path.join(__dirname, '..', 'src', 'components');
const componentFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx') &&
    !['Navigation.jsx', 'MeshBackground.jsx', 'Footer.jsx'].includes(f));

componentFiles.forEach(comp => {
    const filePath = path.join(componentsDir, comp);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    replacements.forEach(([pattern, replacement]) => {
        content = content.replace(pattern, replacement);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ components/${comp}`);
        updated++;
    }
});

console.log(`\nDone. Updated ${updated} files in second pass.`);
