it("should calculate the monthly rate correctly", function () {
  expect(calculateMonthlyPayment({ amount: 1, years: 1, rate: 1 })).toEqual("0.13");
});


it("should return a result with 2 decimal places", function() {
  let payment = calculateMonthlyPayment({amount : 5, years : 5, rate : 5});
  let fixedPayment = String(Number(payment).toFixed(2));

  expect(payment.length === fixedPayment.length).toBe(true);
});