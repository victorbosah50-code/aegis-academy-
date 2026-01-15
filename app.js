// app.js (Shared JS)
document.addEventListener('DOMContentLoaded', () => {
  console.log("EduOS Advanced Prototype Loaded ✓");

  // Active link highlighting
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .dropdown-content a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
      // If in dropdown, highlight parent
      const dropdown = link.closest('.dropdown');
      if (dropdown) {
        dropdown.querySelector('.dropbtn').classList.add('active');
      }
    }
  });

  // Future expansion: Mobile menu toggle
  // You can add a hamburger icon and toggle .nav-links display: flex/block

  // Placeholder for AI interactions or animations
  // e.g., const aiTutor = document.querySelector('.ai-placeholder');
  // if (aiTutor) { /* animate or fetch mock data */ }
});
