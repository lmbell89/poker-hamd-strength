const factorial = (n) => {
  if (n < 0) throw "Cannot calculate factorials of negative numbers"
  return n <= 1 ? 1 : n * factorial(n - 1)
}

const ncr = (n, r) => {
  if (r < 0) throw "r cannot be less than zero"
  if (r > n) throw "r cannot be greater than n"
  return factorial(n) / (factorial(r) * factorial(n - r))
}

export { ncr }