/* eslint-disable no-undef */
import Card from "../src/card.js"
import SUITS from "../src/constants/suits.js"
import StraightFlush from "../src/hand-types/straight-flush.js"

describe("Straight Flush", () => {
  it("finds the correct number of hands", () => {
    const straightFlush = new StraightFlush()
    expect(straightFlush.hands.length).toBe(9)
  })

  it("handles 1 required with 0 to draw", () => {
    const cards = [2, 3, 4, 5, 8, 9, 10].map(v => new Card(v, SUITS.CLUBS))
    const straightFlush = new StraightFlush(cards)
    expect(straightFlush.count).toBe(0)
  })

  it("handles 5 required with 7 to draw", () => {
    const straightFlush = new StraightFlush()
    straightFlush.hands.forEach(hand => expect(hand.count).toBe(4140))
  })

  it("finds multiple possible hands", () => {
    const cards = [4, 5, 6, 7, 13].map(v => new Card(v, SUITS.CLUBS))
    const straightFlush = new StraightFlush(cards)

    expect(straightFlush.filter([6, 5, 4, 3, 2]).count).toBe(0)
    expect(straightFlush.filter([7, 6, 5, 4, 3]).count).toBe(45)
    expect(straightFlush.filter([8, 7, 6, 5, 4]).count).toBe(45)
    expect(straightFlush.filter([9, 8, 7, 6, 5]).count).toBe(1)
  })

  it("handles multiple suits", () => {
    const cards = [
      new Card(10, SUITS.CLUBS),
      new Card(10, SUITS.HEARTS),
    ]
    const straightFlush = new StraightFlush(cards)
    expect(straightFlush.filter([10, 9, 8, 7, 6]).count).toBe(92)
  })

  it("handles gaps in dealt cards", () => {
    const cards = [
      new Card(2, SUITS.DIAMONDS),
      new Card(6, SUITS.DIAMONDS),
      new Card(14, SUITS.CLUBS),
    ]
    const straightFlush = new StraightFlush(cards)
    expect(straightFlush.filter([6, 5, 4, 3, 2]).count).toBe(45)
  })
})