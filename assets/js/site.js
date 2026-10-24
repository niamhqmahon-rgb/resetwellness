/* Reset Wellness — site behaviour (no dependencies). */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header: background on scroll + reading progress ---------- */
  var header = document.querySelector('[data-nav]');
  var progress = document.querySelector('[data-nav-progress]');
  var TOP = 'background: rgba(54,32,23,0.55); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 1px 0 rgba(247,237,224,0.08);';
  var SCROLLED = 'background: rgba(54,32,23,0.84); backdrop-filter: blur(18px) saturate(140%); -webkit-backdrop-filter: blur(18px) saturate(140%); box-shadow: 0 1px 0 rgba(247,237,224,0.08), 0 10px 30px rgba(0,0,0,0.25);';
  var baseHeaderStyle = header ? header.getAttribute('style').replace(TOP, '') : '';
  var wasScrolled = null;

  /* ---------- back-to-top button ---------- */
  var toTop = document.createElement('button');
  toTop.type = 'button';
  toTop.className = 'to-top';
  toTop.hidden = true;
  toTop.setAttribute('aria-label', root.lang === 'de' ? 'Nach oben' : 'Back to top');
  toTop.innerHTML = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"></path></svg>';
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });
  document.body.appendChild(toTop);

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY || root.scrollTop || 0;
      var max = Math.max(1, root.scrollHeight - window.innerHeight);
      if (progress) progress.style.width = Math.min(100, (y / max) * 100) + '%';
      var scrolled = y > 24;
      if (header && scrolled !== wasScrolled) {
        header.setAttribute('style', baseHeaderStyle + (scrolled ? SCROLLED : TOP));
        wasScrolled = scrolled;
      }
      toTop.hidden = y < 700;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var menu = document.querySelector('[data-if="open"]');
  var burger = document.querySelector('.nav-burger');
  function setMenu(open) {
    if (!menu) return;
    menu.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) { var first = menu.querySelector('a, button'); if (first) first.focus(); }
    else if (burger) burger.focus();
  }
  document.querySelectorAll('[data-nav-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () { setMenu(menu && menu.hidden); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && !menu.hidden) setMenu(false);
  });

  /* ---------- reveal on scroll ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    root.classList.add('js-reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
  }

  /* ---------- map: Google Maps loads only after the visitor clicks (GDPR) ---------- */
  document.querySelectorAll('[data-map]').forEach(function (box) {
    var btn = box.querySelector('[data-map-load]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = box.getAttribute('data-map-src');
      frame.title = box.getAttribute('data-map-title');
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
      box.innerHTML = '';
      box.appendChild(frame);
      frame.focus();
    });
  });

  /* ---------- contact form ----------
     TODO: connect to a real form service or your booking system.
     Right now the form only shows the thank-you message and sends nothing. */
  var form = document.querySelector('[data-contact-form]');
  var sent = document.querySelector('[data-if="sent"]');
  var notSent = document.querySelector('[data-if="notSent"]');
  if (form && sent && notSent) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      notSent.hidden = true;
      sent.hidden = false;
      form.reset();
    });
    var again = document.querySelector('[data-contact-reset]');
    if (again) again.addEventListener('click', function () { sent.hidden = true; notSent.hidden = false; });
  }
})();
