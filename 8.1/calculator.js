window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");

  if(form) {
    setupIntialValues();

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: + (document.getElementById("loan-amount").value),
    years: + (document.getElementById("loan-years").value),
    rate: + (document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById("loan-amount").value = 0;
  document.getElementById("loan-years").value = 0;
  document.getElementById("loan-rate").value = 0;

  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let result = calculateMonthlyPayment(getCurrentUIValues());

  if(isNaN(result)) {
    updateMonthly(0);
  } else {
    updateMonthly(result);
  }
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let P = values.amount, i = values.rate / 12, n = values.years * 12;

  return String(Number((P * i) / (1 - Math.pow(1 + i, -1 * n))).toFixed(2));
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById('monthly-payment').innerHTML = `$${monthly}`;
}
