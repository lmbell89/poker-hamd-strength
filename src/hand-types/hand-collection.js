export default class HandCollection {
  constructor(hands=[]) {
    this.hands = hands
  }

  get count() {
    return this.hands.map(h => h.count).reduce((a, b) => a + b)
  }

  get possibleHands() {
    return this.hands.filter(h => h.count > 0)
  }

  filter(values) {
    function filterHandByValues(hand) {
      for (let i = 0; i < values.length; i++) {
        if (hand.cardValues[i] !== values[i]) {
          return false
        }
      }
      return true
    }

    const filteredHands = this.hands.filter(filterHandByValues)
    return new HandCollection(filteredHands)
  }
}