import HANDS from "./constants/hands.js"

export default class Hand {
  constructor(type, cardValues=[], count=0) {
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
      case HANDS.ROYAL_FLUSH:
        return "royal flush"
      case HANDS.STRAIGHT_FLUSH:
        return `${this.cardValues[0]}-high straight flush`
      case HANDS.FOUR_OF_A_KIND:
        return `four of a kind, ${this.cardValues[0]}s`
      case HANDS.FULL_HOUSE:
        return `full house, ${this.cardValues[0]}s over ${this.cardValues[4]}s`
      case HANDS.FLUSH:
        return `${this.cardValues[0]}-high flush`
      case HANDS.STRAIGHT:
        return `${this.cardValues[0]}-high straight`
      case HANDS.THREE_OF_A_KIND:
        return `three of a kind, ${this.cardValues[0]}s`
      case HANDS.TWO_PAIR:
        return `two pair, ${this.cardValues[0]}s over ${this.cardValues[2]}s`
      case HANDS.PAIR:
        return `pair, ${this.cardValues[0]}s`
      case HANDS.HIGH_CARD:
        return `high card, ${this.cardValues[0]}`
      default:
        throw `type: ${this.type} not recognised`
    }
  }
}