import HAND_TYPES from "./constants/hand-types.js"

export default class Hand {
  constructor(type, cardValues, count=0) {
    this.type = type
    this.cardValues = [...cardValues]
    this.count = count
  }

  get value() {
    const cardHexes = this.cardValues.map(v => parseInt(v, 16))
    const typeHex = parseInt(this.type.toString(), 16)
    return typeHex + cardHexes.join("")
  }

  get description() {
    switch (this.type) {
      case HAND_TYPES.ROYAL_FLUSH:
        return "royal flush"
      case HAND_TYPES.STRAIGHT_FLUSH:
        return `${this.cardValues[0]}-high straight flush`
      case HAND_TYPES.FOUR_OF_A_KIND:
        return `four of a kind, ${this.cardValues[0]}s`
      case HAND_TYPES.FULL_HOUSE:
        return `full house, ${this.cardValues[0]}s over ${this.cardValues[4]}s`
      case HAND_TYPES.FLUSH:
        return `${this.cardValues[0]}-high flush`
      case HAND_TYPES.STRAIGHT:
        return `${this.cardValues[0]}-high straight`
      case HAND_TYPES.THREE_OF_A_KIND:
        return `three of a kind, ${this.cardValues[0]}s`
      case HAND_TYPES.TWO_PAIR:
        return `two pair, ${this.cardValues[0]}s over ${this.cardValues[2]}s`
      case HAND_TYPES.PAIR:
        return `pair, ${this.cardValues[0]}s`
      case HAND_TYPES.HIGH_CARD:
        return `high card, ${this.cardValues[0]}`
      default:
        throw `type: ${this.type} not recognised`
    }
  }
}