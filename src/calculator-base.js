import { nCr } from "./math.js"
import _ from 'lodash';

export default class CalculatorBase {
  PLAYER_CARDS = 2
  COMMUNITY_CARDS = 5
  DECK_SIZE = 52

  constructor(cardsDrawn, handType) {
    this.cardsDrawn = cardsDrawn
    this.handType = handType
    this.toDraw = this.PLAYER_CARDS + this.COMMUNITY_CARDS - cardsDrawn.length
    this.cardsInDeck = this.DECK_SIZE - this.cardsDrawn.length
    this.hands = []
    this.calculate()
  }

  nCr(n, r) {
    return r < 0 ? 0 : nCr(n, r)
  }

  calculate() {}

  * straightValues(includeAceHigh=true) {
    const highest = includeAceHigh ? 14 : 13
    let highCard = 5

    while (highCard <= highest) {
      yield _.range(highCard, highCard - 5, -1)
      highCard++
    }
  }

  * flushValues() {

  }
}