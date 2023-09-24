/**
 * - postive and negative test case
 * - loading correct values to the dom (inital)
*/

it("should calculate the monthly rate correctly", function () {
  
});


it("should return a result with 2 decimal places", function() {
  setupIntialValues();
  update();
  debugger;
  let payment = document.getElementById("monthly-payment");
  let fixedPayment = String(Number(payment).toFixed(2));

  expect(payment.length === fixedPayment.length).toBe(true);
});