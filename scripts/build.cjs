const fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'src/site.json'), 'utf8').replace(/^\uFEFF/, ''));
const { render, standards } = require('../src/render.cjs');
const pages = ['index', 'about', 'services', 'industries', 'contact', 'awards', ...standards.map(item => item.slug)];
for (const page of pages) fs.writeFileSync(path.join(root, page + '.html'), render(page, config));
const publicStandards = standards.map(({code,name,icon,category,description,scope,slug}) => ({code,name,icon,category,description,scope,slug}));
fs.writeFileSync(path.join(root, 'assets/js/site-config.js'), 'window.TRICOM = ' + JSON.stringify({ ...config, standards:publicStandards }) + ';\n');
console.log('Built ' + pages.length + ' pages and browser configuration.');
