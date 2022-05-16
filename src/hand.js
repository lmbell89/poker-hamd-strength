import Card from "./card.js"
import HAND_TYPES from "./constants/hand-types.js"

export default class Hand {
  constructor(type, cardValues, count=0) {
    this.type = type
    this.cards = cardValues.map(v => new Card(v))
    this.count = count
  }

  get value() {
    return parseInt(this.type.toString() + this.cards, 16)
  }

  get description() {
    switch (this.type) {
      case HAND_TYPES.ROYAL_FLUSH:
        return "royal flush"
      case HAND_TYPES.STRAIGHT_FLUSH:
        return `${this.cards[0]}-high straight flush`
      case HAND_TYPES.FOUR_OF_A_KIND:
        return `four of a kind, ${this.cards[0]}s`
      case HAND_TYPES.FULL_HOUSE:
        return `full house, ${this.cards[0]}s over ${this.cards[4]}s`
      case HAND_TYPES.FLUSH:
        return `${this.cards[0]}-high flush`
      case HAND_TYPES.STRAIGHT:
        return `${this.cards[0]}-high straight`
      case HAND_TYPES.THREE_OF_A_KIND:
        return `three of a kind, ${this.cards[0]}s`
      case HAND_TYPES.TWO_PAIR:
        return `two pair, ${this.cards[0]}s over ${this.cards[2]}s`
      case HAND_TYPES.PAIR:
        return `pair, ${this.cards[0]}s`
      case HAND_TYPES.HIGH_CARD:
        return `high card, ${this.cards[0]}`
      default:
        throw `type: ${this.type} not recognised`
    }
  }
}