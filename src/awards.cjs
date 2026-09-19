const { esc, icon, overline, button } = require('./ui.cjs');

/* Approved awards can be supplied through site.json; demo entries stay labelled. */
function awardsPage(config) {
  const samples = [
    { title: 'Excellence in consultancy', category: 'Industry award', issuer: 'Awarding organisation', year: 'Year to be added', icon: 'star', description: 'A space to showcase an approved award recognising consultancy, service or business excellence.' },
    { title: 'Client appreciation', category: 'Client recognition', issuer: 'Client organisation', year: 'Year to be added', icon: 'people', description: 'A space for an approved appreciation letter or recognition of a successful working relationship.' },
    { title: 'Professional recognition', category: 'Professional milestone', issuer: 'Recognising organisation', year: 'Year to be added', icon: 'shield', description: 'A space to present verified professional recognition, with the issuing organisation and supporting details.' }
  ];
  const entries = config.demo ? samples : (config.awards || []);
  return `
    <section class="section awards-intro">
      <div class="container">
        <div class="row g-5 align-items-center">
          <div class="col-lg-5">
            <div class="recognition-art" aria-hidden="true">
              <div class="recognition-ring"></div>
              <div class="recognition-medal">${icon('star')}</div>
              <span class="recognition-art-label">COMMITMENT. QUALITY. PROGRESS.</span>
              <span class="recognition-art-caption">The Tricom approach</span>
            </div>
          </div>
          <div class="col-lg-7">
            ${overline('THE MILESTONES THAT MATTER')}
            <h2>Good work starts with<br><em>a lasting commitment.</em></h2>
            <p>Awards and appreciation tell part of a business’s story. This is where we share the milestones that reflect our work, our relationships and our commitment to practical consultancy.</p>
            <p>Behind every milestone is the same focus: understanding your business, supporting your people and helping you build better systems.</p>
            ${button('Explore our approach', 'about.html', 'outline-primary')}
          </div>
        </div>
      </div>
    </section>
    <section class="section section-soft" id="recognitions">
      <div class="container">
        <div class="section-heading row g-4 align-items-end">
          <div class="col-lg-7">${overline('OUR RECOGNITION PORTFOLIO')}<h2>Moments worth <em>sharing.</em></h2></div>
          <div class="col-lg-5 heading-aside"><p>${config.demo ? 'Layout preview: the entries below are samples. Actual award names, organisations and dates will be added after verification.' : 'Explore our awards, appreciation and professional milestones.'}</p></div>
        </div>
        <div class="row g-4">
          ${entries.length ? entries.map((award,i) => `
            <div class="col-md-6 col-xl-4">
              <article class="award-card">
                <div class="award-art award-tone-${i % 3}">
                  ${config.demo ? '<span class="demo-tag">SAMPLE CONTENT</span>' : ''}
                  <div class="award-icon">${icon(award.icon || 'star')}</div>
                  <span class="award-category">${esc(award.category)}</span>
                </div>
                <div class="award-content">
                  <span class="award-year">${esc(award.year)}</span>
                  <h3>${esc(award.title)}</h3>
                  <p>${esc(award.description)}</p>
                  <div class="award-issuer">${icon('building')}<span><small>${config.demo ? 'PLACEHOLDER ORGANISATION' : 'RECOGNISED BY'}</small>${esc(award.issuer)}</span></div>
                </div>
              </article>
            </div>`).join('') : '<div class="col-12"><div class="recognition-empty"><h3>Our recognition portfolio is being updated.</h3><p>Verified awards and appreciation will be shared here as they become available.</p></div></div>'}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-heading text-center">${overline('BEHIND EVERY MILESTONE')}<h2>The values that guide <em>our work.</em></h2></div>
        <div class="row g-4">
          ${[['document','Clarity in our advice','Practical explanations and a shared understanding of the next steps.'],['people','Care in our partnerships','A collaborative approach that respects your people, operations and goals.'],['shield','Consistency in our approach','A focus on useful systems, clear responsibilities and continual improvement.']].map(([symbol,title,text]) => `
            <div class="col-md-4"><article class="recognition-value"><span class="icon-box">${icon(symbol)}</span><h3>${title}</h3><p>${text}</p></article></div>`).join('')}
        </div>
      </div>
    </section>`;
}
module.exports = { awardsPage };
