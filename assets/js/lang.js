// Send English-speaking browsers to the English site, everyone else to German.
(function () {
  var l = (navigator.languages && navigator.languages[0]) || navigator.language || 'de';
  location.replace(/^en\b/i.test(l) ? 'en/index.html' : 'de/index.html');
})();
