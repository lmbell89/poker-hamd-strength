import CalculatorBase from "./calculator-base.js";
import HAND_TYPES from "./constants/hand-types.js";
import SUITS from "./constants/suits.js";
import Hand from "./hand.js";

export default class Flush extends CalculatorBase {
  constructor(cardsDrawn) {
    super(cardsDrawn, HAND_TYPES.STRAIGHT)
  }

  calculate() {
    for (let values of this.straightValues(true)) {
      const hand = new Hand(HAND_TYPES.STRAIGHT, values)
      const highCard = values[0]
      this.hands.push(hand)

      const cardForHigherStraight = this.cardsDrawn.find(c => c.value == highCard + 1)
      if (cardForHigherStraight) {
        continue
      }

      const drawn = this.cardsDrawn.filter(c => {
        c.value <= highCard && c.value >= highCard - 5
      })



      Object.values(SUITS).forEach(suit => {
        const drawnOfSuit = this.cardsDrawn.filter(c => c.suit === suit)
        if (drawnOfSuit.length >= 5) {
          return
        }

        let combinations = 1
        for (let i = highCard - 5; i < highCard; i++) {

        }
      })
    }
  }
}