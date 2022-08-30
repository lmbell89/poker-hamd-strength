/* eslint-disable no-undef */
import Card from "../src/card.js"
import SUITS from "../src/constants/suits.js"
import FullHouse from "../src/full-house.js"

describe("Full House", () => {
  it("finds the correct number of hands", () => {
    const fullHouse = new FullHouse()
    expect(fullHouse.hands.length).toBe(156)
  })

  it("handles 0 required with 2 to draw", () => {
    const cards = [
      new Card(4, SUITS.CLUBS),
      new Card(4, SUITS.HEARTS),
      new Card(4, SUITS.SPADES),
      new Card(9, SUITS.CLUBS),
      new Card(9, SUITS.HEARTS),
    ]
    const fullHouse = new FullHouse(cards)
    expect(fullHouse.count).toBe(1034)
  })

  it("handles 0 required with 0 to draw", () => {
    const cards = [
      new Card(4, SUITS.CLUBS),
      new Card(4, SUITS.HEARTS),
      new Card(4, SUITS.SPADES),
      new Card(9, SUITS.CLUBS),
      new Card(9, SUITS.HEARTS),
      new Card(11, SUITS.CLUBS),
      new Card(11, SUITS.HEARTS),
    ]
    const fullHouse = new FullHouse(cards)
    expect(fullHouse.count).toBe(1)
  })

  it("handles 3 pairs drawn with 1 to draw", () => {
    const cards = [
      new Card(4, SUITS.CLUBS),
      new Card(4, SUITS.HEARTS),
      new Card(9, SUITS.CLUBS),
      new Card(9, SUITS.HEARTS),
      new Card(12, SUITS.CLUBS),
      new Card(12, SUITS.HEARTS),
    ]
    const fullHouse = new FullHouse(cards)
    expect(fullHouse.count).toBe(6)
  })

  it("handles three of a kind drawn with 1 to draw", () => {
    const cards = [
      new Card(4, SUITS.CLUBS),
      new Card(4, SUITS.HEARTS),
      new Card(4, SUITS.SPADES),
      new Card(9, SUITS.CLUBS),
      new Card(10, SUITS.HEARTS),
      new Card(13, SUITS.CLUBS),
    ]
    const fullHouse = new FullHouse(cards)
    expect(fullHouse.count).toBe(9)
  })

  it("handles four of a kind drawn", () => {
    const cards = [
      new Card(4, SUITS.CLUBS),
      new Card(4, SUITS.HEARTS),
      new Card(4, SUITS.SPADES),
      new Card(4, SUITS.DIAMONDS),
    ]
    const fullHouse = new FullHouse(cards)
    expect(fullHouse.count).toBe(0)
  })

  it("handles straight drawn", () => {
    const cards = [
      new Card(4, SUITS.CLUBS),
      new Card(5, SUITS.HEARTS),
      new Card(6, SUITS.SPADES),
      new Card(7, SUITS.DIAMONDS),
      new Card(8, SUITS.DIAMONDS),
    ]
    const fullHouse = new FullHouse(cards)
    expect(fullHouse.count).toBe(0)
  })

  it("handles 1 required with 3 to draw", () => {
    const cards = [
      new Card(14, SUITS.CLUBS),
      new Card(14, SUITS.HEARTS),
      new Card(13, SUITS.SPADES),
      new Card(13, SUITS.DIAMONDS),
    ]
    const fullHouse = new FullHouse(cards)
    expect(fullHouse.count).toBe(4004)
  })
})