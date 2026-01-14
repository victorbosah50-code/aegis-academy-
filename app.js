function toggleAITutor() {
  const modal = document.getElementById("aiModal");
  modal.style.display = modal.style.display === "block" ? "none" : "block";
}

// Payment
function payBasic() {
  const subjects = document.getElementById("basicSubjects").value;
  const hours = document.getElementById("basicHours").value;
  if (!subjects || !hours) return alert("Enter subjects & hours");

  const amount = subjects * hours * 20000 * 100;
  payWithPaystack(amount);
}

function payPro() {
  const hours = document.getElementById("proHours").value;
  if (!hours) return alert("Enter hours");
  const amount = hours * 50000 * 100;
  payWithPaystack(amount);
}

function payWithPaystack(amount) {
  let handler = PaystackPop.setup({
    key: "pk_test_xxxxxxxxxxxxx",
    email: "parent@aegisacademy.com",
    amount: amount,
    currency: "NGN",
    callback: function(response) {
      alert("Payment Successful: " + response.reference);
    },
    onClose: function() {
      alert("Payment Cancelled");
    },
  });
  handler.openIframe();
}
