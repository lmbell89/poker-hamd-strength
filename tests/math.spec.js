/* eslint-disable no-undef */
import { nCr } from "../src/math.js"

describe("The nCr function", function() {
  it("correctly evaluates 4 choose 1", function() {
    expect(nCr(4,1)).toBe(4);
  });

  it("correctly evaluates 4 choose 2", function() {
    expect(nCr(4,2)).toBe(6);
  });

  it("correctly evaluates 4 choose 3", function() {
    expect(nCr(4,3)).toBe(4);
  });

  it("correctly evaluates 4 choose 4", function() {
    expect(nCr(4,4)).toBe(1);
  });

  it("correctly evaluates 52 choose 2", function() {
    expect(nCr(52,2)).toBe(1326);
  });

  it("can handle choosing zero", function() {
    expect(nCr(1, 0)).toBe(1);
  });

  it("can handle choosing zero from zero", function() {
    expect(nCr(0, 0)).toBe(1);
  });

  it("throws an error when r is less than 0", function() {
    expect(() => nCr(5, -1)).toThrow("r cannot be less than zero")
  });

  it("throws an error when r is greater than n", function() {
    expect(() => nCr(5, 6)).toThrow("r cannot be greater than n")
  });
});