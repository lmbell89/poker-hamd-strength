import SUITS from "./constants/suits.js"
import Hand from "./hand.js"
import CalculatorBase from "./calculator-base.js";
import HAND_TYPES from "./constants/hand-types.js";

export default class RoyalFlush extends CalculatorBase {
  constructor(cardsDrawn) {
    super(cardsDrawn, HAND_TYPES.ROYAL_FLUSH)
  }

  calculate() {
    const hand = new Hand(HAND_TYPES.ROYAL_FLUSH, [14, 13, 12, 11, 10])
    this.hands.push(hand)
    Object.values(SUITS).forEach(suit => {
      const drawn = this.cardsDrawn.filter(c => c.value >= 10 && c.suit == suit)
      const needed = 5 - drawn.length
      hand.count += this.nCr(this.cardsInDeck - needed, this.toDraw - needed)
    })
  }
}