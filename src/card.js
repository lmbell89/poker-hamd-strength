export default class Card {
  constructor(value, suit) {
    this.value = value
    this.suit = suit
  }

  toString() {
    return `${this.value}${this.suit}`
  }

  get hex() {
    return this.value.toString(16)
  }

  get valueName() {
    switch(this.value) {
      case 1:
        return "Ace"
      case 2:
        return "Two"
      case 3:
        return "Three"
      case 4: 
        return "Four"
      case 5:
        return "Five"
      case 6:
        return "Six"
      case 7:
        return "Seven"
      case 8:
        return "Eight"
      case 9:
        return "Nine"
      case 10:
        return "Ten"
      case 11:
        return "Jack"
      case 12:
        return "Queen"
      case 13:
        return "King"
      case 14:
        return "Ace"
      default:
        throw `value: ${this.value} not recognised`
    }
  }
}