function payBasic() {
  let hours = document.getElementById("basicHours").value;
  let amount = hours * 20000 * 100;

  payWithPaystack(amount);
}

function payPro() {
  let hours = document.getElementById("proHours").value;
  let amount = hours * 50000 * 100;

  payWithPaystack(amount);
}

function payWithPaystack(amount) {
  let handler = PaystackPop.setup({
    key: "pk_test_xxxxxxxxxxxxx",
    email: "parent@aegisacademy.com",
    amount: amount,
    currency: "NGN",
    callback: function(response) {
      alert("Payment successful: " + response.reference);
    },
    onClose: function() {
      alert("Transaction cancelled");
    }
  });

  handler.openIframe();
}
