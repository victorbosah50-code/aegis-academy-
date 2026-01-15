<!-- app.js -->
// Currently only for future interactivity
// You can add smooth scroll, mobile menu, etc. later

document.addEventListener('DOMContentLoaded', () => {
  console.log("EduOS prototype loaded ✓");
  
  // Optional: Highlight current page in nav
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
});
