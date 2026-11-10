/* Reset Wellness: cookie consent and Google Analytics.
   Google Analytics is only loaded after the visitor clicks "Accept" (§ 25 TDDDG, GDPR).
   The choice is stored in localStorage; "Cookie settings" in the footer reopens the banner. */
(function () {
  var GA_ID = 'G-R0SYE5QPHX';
  var KEY = 'rw-consent';
  var de = (document.documentElement.lang || '').toLowerCase().indexOf('de') === 0;
  var T = de ? {
    label: 'Cookie Einstellungen',
    text: 'Wir würden gerne Google Analytics nutzen, um zu verstehen, wie unsere Website genutzt wird. Dabei werden Cookies gesetzt und Daten an Google übermittelt. Du kannst deine Wahl jederzeit unter „Cookies verwalten“ im Footer ändern.',
    more: 'Mehr in der Datenschutzerklärung', href: 'datenschutz.html#s7',
    accept: 'Akzeptieren', decline: 'Ablehnen'
  } : {
    label: 'Cookie settings',
    text: 'We would like to use Google Analytics to understand how visitors use our website. This sets cookies and sends data to Google. You can change your choice at any time under “Cookie settings” in the footer.',
    more: 'More in our privacy policy', href: 'privacy.html#s7',
    accept: 'Accept', decline: 'Decline'
  };

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadAnalytics() {
    if (window.__rwGa) return;
    window.__rwGa = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function removeAnalyticsCookies() {
    var host = location.hostname, parts = host.split('.');
    var domains = ['', host, '.' + host];
    if (parts.length > 2) domains.push('.' + parts.slice(-2).join('.'));
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name.indexOf('_ga') !== 0) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  var banner = null;
  function closeBanner() { if (banner) { banner.remove(); banner = null; } }

  function choose(v) {
    var before = read();
    save(v);
    closeBanner();
    if (v === 'granted') { loadAnalytics(); return; }
    window['ga-disable-' + GA_ID] = true;
    removeAnalyticsCookies();
    if (before === 'granted' || window.__rwGa) location.reload();
  }

  function showBanner() {
    if (banner) return;
    banner = document.createElement('div');
    banner.className = 'rw-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', T.label);
    var p = document.createElement('p');
    p.textContent = T.text + ' ';
    var a = document.createElement('a');
    a.href = T.href; a.textContent = T.more + '.';
    p.appendChild(a);
    var row = document.createElement('div');
    row.className = 'rw-consent-buttons';
    [['decline', 'denied'], ['accept', 'granted']].forEach(function (b) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'rw-consent-btn rw-consent-' + b[0];
      btn.textContent = T[b[0]];
      btn.addEventListener('click', function () { choose(b[1]); });
      row.appendChild(btn);
    });
    banner.appendChild(p);
    banner.appendChild(row);
    document.body.appendChild(banner);
  }

  function init() {
    var v = read();
    if (v === 'granted') loadAnalytics();
    else if (v !== 'denied') showBanner();
    document.querySelectorAll('[data-cookie-settings]').forEach(function (b) {
      b.addEventListener('click', showBanner);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
