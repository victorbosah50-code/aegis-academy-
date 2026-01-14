// =========================
// app.js
// =========================
function navigate(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}

function calculateBasic() {
  const hours = document.getElementById("basicHours").value;
  const total = hours * 20000;
  document.getElementById("basicTotal").innerText =
    hours ? `Total: ₦${total.toLocaleString()}` : "";
}

function calculatePro() {
  const hours = document.getElementById("proHours").value;
  const total = hours * 50000;
  document.getElementById("proTotal").innerText =
    hours ? `Total: ₦${total.toLocaleString()}` : "";
}

// default page
navigate("home");
