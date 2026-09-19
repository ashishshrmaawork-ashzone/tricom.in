/* Progressive interactions. No enquiry data is stored or sent in demo mode. */
(() => {
  'use strict';
  const config = window.TRICOM;
  const params = new URLSearchParams(window.location.search);
  const select = document.querySelector('#standard');
  const chosen = params.get('standard') || document.body.dataset.standard;
  if (chosen && select && [...select.options].some(option => option.value === chosen)) select.value = chosen;
  const industry = params.get('industry');
  if (industry && document.querySelector('#message')) document.querySelector('#message').value = 'I would like ISO consultancy for the ' + industry.slice(0, 100) + ' industry.';
  document.querySelector('#year').textContent = new Date().getFullYear();

  function showStandard(index) {
    const standard = config.standards[index];
    if (!standard) return;
    document.querySelector('#standard-title').textContent = standard.code;
    document.querySelector('#standard-name').textContent = standard.name;
    document.querySelector('#standard-details').href = standard.slug + '.html';
    document.querySelector('#standard-description').textContent = standard.description;
    document.querySelector('#standard-scope').textContent = standard.scope;
    document.querySelector('#standard-enquire').href = 'contact.html?standard=' + encodeURIComponent(standard.code);
  }
  document.querySelector('#standardModal').addEventListener('show.bs.modal', event => {
    if (event.relatedTarget) showStandard(Number(event.relatedTarget.dataset.standard));
  });
  const standardIndex = config.standards.findIndex(item => item.code === chosen);
  if (standardIndex !== -1 && location.pathname.endsWith('services.html')) {
    showStandard(standardIndex);
    bootstrap.Modal.getOrCreateInstance(document.querySelector('#standardModal')).show();
  }

  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelectorAll('.standard-column').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  }));

  const form = document.querySelector('#enquiry-form');
  let enquiryText = '';
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    enquiryText = [
      'ISO consultancy enquiry — Tricom Consultants', '',
      'Name: ' + data.name.trim(), 'Company: ' + (data.company.trim() || 'Not specified'),
      'Email: ' + data.email.trim(), 'Phone: ' + data.phone.trim(),
      'Standard: ' + (data.standard || 'Please help me choose'),
      '', 'Requirement:', data.message.trim() || 'I would like a free initial consultation.'
    ].join('\n');
    document.querySelector('#enquiry-preview').textContent = enquiryText;
    document.querySelector('#enquiry-status').textContent = config.demo
      ? 'Demo preview: your enquiry has not been sent. You can download a copy below. Live contact details will be added before launch.'
      : 'Review your enquiry, then open your email app to send it. This website has not sent your enquiry automatically.';
    const send = document.querySelector('#send-enquiry');
    send.hidden = config.demo || !config.email;
    if (!send.hidden) send.href = 'mailto:' + encodeURIComponent(config.email) + '?subject=' + encodeURIComponent('ISO consultancy enquiry') + '&body=' + encodeURIComponent(enquiryText);
    bootstrap.Modal.getOrCreateInstance(document.querySelector('#enquiryModal')).show();
  });
  document.querySelector('#download-enquiry').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([enquiryText], {type: 'text/plain;charset=utf-8'}));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'tricom-consultation-enquiry.txt';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  document.querySelectorAll('[data-whatsapp]').forEach(button => button.addEventListener('click', () => {
    const number = String(config.whatsapp || '').replace(/\D/g, '');
    if (!config.demo && /^\d{8,15}$/.test(number)) {
      window.open('https://wa.me/' + number + '?text=' + encodeURIComponent('Hello Tricom Consultants, I would like to discuss ISO consultancy.'), '_blank', 'noopener,noreferrer');
    } else {
      bootstrap.Modal.getOrCreateInstance(document.querySelector('#whatsappModal')).show();
    }
  }));
  const back = document.querySelector('.back-top');
  const updateBack = () => { back.hidden = window.scrollY < 650; };
  window.addEventListener('scroll', updateBack, {passive: true});
  updateBack();
  back.addEventListener('click', () => window.scrollTo({top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}));
})();
