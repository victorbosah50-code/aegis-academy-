// app.js – Simple Enhancements for Interactivity
document.addEventListener('DOMContentLoaded', () => {
  console.log('EduOS: Harvard-Digital Excellence Loaded');

  // Active link highlighting
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .dropdown-content a').forEach(link => {
    if (link.href.endsWith(currentPage)) {
      link.classList.add('active');
    }
  });

  // Subtle scroll animation for sections
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(section);
  });
});
