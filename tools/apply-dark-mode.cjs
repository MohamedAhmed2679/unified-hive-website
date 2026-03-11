const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx') && f !== 'HomePage.jsx');

/* Patterns to apply across all remaining pages */
const replacements = [
    /* ── Hero gradient backgrounds ── */
    [/bg-gradient-to-br from-\[#001F3F\] via-\[#003366\] to-\[#001F3F\](?! dark:)/g,
        'bg-gradient-to-br from-[#050A14] via-[#0A1228] to-[#050A14]'],
    [/dark:from-\[#0B1426\] dark:via-\[#0F1D32\] dark:to-\[#0B1426\]/g, ''],

    /* ── Section backgrounds ── */
    [/bg-white\/80 dark:bg-\[#0B1426\]\/80 backdrop-blur-sm/g, 'section-dark'],
    [/bg-gray-50\/80 dark:bg-\[#0F1D32\]\/80 backdrop-blur-sm/g, 'section-elevated'],
    [/bg-white\/80 dark:bg-\[#0B1426\]\/80/g, 'section-dark'],
    [/className="bg-white py/g, 'className="section-dark py'],
    [/className="bg-gray-50 py/g, 'className="section-elevated py'],
    [/className="bg-white dark:bg-white\/5/g, 'className="glass-card'],
    [/bg-\[#001F3F\] dark:bg-\[#060D1A\]\/90/g, 'bg-[#050A14]'],
    [/bg-gray-50 dark:bg-white\/5/g, 'bg-white/[0.03] dark:bg-white/[0.03]'],

    /* ── Text color upgrades ── */
    [/text-\[#001F3F\] dark:text-white/g, 'text-foreground'],
    [/text-\[#001F3F\] dark:text-gray-200/g, 'text-foreground'],
    [/text-gray-700 dark:text-gray-300/g, 'text-muted-foreground'],
    [/text-gray-600 dark:text-gray-400/g, 'text-muted-foreground'],
    [/text-gray-600 dark:text-gray-300/g, 'text-muted-foreground'],
    [/text-gray-500 dark:text-gray-400/g, 'text-muted-foreground'],
    [/text-gray-600 max-w/g, 'text-muted-foreground max-w'],
    [/text-gray-600 font-poppins/g, 'text-muted-foreground'],
    [/text-gray-700 font-poppins/g, 'text-muted-foreground'],
    [/text-gray-500 font-poppins/g, 'text-muted-foreground'],
    [/text-\[#001F3F\] font-montserrat/g, 'text-foreground font-heading'],
    [/text-\[#001F3F\] mb/g, 'text-foreground mb'],

    /* ── Font family upgrades ── */
    [/font-montserrat/g, 'font-heading'],
    [/font-poppins/g, ''],

    /* ── Card upgrades ── */
    [/glass-card p-(\d) theme-transition/g, 'glass-card p-$1'],
    [/glass-card p-(\d) hover:shadow-xl transition-all duration-200 hover:-translate-y-1 theme-transition/g, 'glass-card p-$1'],
    [/glass-card p-(\d) text-center hover:shadow-lg transition-all duration-200 theme-transition/g, 'glass-card p-$1 text-center'],
    [/glass-card shadow-xl p-8 theme-transition/g, 'glass-card p-8'],
    [/bg-white rounded-lg p-(\d) shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1/g, 'glass-card p-$1'],
    [/bg-white rounded-lg p-(\d) shadow-md text-center hover:shadow-lg transition-all duration-200/g, 'glass-card p-$1 text-center'],
    [/bg-white rounded-lg shadow-xl p-8 border border-gray-200/g, 'glass-card p-8'],

    /* ── Input upgrades ── */
    [/border border-gray-300 dark:border-white\/20 rounded-lg focus:outline-none focus:border-\[#FFD700\] transition-colors duration-200 font-poppins bg-white dark:bg-white\/10 dark:text-white/g,
        'bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-lg focus:outline-none focus:border-[#06B6D4]/50 focus:ring-1 focus:ring-[#06B6D4]/20 transition-all duration-300 text-foreground'],
    [/border border-gray-300 dark:border-white\/20 rounded-lg/g,
        'bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-lg'],
    [/border border-gray-300 rounded-lg/g,
        'bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-lg'],

    /* ── Specific brand spans ── */
    [/dark:text-\[#FFD700\]/g, 'text-[#06B6D4]'],
    [/text-\[#001F3F\]/g, 'text-foreground'],

    /* ── Button upgrades ── */
    [/border-2 border-\[#001F3F\] dark:border-white text-\[#001F3F\] dark:text-white hover:bg-\[#001F3F\] dark:hover:bg-white hover:text-white dark:hover:text-\[#001F3F\]/g,
        'border border-white/[0.1] text-foreground hover:bg-white/[0.04]'],

    /* ── Tool pills ── */
    [/bg-\[#001F3F\] dark:bg-white\/10 text-white/g, 'bg-white/[0.06] text-foreground border border-white/[0.08]'],

    /* ── Theme transition cleanup ── */
    [/ theme-transition/g, ''],
];

let updated = 0;
pages.forEach(page => {
    const filePath = path.join(pagesDir, page);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    replacements.forEach(([pattern, replacement]) => {
        content = content.replace(pattern, replacement);
    });

    /* Clean up double spaces from removed font classes */
    content = content.replace(/  +/g, ' ');
    content = content.replace(/ "/g, '"');
    content = content.replace(/" /g, '"');

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
    content = content.replace(/  +/g, ' ');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ components/${comp}`);
        updated++;
    }
});

console.log(`\nDone. Updated ${updated} files.`);
