import _ from "lodash"
import HandCalculator from "./hand-calculator.js"
import HANDS from "../constants/hands.js"
import Hand from "../hand.js"

export default class FullHouse extends HandCalculator {
  constructor(cardsDrawn) {
    super(HANDS.FULL_HOUSE, cardsDrawn)
  }

  calculate() {
    for (let threes = 2; threes < 15; threes++) {
      for (let pair = 2; pair < 15; pair++) {        
        if (threes == pair) {
          continue
        }

        const values = [threes, threes, threes, pair, pair]
        const hand = new Hand(HANDS.FULL_HOUSE, values)
        this.hands.push(hand)

        const threesDrawn = this.cardsDrawn.filter(c => c.value === threes)
        const pairDrawn = this.cardsDrawn.filter(c => c.value === pair)
        const othersDrawn = this.cardsDrawn.filter(c => c.value !== threes && c.value !== pair)

        const threesNeeded = 3 - threesDrawn.length
        const pairNeeded = Math.max(2 - pairDrawn.length, 0)
        const othersNeeded = 7 - this.cardsDrawn.length - threesNeeded - pairNeeded

        const drawnHigherPair = othersDrawn.length === 2 &&
          othersDrawn[0].value === othersDrawn[1].value &&
          othersDrawn[0].value > pair

        if (threesDrawn.length === 4 || pairDrawn.length === 4) {
          continue
        }
        if (pair > threes && pairDrawn === 3) {
          continue
        }
        if (threesNeeded + pairNeeded > this.toDraw) {
          continue
        }
        if (drawnHigherPair) {
          continue
        }
        hand.count = this.nCr(4 - threesDrawn.length, threesNeeded)
        hand.count *= this.nCr(4 - pairDrawn.length, pairNeeded)

        if (othersNeeded === 0) {
          continue
        }

        let otherCombinations
        let higherPairs

        if (pairDrawn.length === 3) {
          higherPairs = 0
        } else if (pair > threes) {
          higherPairs = (14 - pair)
        } else {
          higherPairs = (14 - pair - 1)
        }

        if (othersNeeded === 2) {
          higherPairs *= this.nCr(4, 2)
        }

        if (pair > threes || pairDrawn.length === 3) {
          // cannot choose value of pair or threes
          otherCombinations = this.nCr(44, othersNeeded)
        } else {
          // cannot choose value of threes
          otherCombinations = this.nCr(46, othersNeeded) - 1
        }

        otherCombinations -= higherPairs
        hand.count *= otherCombinations
      }
    }
  }
}