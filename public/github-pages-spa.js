// Single Page Apps for GitHub Pages
// https://github.com/rafgraph/spa-github-pages
// This script checks to see if a redirect is present in the query string param.
// If it is, it removes it and redirects again to the correct subpath (full path).
// This is required because GitHub Pages only supports 404 redirects to a single file.
// So, we redirect all 404s to 404.html, which then redirects to the correct path.
(function(){
  var redirect = sessionStorage.getItem('redirect');
  if (redirect) {
    sessionStorage.removeItem('redirect');
    window.location.replace(redirect);
  }
})();

// If the user navigates directly to a subpath, GitHub Pages will return a 404.
// We can use this to redirect to the root and then use the SPA routing.
// This script is for the 404.html page.
var path = window.location.pathname;
var redirect = path.replace('/stayplay-app', ''); // Remove base path
sessionStorage.setItem('redirect', '/stayplay-app' + redirect);
window.location.replace('/stayplay-app');
