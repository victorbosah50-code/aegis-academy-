function calculateBasic() {
  const hours = document.getElementById("basicHours").value;
  document.getElementById("basicResult").innerText =
    hours ? "Total: ₦" + (hours * 20000).toLocaleString() : "";
}

function calculatePro() {
  const hours = document.getElementById("proHours").value;
  document.getElementById("proResult").innerText =
    hours ? "Total: ₦" + (hours * 50000).toLocaleString() : "";
}
