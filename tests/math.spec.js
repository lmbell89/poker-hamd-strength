import { ncr } from "../src/math.js"

describe("The ncr function", function() {
  it("correctly evaluates 4 choose 1", function() {
    expect(ncr(4,1)).toBe(4);
  });

  it("correctly evaluates 4 choose 2", function() {
    expect(ncr(4,2)).toBe(6);
  });

  it("correctly evaluates 4 choose 3", function() {
    expect(ncr(4,3)).toBe(4);
  });

  it("correctly evaluates 4 choose 4", function() {
    expect(ncr(4,4)).toBe(1);
  });

  it("correctly evaluates 52 choose 2", function() {
    expect(ncr(52,2)).toBe(1326);
  });

  it("can handle choosing zero", function() {
    expect(ncr(1, 0)).toBe(1);
  });

  it("can handle choosing zero from zero", function() {
    expect(ncr(0, 0)).toBe(1);
  });

  it("throws an error when r is less than 0", function() {
    expect(() => ncr(5, -1)).toThrow("r cannot be less than zero")
  });

  it("throws an error when r is greater than n", function() {
    expect(() => ncr(5, 6)).toThrow("r cannot be greater than n")
  });
});