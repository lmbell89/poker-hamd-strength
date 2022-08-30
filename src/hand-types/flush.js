import _ from "lodash"
import HandCalculator from "./hand-calculator.js"
import HANDS from "../constants/hands.js"
import SUITS from "../constants/suits.js"
import Hand from "../hand.js"

export default class Flush extends HandCalculator {
  constructor(cardsDrawn) {
    super(HANDS.FLUSH, cardsDrawn)
  }

  calculate() {
    for (let values of this._flushValues()) {
      const hand = new Hand(HANDS.FLUSH, values)
      this.hands.push(hand)

      Object.values(SUITS).forEach(suit => {
        const lowestCard = Math.min(...values)
        const higherFlushCards = _.difference(_.range(lowestCard, 15), values)

        const drawnSuits = this.cardsDrawn.filter(c => c.suit == suit)
        const drawn = drawnSuits.filter(c => values.includes(c.value))
        const hasHigherFlushCard = drawnSuits.filter(c => higherFlushCards.includes(c.value)).length > 0

        const needed = 5 - drawn.length

        if (needed > this.toDraw || hasHigherFlushCard) {
          return
        }

        let neededForLowStraight = Infinity
        let drawnLower = 0
        if (values[1] - values[4] == 3 && values[4] > 2) {
          drawnLower = drawnSuits.filter(c => c.value == lowestCard - 1).length
          neededForLowStraight = 1 - drawnLower
        } else if (values[2] - values[4] == 2 && values[4] > 3) {
          drawnLower = drawnSuits.filter(c => c.value < lowestCard && c.value >= lowestCard - 2).length
          neededForLowStraight = 2 - drawnLower
        }

        const otherToDraw = this.toDraw - needed
        const otherPossibleCards = this.cardsInDeck - needed - higherFlushCards.length

        if (neededForLowStraight == 0) {
          return
        } else if (neededForLowStraight > otherToDraw) {
          hand.count += this.nCr(otherPossibleCards, otherToDraw)
        } else if (neededForLowStraight == 1) {
          hand.count += this.nCr(otherPossibleCards - 1, otherToDraw)
        } else {
          hand.count += this.nCr(otherPossibleCards, otherToDraw) - 1
        }
      }
    )}
  }

  * _flushValues() {
    // ace is always high in a flush
    let values = [6, 5, 4, 3, 2]
  
    const incrementValues = () => {
      let affected = 0
  
      if (values[0] < 14) {
        affected = 0
      } else if (values[1] < 13) {
        affected = 1
      } else if (values[2] < 12) {
        affected = 2
      } else if (values[3] < 11) {
        affected = 3
      } else {
        affected = 4
      }
  
      values[affected]++
      for (let i = affected; i > 0; i--) {
        values[i - 1] = values[i] + 1
      }
    }

    while (!_.isEqual(values, [14, 13, 12, 11, 10])) {
      while (values[0] - values[4] == 4) {
        incrementValues()
      }
      yield values
      incrementValues()
    }
  }
}