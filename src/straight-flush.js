import SUITS from "./constants/suits.js"
import Hand from "./hand.js"
import CalculatorBase from "./calculator-base.js";
import HAND_TYPES from "./constants/hand-types.js";

export default class StraightFlush extends CalculatorBase {
  constructor(cardsDrawn) {
    super(cardsDrawn, HAND_TYPES.STRAIGHT_FLUSH)
  }

  _isCardInStraightFlush(card, flushHighCard, suit) {
    let value = (flushHighCard == 5 && card.value == 14) ? 1 : card.value
    return card.suit == suit && value <= flushHighCard && value >= flushHighCard - 4
  }

  calculate() {
    for (let values of this.straightValues(false)) {
      const hand = new Hand(HAND_TYPES.STRAIGHT_FLUSH, values)
      const highCard = values[0]
      this.hands.push(hand)

      Object.values(SUITS).forEach(suit => {
        const drawn = this.cardsDrawn.filter(c => this._isCardInStraightFlush(c, highCard, suit))
        const cardForHigherStraight = this.cardsDrawn.find(c => c.value == highCard + 1 && c.suit == suit)
        if (cardForHigherStraight) {
          return
        }
        const needed = 5 - drawn.length
        hand.count += this.nCr(this.cardsInDeck - 1 - needed, this.toDraw - needed)
      })
    }
  }
}