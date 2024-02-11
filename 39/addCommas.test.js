const addCommas = require("./addCommas");

describe("#addCommas", () => {
  test("is function", () => {
    expect(typeof addCommas).toBe("function");
  });

  test("negative number", () => {
    expect(addCommas(-10)).toBe('-10');
  });

  test("positive number", () => {
    expect(addCommas(10)).toBe('10');
  });

  test("with comma", () => {
    expect(addCommas(10000)).toBe('10,000');
  });
});
