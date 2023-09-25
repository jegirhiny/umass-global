/**
 * - postive and negative test case
 * - loading correct values to the dom (inital)
*/

it("should calculate the monthly rate correctly", function () {
  expect(calculateMonthlyPayment({amount: 1, years: 1, rate: 1})).toEqual("2");
});


it("should return a result with 2 decimal places", function() {
  let payment = document.getElementById("monthly-payment");
  let fixedPayment = String(Number(payment).toFixed(2));

  expect(payment.length === fixedPayment.length).toBe(true);
});