import HandCalculator from "./hand-calculator.js"
import HANDS from "../constants/hands.js";
import Hand from "../hand.js"

export default class FourOfAKind extends HandCalculator {
  constructor(cardsDrawn) {
    super(HANDS.FOUR_OF_A_KIND, cardsDrawn)
  }

  calculate() {
    for (let fours = 2; fours < 15; fours++) {
      const foursDrawn = this.cardsDrawn.filter(c => c.value == fours)
      const foursNeeded = 4 - foursDrawn.length
  
        for (let kicker = 2; kicker < 15; kicker++) {
          const hand = new Hand(
            HANDS.FOUR_OF_A_KIND, 
            [fours, fours, fours, fours, kicker]
          )
  
          if (kicker == fours) {
            continue
          }
  
          this.hands.push(hand)
  
          const kickersDrawn = this.cardsDrawn.filter(c => c.value == kicker).length
          const othersDrawn = this.cardsDrawn.filter(c => c.value < kicker && c.value != fours).length
  
          const otherPossibleValues = fours < kicker ? kicker - 3 : kicker - 2
          let kickersNeeded = 0
          let othersNeeded = 0
  
          // 3x kickers
          kickersNeeded = 3 - kickersDrawn
          hand.count += this._getCombinations(
            foursNeeded, 
            kickersNeeded, 
            kickersDrawn, 
            othersNeeded, 
            othersDrawn, 
            otherPossibleValues)
  
          // 2x kickers, 1x other
          kickersNeeded = 2 - kickersDrawn
          othersNeeded = 1 - othersDrawn
          hand.count += this._getCombinations(
            foursNeeded, 
            kickersNeeded, 
            kickersDrawn, 
            othersNeeded, 
            othersDrawn, 
            otherPossibleValues)
  
          // 1x kicker, 2x others
          kickersNeeded = 1 - kickersDrawn
          othersNeeded = 2 - othersDrawn
          hand.count += this._getCombinations(
            foursNeeded, 
            kickersNeeded, 
            kickersDrawn, 
            othersNeeded, 
            othersDrawn, 
            otherPossibleValues)
      }
    }
  }

  _getCombinations(
    foursNeeded, 
    kickersNeeded, 
    kickersDrawn, 
    othersNeeded, 
    othersDrawn, 
    otherPossibleValues) 
  {
    const cardsNeeded = foursNeeded + kickersNeeded + othersNeeded
    if (cardsNeeded > this.toDraw) {
      return 0
    }
    if (otherPossibleValues == 0 && othersNeeded > 0) {
      return 0
    }
    let combinations = kickersNeeded ? this.nCr(4 - kickersDrawn, kickersNeeded) : 1    
    combinations *= othersNeeded ? this.nCr(otherPossibleValues * 4 - othersDrawn, othersNeeded) : 1
    return combinations
  }
}