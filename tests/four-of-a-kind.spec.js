/* eslint-disable no-undef */
import Card from "../src/card.js"
import SUITS from "../src/constants/suits.js"
import FourOfAKind from "../src/hand-types/four-of-a-kind.js"


describe("Four of a kind", () => {
  it("finds the correct number of hands", () => {
    const fourOfAKind = new FourOfAKind()
    expect(fourOfAKind.hands.length).toBe(156)
  })

  it("handles 1 required with 0 to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(3, SUITS.SPADES),
      new Card(3, SUITS.HEARTS),
      new Card(5, SUITS.HEARTS),
      new Card(6, SUITS.HEARTS),
      new Card(7, SUITS.HEARTS),
      new Card(8, SUITS.HEARTS),
    ]
    const fourOfAKind = new FourOfAKind(cards)
    expect(fourOfAKind.count).toBe(0)
  })

  it("handles four of a kind already drawn with 0 left to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(3, SUITS.SPADES),
      new Card(3, SUITS.HEARTS),
      new Card(3, SUITS.CLUBS),
      new Card(6, SUITS.HEARTS),
      new Card(7, SUITS.HEARTS),
      new Card(8, SUITS.HEARTS),
    ]
    const fourOfAKind = new FourOfAKind(cards)
    expect(fourOfAKind.count).toBe(1)
  })

  it("handles four of a kind already drawn with 3 left to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(3, SUITS.SPADES),
      new Card(3, SUITS.HEARTS),
      new Card(3, SUITS.DIAMONDS),
    ]
    const fourOfAKind = new FourOfAKind(cards)
    expect(fourOfAKind.possibleHands.length).toBe(12)
    expect(fourOfAKind.filter([3, 3, 3, 3, 2]).count).toBe(4)
    expect(fourOfAKind.filter([3, 3, 3, 3, 4]).count).toBe(52)
    expect(fourOfAKind.filter([3, 3, 3, 3, 5]).count).toBe(164)
  })

  it("handles 1 required for 2 different four-of-a-kinds with 1 to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(3, SUITS.SPADES),
      new Card(3, SUITS.HEARTS),
      new Card(7, SUITS.CLUBS),
      new Card(7, SUITS.SPADES),
      new Card(7, SUITS.HEARTS),
    ]
    const fourOfAKind = new FourOfAKind(cards)
    expect(fourOfAKind.count).toBe(2)
  })

  it("handles 3 required for 4 different four-of-a-kinds with 3 to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(5, SUITS.SPADES),
      new Card(7, SUITS.HEARTS),
      new Card(9, SUITS.DIAMONDS),
    ]
    const fourOfAKind = new FourOfAKind(cards)
    expect(fourOfAKind.count).toBe(4)
  })

  it("handles starting with 0 cards", () => {
    const fourOfAKind = new FourOfAKind()
    expect(fourOfAKind.filter([10, 10, 10, 10, 14]).count).toBe(4052)
  })
})