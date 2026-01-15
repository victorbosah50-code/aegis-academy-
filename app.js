function calculateBasic() {
  const h = document.getElementById("basicHours").value;
  document.getElementById("basicResult").innerText =
    h ? "Total: ₦" + (h * 20000).toLocaleString() : "";
}

function calculatePro() {
  const h = document.getElementById("proHours").value;
  document.getElementById("proResult").innerText =
    h ? "Total: ₦" + (h * 50000).toLocaleString() : "";
}
