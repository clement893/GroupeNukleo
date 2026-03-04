// Load Google Fonts asynchronously without inline event handlers
// This avoids CSP violations while still loading fonts non-blocking
(function() {
  const link = document.getElementById('google-fonts-stylesheet');
  if (link && link.media === 'print') {
    link.media = 'all';
  }
})();

