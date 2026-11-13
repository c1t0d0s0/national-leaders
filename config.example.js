// Template configuration file
// Copy this to public/config.js (or config.js) and set your GTM/GA4 ID.
// The ID is read at build time (vite.config.ts):
//   'GTM-...' -> Google Tag Manager tag, 'G-...' -> Google tag (gtag.js / GA4)
const GTM_ID = 'GTM-XXXXXXX'; // or 'G-XXXXXXXXXX'
if (typeof window !== 'undefined') {
  window.GTM_ID = GTM_ID;
}
