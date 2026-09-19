const { esc, overline } = require('./ui.cjs');
const { header, footer, modals } = require('./partials.cjs');
const { hero, certifications, why, process, industrySection, aboutSection, portfolio, testimonials, faq, contact } = require('./sections.cjs');
const { detailPage } = require('./detail.cjs');
const standards = require('./standards.json');
const { awardsPage } = require('./awards.cjs');

function banner(k,t,p){return '<section class="page-banner"><div class="container"><div class="breadcrumb-line"><a href="index.html">Home</a><span>/</span>'+k+'</div>'+overline(k.toUpperCase())+'<h1>'+t+'</h1><p>'+p+'</p></div></section>';}
function render(page,c){
const titles={awards:'Awards & Recognition',index:'ISO Consultancy & Certification Support',about:'About Us',services:'ISO Certification Consultancy',industries:'Industries We Serve',contact:'Contact & Free Consultation'};
const standard = standards.find(item => item.slug === page);
if (!titles[page] && !standard) throw new Error('Unknown page: ' + page);
const title = standard ? standard.code + ' ' + standard.name + ' Consultancy' : titles[page];
const description = page==='awards' ? 'Explore awards, client appreciation and professional recognition at Tricom Consultants.' : standard ? standard.code + ' consultancy from Tricom Consultants. ' + standard.description + ' Explore our support, documentation and certification preparation.' : 'Tricom Consultants provides practical ISO consultancy, documentation, implementation and audit readiness support for businesses across India.';
let body='';
if(page==='awards')body=banner('Awards & Recognition','Recognising commitment.<br><em>Celebrating progress.</em>','A space for the awards, appreciation and professional milestones that shape the Tricom story.')+awardsPage(c)+contact(c);
if (standard) body = detailPage(standard, standards) + process() + contact(c);
if(page==='index')body=hero()+certifications()+why()+process()+industrySection()+aboutSection()+portfolio()+testimonials(c)+faq()+contact(c);
if(page==='about')body=banner('About Tricom','Good systems start with<br><em>the right people.</em>','Meet your partner for practical ISO consultancy, stronger processes and a clear path forward.')+aboutSection()+why()+process()+contact(c);
if(page==='services')body=banner('Our expertise','Your ambitions.<br><em>The right standards.</em>','Explore ISO consultancy that connects management system requirements with the way your business works.')+certifications(true)+process()+faq()+contact(c);
if(page==='industries')body=banner('Industries','Built for your industry.<br><em>Focused on your business.</em>','Practical support shaped around your operations, people and priorities.')+industrySection(true)+portfolio()+contact(c);
if(page==='contact')body=banner('Get in touch','Your next step,<br><em>made clearer.</em>','A conversation is a good place to start. Tell us about your business and where you want to go.')+contact(c)+faq();
return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#112c38"><title>'+esc(title)+' | Tricom Consultants</title><meta name="description" content="'+esc(description)+'"><link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/vendor/bootstrap/bootstrap.min.css"><link rel="stylesheet" href="assets/css/main.css"><link rel="stylesheet" href="assets/css/details.css"></head><body data-standard="'+(standard?esc(standard.code):'')+'">'+header(page)+'<main id="main">'+body+'</main>'+footer(c)+modals()+'<script src="assets/vendor/bootstrap/bootstrap.bundle.min.js" defer></script><script src="assets/js/site-config.js" defer></script><script src="assets/js/main.js" defer></script></body></html>\n';
}

module.exports = { render, standards };
