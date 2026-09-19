const esc = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths = {
arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',diagonal:'<path d="M6 18 18 6M6 6h12v12"/>',check:'<path d="m5 12 4 4L19 6"/>',
shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
leaf:'<path d="M20 3C7 2 2 8 5 15s16 5 15-12Z"/><path d="M3 21 16 8"/>',
people:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 4c3 0 3 3 3 6"/>',
lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2"/>',
food:'<path d="M7 2v8m-3-8v5a3 3 0 0 0 6 0V2M7 10v12M19 2c-6 4-6 11 0 11V2Zm0 11v9"/>',
energy:'<path d="m14 2-10 12h7l-1 8 10-12h-7z"/>',
document:'<path d="M14 3H5v18h14V8zm0 0v5h5M8 12h8m-8 4h6"/>',
chat:'<path d="M21 11a9 9 0 0 1-13 8l-5 2 1-5A9 9 0 1 1 21 11Z"/><path d="M8 10h8m-8 4h5"/>',
search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
factory:'<path d="M3 21V10l6 3V8l6 3V3h4l2 18ZM6 17h1m4 0h1m4 0h1"/>',
laptop:'<rect x="4" y="4" width="16" height="12" rx="1"/><path d="m4 16-2 4h20l-2-4M10 20h4"/>',
health:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
building:'<path d="M4 21V7l8-4 8 4v14M2 21h20M8 8v2m8-2v2M8 13v2m8-2v2m-6 6v-4h4v4"/>',
truck:'<path d="M2 5h12v12H2zM14 9h4l4 5v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
phone:'<path d="m7 3 3 5-3 3a15 15 0 0 0 6 6l3-3 5 3-1 4C10 22 2 14 3 4z"/>',
pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
star:'<path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>'};
const icon = n => '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[n]||paths.shield)+'</svg>';
const overline=t=>'<div class="eyebrow"><span></span>'+t+'</div>';
const button=(t,h,s='primary')=>'<a class="btn btn-'+s+'" href="'+h+'">'+t+icon('arrow')+'</a>';
const brand=()=>'<a class="brand" href="index.html" aria-label="Tricom Consultants home"><img src="assets/images/favicon.svg" width="43" height="43" alt=""><span>tricom<span class="brand-sub">CONSULTANTS</span></span></a>';

module.exports = { esc, icon, overline, button, brand };
