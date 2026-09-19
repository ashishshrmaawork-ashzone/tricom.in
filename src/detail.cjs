/* One detail-page template, shared by every certification. */
const { esc, icon, overline, button } = require('./ui.cjs');

function checklist(items) {
  return '<ul class="detail-checklist">' + items.map(item =>
    '<li>' + icon('check') + '<span>' + esc(item) + '</span></li>'
  ).join('') + '</ul>';
}

function detailPage(standard, standards) {
  const s = standard;
  const enquiry = 'contact.html?standard=' + encodeURIComponent(s.code);
  const questions = [
    [s.question, s.answer],
    ['What support will Tricom provide for ' + s.code + '?',
      s.scope + ' Your proposal will define the specific activities, deliverables and responsibilities for your project.'],
    ['How are the timeline and fees decided?',
      'We consider your organisation’s size, locations, existing processes and agreed scope. After an initial discussion, we prepare a practical plan and a tailored proposal. The independent certification body sets its own audit arrangements and fees.'],
    ['Who awards the certificate?',
      'Tricom provides consultancy and preparation support. An independent certification body carries out its assessment and makes the certification decision. A consultancy engagement does not guarantee certification.']
  ];
  return `
    <section class="detail-hero">
      <div class="container">
        <nav class="breadcrumb-line" aria-label="Breadcrumb">
          <a href="index.html">Home</a><span aria-hidden="true">/</span>
          <a href="services.html">ISO certifications</a><span aria-hidden="true">/</span>
          <span aria-current="page">${esc(s.code)}</span>
        </nav>
        <div class="row align-items-center g-4">
          <div class="col-lg-8">
            ${overline('ISO CERTIFICATION CONSULTANCY')}
            <h1>${esc(s.code)}<br><em>${esc(s.name)}.</em></h1>
            <p class="detail-headline">${esc(s.headline)}</p>
            <div class="d-flex flex-wrap gap-3">
              ${button('Discuss your requirements', enquiry)}
              <a class="btn btn-outline-primary" href="#overview">Explore this standard ${icon('arrow')}</a>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="standard-emblem">
              <span class="emblem-icon">${icon(s.icon)}</span>
              <strong>${esc(s.code)}</strong>
              <span>${esc(s.name)}</span>
              <div class="emblem-caption">CONSULTANCY &amp; AUDIT READINESS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section detail-section">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-8">
            <section class="detail-block" id="overview">
              ${overline('UNDERSTAND THE STANDARD')}
              <h2>What is <em>${esc(s.code)}?</em></h2>
              <p>${esc(s.overview)}</p>
              <a class="detail-source" href="${esc(s.source)}" target="_blank" rel="noopener noreferrer">Read the official ISO overview ${icon('diagonal')}<span class="visually-hidden"> (opens in a new tab)</span></a>
            </section>
            <section class="detail-block" id="benefits">
              ${overline('WHY IT MATTERS')}
              <h2>A stronger foundation<br>for <em>your organisation.</em></h2>
              <div class="detail-benefits">${s.benefits.map((benefit, i) =>
                '<article><span class="detail-number">0' + (i + 1) + '</span><h3>' + esc(benefit) + '</h3></article>'
              ).join('')}</div>
            </section>
            <section class="detail-block" id="suitability">
              <h2>Who is it <em>for?</em></h2>
              <p>We shape the implementation plan around your activities, people and business priorities. Typical organisations include:</p>
              ${checklist(s.audience)}
            </section>
            <section class="detail-block" id="support">
              ${overline('OUR ROLE IN YOUR JOURNEY')}
              <h2>Practical support.<br><em>From scope to readiness.</em></h2>
              <p>We work with your team to turn requirements into a manageable implementation plan.</p>
              <ol class="detail-support">${s.support.map(item => '<li>' + esc(item) + '</li>').join('')}</ol>
              <div class="detail-note">${icon('people')}<p>Your team owns and operates the management system. We provide the guidance, structure and preparation support agreed in your scope.</p></div>
            </section>
            <section class="detail-block" id="documents">
              <h2>Documentation that<br><em>supports real work.</em></h2>
              <p>Depending on your scope and existing system, we can help you develop or improve:</p>
              ${checklist(s.records)}
              <p class="detail-small">This is an indicative list, not a complete statement of standard requirements. Documentation is tailored to your organisation.</p>
            </section>
            <section class="detail-block mb-0" id="detail-faq">
              ${overline('YOUR QUESTIONS, ANSWERED')}
              <h2>A little more <em>clarity.</em></h2>
              <div class="accordion accordion-flush" id="detailAccordion">
                ${questions.map(([q,a],i) => `
                  <div class="accordion-item">
                    <h3 class="accordion-header"><button class="accordion-button ${i ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#detail-answer-${i}" aria-expanded="${i === 0}" aria-controls="detail-answer-${i}">${esc(q)}</button></h3>
                    <div id="detail-answer-${i}" class="accordion-collapse collapse ${i ? '' : 'show'}" data-bs-parent="#detailAccordion"><div class="accordion-body">${esc(a)}</div></div>
                  </div>`).join('')}
              </div>
            </section>
          </div>
          <aside class="col-lg-4">
            <div class="detail-sidebar">
              <nav class="detail-nav" aria-label="ISO certifications">
                <h2>Explore certifications</h2>
                ${standards.map(item => '<a href="' + item.slug + '.html" ' +
                  (item.slug === s.slug ? 'class="active" aria-current="page"' : '') + '><span>' +
                  esc(item.code) + '<small>' + esc(item.name) + '</small></span>' + icon('diagonal') + '</a>'
                ).join('')}
              </nav>
              <div class="detail-cta">
                ${icon('chat')}
                <h2>Your next step,<br><em>made simpler.</em></h2>
                <p>Tell us where you are today. We will help you plan the way forward.</p>
                ${button('Get a free consultation', enquiry)}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>`;
}
module.exports = { detailPage };
