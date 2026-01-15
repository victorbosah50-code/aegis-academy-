document.addEventListener("DOMContentLoaded", () => {
  fetch("nav.html")
    .then(res => res.text())
    .then(html => {
      const nav = document.getElementById("nav-placeholder");
      if (nav) nav.innerHTML = html;
    });
});
