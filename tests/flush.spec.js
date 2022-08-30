/* eslint-disable no-undef */
import Card from "../src/card.js"
import SUITS from "../src/constants/suits.js"
import Flush from "../src/hand-types/flush.js"

describe("Flush", () => {
  it("finds the correct number of hands", () => {
    const flush = new Flush()
    expect(flush.hands.length).toBe(1278)
  })

  it("handles 1 required with 1 to draw", () => {
    const cards = [
      new Card(2, SUITS.CLUBS),
      new Card(3, SUITS.CLUBS),
      new Card(7, SUITS.CLUBS),
      new Card(8, SUITS.CLUBS),
      new Card(10, SUITS.HEARTS),
      new Card(13, SUITS.HEARTS),
    ]
    const flush = new Flush(cards)
    expect(flush.count).toBe(9)
  })

  it("handles 5 required with 5 to draw", () => {
    const flush = new Flush()
    expect(flush.filter([8, 6, 5, 4, 3]).count).toBe(2964)
  })

  it("handles 2 possible flushes with 3 to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(10, SUITS.CLUBS),
      new Card(3, SUITS.HEARTS),
      new Card(10, SUITS.HEARTS),
    ]
    const flush = new Flush(cards)
    expect(flush.filter([10, 8, 7, 6, 3]).count).toBe(2)
    expect(flush.count).toBe(330)
  })

  it("handles 4 required with 3 to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(5, SUITS.SPADES),
      new Card(7, SUITS.HEARTS),
      new Card(9, SUITS.DIAMONDS),
    ]
    const flush = new Flush(cards)
    expect(flush.count).toBe(0)
  })

  it("handles 0 required with 0 to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(8, SUITS.CLUBS),
      new Card(10, SUITS.CLUBS),
      new Card(11, SUITS.CLUBS),
      new Card(13, SUITS.CLUBS),
      new Card(5, SUITS.SPADES),
      new Card(9, SUITS.DIAMONDS),
    ]
    const flush = new Flush(cards)
    expect(flush.count).toBe(1)
  })

  it("handles straight flush", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(4, SUITS.CLUBS),
      new Card(5, SUITS.CLUBS),
      new Card(6, SUITS.CLUBS),
      new Card(7, SUITS.CLUBS),
    ]
    const flush = new Flush(cards)
    expect(flush.count).toBe(0)
  })

  it("handles possible low straight flush with 2 required and 2 to draw", () => {
    const cards = [
      new Card(5, SUITS.CLUBS),
      new Card(6, SUITS.CLUBS),
      new Card(7, SUITS.CLUBS),
      new Card(5, SUITS.SPADES),
      new Card(9, SUITS.DIAMONDS),
    ]
    const flush = new Flush(cards)
    expect(flush.count).toBe(42)
  })

  it("handles possible low straight flush with 1 required and 1 to draw", () => {
    const cards = [
      new Card(6, SUITS.CLUBS),
      new Card(7, SUITS.CLUBS),
      new Card(8, SUITS.CLUBS),
      new Card(9, SUITS.CLUBS),
      new Card(5, SUITS.SPADES),
      new Card(9, SUITS.DIAMONDS),
    ]
    const flush = new Flush(cards)
    expect(flush.count).toBe(7)
  })
})