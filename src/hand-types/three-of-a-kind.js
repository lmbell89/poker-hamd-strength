import _ from "lodash"
import HANDS from "../constants/hands.js"
import Hand from "../hand.js"
import HandCalculator from "./hand-calculator.js"

export default class ThreeOfAKind extends HandCalculator {
  constructor(cardsDrawn) {
    super(HANDS.THREE_OF_A_KIND, cardsDrawn)
  }

  isDebug(handValues) {
    return handValues.main == 5
    && handValues.kHigh == 7
    && handValues.kLow == 6
  }

  calculate() {
    for (const handValues of getHandValues()) {
      const hand = handValues.toHand()
      this.hands.push(hand)

      const { 
        mainDrawn, 
        kHighDrawn, 
        kLowDrawn, 
        otherDrawn 
      } = getValuesDrawn(this.cardsDrawn, handValues)

      const otherValues = otherDrawn.map(o => o.value)
      if (otherValues.some(v => v > handValues.kLow)) {
        continue
      }

      const mainNeeded = 3 - mainDrawn.length
      const kHighNeeded = 1 - kHighDrawn.length
      const kLowNeeded = 1 - kLowDrawn.length
      const otherNeeded = 2 - otherDrawn.length
      const sumNeeded = mainNeeded + kHighNeeded + kLowNeeded

      if (sumNeeded > this.toDraw) {
        continue
      }
      if (drawnFourOfAKind(mainDrawn)) {
        continue
      }
      if (drawnFullHouse(kHighDrawn, kLowDrawn)) {
        continue
      }
      if (drawnStraight(this.cardsDrawn)) {
        continue
      }
      if (drawnFlush(this.cardsDrawn)) {
        continue
      }
      if (isStraightInevitable(otherDrawn, this.cardsDrawn)) {
        continue
      }

      const straightPossible = isStraightPossible(handValues, this.cardsDrawn)

      const otherPossibleNumbers = handValues.main < handValues.kLow
        ? handValues.kLow - 3
        : handValues.kLow - 2

      let otherNumberCombinations = this.nCr(otherPossibleNumbers, otherNeeded)

      if (straightPossible) {
        otherNumberCombinations -= 1
      }
      
      const flushSuits = flushSuitsPossible(handValues, this.cardsDrawn)
      const otherSuitCombinations = this.nCr(4, 1) ** otherNeeded - flushSuits
      const otherCombinations = otherNumberCombinations * otherSuitCombinations

      if (otherNeeded > 0 && otherCombinations === 0) {
        continue
      }
      
      hand.count = this.nCr(4 - mainDrawn.length, mainNeeded)
      * this.nCr(4 - kHighDrawn.length, kHighNeeded)
      * this.nCr(4 - kLowDrawn.length, kLowNeeded)
      * otherNumberCombinations

      if (this.isDebug(handValues)) {
        console.log(this.nCr(4 - mainDrawn.length, mainNeeded))
        console.log(this.nCr(4 - kHighDrawn.length, kHighNeeded))
        console.log(this.nCr(4 - kLowDrawn.length, kLowNeeded))
        console.log('other needed', otherNeeded)
        console.log('other possible numbers', otherPossibleNumbers)
        console.log('straight possible', straightPossible)
        console.log('other number combinations', otherNumberCombinations)
        console.log('flush suits', flushSuits)
        console.log('other combinations', otherCombinations)
        console.log('hand count', hand.count)
      }
      
      hand.count -= otherSuitCombinations
    }
  }
}

function getValuesDrawn(cardsDrawn, handValues) {
  const mainDrawn = cardsDrawn.filter(c => c.value === handValues.main)
  const kHighDrawn = cardsDrawn.filter(c => c.value === handValues.kHigh)
  const kLowDrawn = cardsDrawn.filter(c => c.value === handValues.kLow)
  const otherDrawn = cardsDrawn.filter(drawn => {
    return !handValues.toArray().some(value => drawn.value === value)
  })

  return { mainDrawn, kHighDrawn, kLowDrawn, otherDrawn }
}

function drawnFourOfAKind(mainDrawn) {
  return mainDrawn.length === 4
}

function drawnFullHouse(kHighDrawn, kLowDrawn) {
  return kHighDrawn.length > 1 || kLowDrawn.length > 1
}

function drawnStraight(cardsDrawn) {
  const values = cardsDrawn.map(c => c.value)
  const range = Math.max(values) - Math.min(values)
  return range === 4 && cardsDrawn.length === 7
}

function drawnFlush(cardsDrawn) {
  const suitsDrawn = cardsDrawn.map(c => c.suit)
  const suitCounts = _.countBy(suitsDrawn)
  const maxDrawn = Math.max(...Object.values(suitCounts))
  return maxDrawn === 5
}

function isStraightInevitable(otherDrawn, hand) {
  const values = otherDrawn.map(c => c.value).concat(hand.cardValues)
  const range = Math.max(...values) - Math.min(...values)
  return range === 4 && otherDrawn.length === 2
}

function isStraightPossible(handValues, cardsDrawn) {
  const drawnValues = cardsDrawn.map(c => c.value)
  const maxHandValue = Math.max(...handValues.toArray())
  return drawnValues.every(v => maxHandValue - v <= 4)
}

function flushSuitsPossible(handValues, cardsDrawn) {
  const mainDrawn = cardsDrawn.filter(c => c.value === handValues.main)
  const nonMainDrawn = cardsDrawn.filter(c => c.value !== handValues.main)
  const mainSuits = mainDrawn.map(c => c.suit)
  const nonMainSuits = _.uniq(nonMainDrawn.map(c => c.suit))
  
  if (cardsDrawn.length === 0) {
    return 4
  } else if (nonMainDrawn.length === 0) {
    return mainDrawn.length
  } else if (nonMainSuits.length > 1) {
    return 0
  } else if (mainSuits.length === 0 || mainSuits.includes(nonMainSuits[0])) {
    return 1
  } else {
    return 0
  }
}

class HandValues {
  constructor(threeOfAKindValue, highKickerValue, lowKickerValue) {
    this._threeOfAKindValue = threeOfAKindValue
    this._higherKickerValue = highKickerValue
    this._lowKickerValue = lowKickerValue
  }

  get main() {
    return this._threeOfAKindValue
  }

  get kHigh() {
    return this._higherKickerValue
  }

  get kLow() {
    return this._lowKickerValue
  }

  toArray() {
    return [this.main, this.kHigh, this.kLow]
  }

  toHand() {
    const values = [
      this.main,
      this.main,
      this.main,
      this.kHigh,
      this.kLow,
    ]
    return new Hand(HANDS.THREE_OF_A_KIND, values)
  }
}

function* getHandValues() {
  for (let threeOfAKindValue = 2; threeOfAKindValue < 15; threeOfAKindValue++) {
    for (let higherKickerValue = 5; higherKickerValue < 15; higherKickerValue++) {

      if (higherKickerValue === threeOfAKindValue) {
        continue
      }

      for (let lowKickerValue = 4; lowKickerValue < 15; lowKickerValue++) {

        if (higherKickerValue <= lowKickerValue) {
          continue
        }
        if (lowKickerValue === threeOfAKindValue) {
          continue
        }
        if (threeOfAKindValue < lowKickerValue && lowKickerValue === 4) {
          continue
        }

        yield new HandValues(threeOfAKindValue, higherKickerValue, lowKickerValue)
      }
    }
  }
}