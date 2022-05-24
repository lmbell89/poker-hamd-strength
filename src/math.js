const factorial = (n) => {
  if (!Number.isInteger(n)) throw `N must be an integer. Value provided was ${n}`
  if (n < 0) throw "Cannot calculate factorials for negative numbers"
  return n <= 1 ? 1 : n * factorial(n - 1)
}

const nCr = (n, r) => {
  if (r < 0) throw "r cannot be less than zero"
  if (r > n) throw "r cannot be greater than n"
  return parseInt(factorial(n) / (factorial(r) * factorial(n - r)))
}

export { nCr }