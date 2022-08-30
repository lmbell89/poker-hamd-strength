import SUITS from "../constants/suits.js"
import HANDS from "../constants/hands.js"
import Hand from "../hand.js"
import HandCalculator from "./hand-calculator.js"

export default class RoyalFlush extends HandCalculator {
  constructor(cardsDrawn) {
    super(HANDS.ROYAL_FLUSH, cardsDrawn)
  }

  calculate() {
    const hand = new Hand(HANDS.ROYAL_FLUSH, [14, 13, 12, 11, 10])
    this.hands.push(hand)
    Object.values(SUITS).forEach(suit => {
      const drawn = this.cardsDrawn.filter(c => c.value >= 10 && c.suit == suit)
      const needed = 5 - drawn.length
      hand.count += this.nCr(this.cardsInDeck - needed, this.toDraw - needed)
    })
  }
}