/* eslint-disable no-undef */
import Card from "../src/card.js"
import SUITS from "../src/constants/suits.js"
import StraightFlush from "../src/straight-flush.js"

describe("Straight Flush", () => {
  it("handles 1 required with 0 to draw", () => {
    const cards = [2, 3, 4, 5, 8, 9, 10].map(v => new Card(v, SUITS.CLUBS))
    const hands = new StraightFlush(cards).hands
    expect(hands.length).toBe(9)
    expect(hands.map(h => h.count).reduce((a, b) => a + b)).toBe(0)
  })

  it("handles 5 required with 7 to draw", () => {
    const hands = new StraightFlush([]).hands
    expect(hands.length).toBe(9)
    hands.forEach(hand => expect(hand.count).toBe(4140))
  })

  it("finds multiple possible hands", () => {
    const cards = [4, 5, 6, 7, 13].map(v => new Card(v, SUITS.CLUBS))
    const hands = new StraightFlush(cards).hands
    expect(hands.length).toBe(9)
    expect(hands.find(h => h.cardValues[0] == 6).count).toBe(0)
    expect(hands.find(h => h.cardValues[0] == 7).count).toBe(45)
    expect(hands.find(h => h.cardValues[0] == 8).count).toBe(45)
    expect(hands.find(h => h.cardValues[0] == 9).count).toBe(1)
  })

  it("handles multiple suits", () => {
    const cards = [
      new Card(10, SUITS.CLUBS),
      new Card(10, SUITS.HEARTS),
    ]
    const hands = new StraightFlush(cards).hands
    expect(hands.length).toBe(9)
    expect(hands.find(h => h.cardValues[0] == 10).count).toBe(92)    
  })

  it("handles gaps in dealt cards", () => {
    const cards = [
      new Card(2, SUITS.DIAMONDS),
      new Card(6, SUITS.DIAMONDS),
      new Card(14, SUITS.CLUBS),
    ]
    const hands = new StraightFlush(cards).hands
    expect(hands.length).toBe(9)
    expect(hands.find(h => h.cardValues[0] == 6).count).toBe(45)    
  })
})