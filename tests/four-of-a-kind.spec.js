/* eslint-disable no-undef */
import Card from "../src/card.js"
import SUITS from "../src/constants/suits.js"
import FourOfAKind from "../src/four-of-a-kind.js"


describe("Four of a kind", () => {
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
    const hands = new FourOfAKind(cards).hands
    expect(hands.length).toBe(156)
    expect(hands.map(h => h.count).reduce((a, b) => a + b)).toBe(0)
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
    const hands = new FourOfAKind(cards).hands
    expect(hands.length).toBe(156)
    expect(hands.map(h => h.count).reduce((a, b) => a + b)).toBe(1)
  })

  it("handles four of a kind already drawn with 3 left to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(3, SUITS.SPADES),
      new Card(3, SUITS.HEARTS),
      new Card(3, SUITS.DIAMONDS),
    ]
    const hands = new FourOfAKind(cards).hands
    expect(hands.length).toBe(156)
    expect(hands.filter(h => h.count > 0).length).toBe(12)
    expect(hands.find(h => h.cardValues[0] == 3 && h.cardValues[4] == 2).count).toBe(4)
    expect(hands.find(h => h.cardValues[0] == 3 && h.cardValues[4] == 4).count).toBe(52)
    expect(hands.find(h => h.cardValues[0] == 3 && h.cardValues[4] == 5).count).toBe(164)
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
    const hands = new FourOfAKind(cards).hands
    expect(hands.length).toBe(156)
    expect(hands.map(h => h.count).reduce((a, b) => a + b)).toBe(2)
  })

  it("handles 3 required for 4 different four-of-a-kinds with 3 to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(5, SUITS.SPADES),
      new Card(7, SUITS.HEARTS),
      new Card(9, SUITS.DIAMONDS),
    ]
    const hands = new FourOfAKind(cards).hands
    expect(hands.length).toBe(156)
    expect(hands.map(h => h.count).reduce((a, b) => a + b)).toBe(4)
  })

  it("handles starting with 0 cards", () => {
    const hands = new FourOfAKind([]).hands
    expect(hands.length).toBe(156)
    expect(hands.find(h => h.cardValues[0] == 10 && h.cardValues[4] == 14).count).toBe(4052)
  })
})