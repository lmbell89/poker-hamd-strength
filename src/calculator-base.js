import { nCr } from "./math.js"
import _ from 'lodash';

export default class CalculatorBase {
  PLAYER_CARDS = 2
  COMMUNITY_CARDS = 5
  DECK_SIZE = 52

  constructor(cardsDrawn, handType) {
    this.cardsDrawn = cardsDrawn
    this.handType = handType
    this.hands = []
    this.calculate()
  }

  get count() {
    return this.hands.map(h => h.count).reduce((a, b) => a + b)
  }

  get toDraw() {
    return this.PLAYER_CARDS + this.COMMUNITY_CARDS - this.cardsDrawn.length
  }

  get cardsInDeck() {
    return this.DECK_SIZE - this.cardsDrawn.length
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
}