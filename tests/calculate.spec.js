/* eslint-disable no-undef */
import { royalFlush, straightFlush } from "../src/calculate.js";
import Card from "../src/card.js"
import SUITS from "../src/constants/suits.js"

describe("Royal flush", () => {
  it("correctly evaluates 1 required with 1 to draw", () => {
    const cards = [2, 3, 10, 11, 12, 13].map(v => new Card(v, SUITS.CLUBS))
    const hands = royalFlush(cards)
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(1)
  })

  it("correctly evaluates 2 required with 1 to draw", () => {
    const cards = [2, 3, 9, 11, 12, 13].map(v => new Card(v, SUITS.CLUBS))
    const hands = royalFlush(cards)
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(0)
  })

  it("correctly evaluates 1 required with 2 to draw", () => {
    const cards = [3, 10, 11, 12, 13].map(v => new Card(v, SUITS.CLUBS))
    const hands = royalFlush(cards)
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(46)
  })

  it("correctly evaluates 0 required with 2 to draw", () => {
    const cards = [10, 11, 12, 13, 14].map(v => new Card(v, SUITS.CLUBS))
    const hands = royalFlush(cards)
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(1081)
  })

  it("correctly evaluates 5 required with 5 to draw", () => {
    const cards = [2, 3].map(v => new Card(v, SUITS.CLUBS))
    const hands = royalFlush(cards)
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(4)
  })

  it("correctly evaluates 5 required with 7 to draw", () => {
    const hands = royalFlush([])
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(4324)
  })

  it("does not count unsuited straight", () => {
    const cards = [
      new Card(10, SUITS.CLUBS),
      new Card(11, SUITS.HEARTS),
      new Card(12, SUITS.SPADES),
      new Card(13, SUITS.DIAMONDS),
      new Card(14, SUITS.DIAMONDS),
    ]
    const hands = royalFlush(cards)
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(0)
  })
})

describe("Straight Flush", () => {
  it("correctly evaluates 1 required with 0 to draw", () => {
    const cards = [2, 3, 4, 5, 8, 9, 10].map(v => new Card(v, SUITS.CLUBS))
    const hands = straightFlush(cards)
    expect(hands.length).toBe(9)
    expect(hands.map(h => h.count).reduce((a, b) => a + b)).toBe(0)
  })

  it("correctly evaluates 5 required with 7 to draw", () => {
    const hands = straightFlush([])
    expect(hands.length).toBe(9)
    hands.forEach(hand => expect(hand.count).toBe(4140))
  })

  it("finds multiple possible hands", () => {
    const cards = [4, 5, 6, 7, 13].map(v => new Card(v, SUITS.CLUBS))
    const hands = straightFlush(cards)
    expect(hands.length).toBe(9)
    expect(hands.find(h => h.cards[0].value == 6).count).toBe(0)
    expect(hands.find(h => h.cards[0].value == 7).count).toBe(45)
    expect(hands.find(h => h.cards[0].value == 8).count).toBe(45)
    expect(hands.find(h => h.cards[0].value == 9).count).toBe(1)
  })

  it("handles multiple suits", () => {
    const cards = [
      new Card(10, SUITS.CLUBS),
      new Card(10, SUITS.HEARTS),
    ]
    const hands = straightFlush(cards)
    expect(hands.length).toBe(9)
    expect(hands.find(h => h.cards[0].value == 10).count).toBe(92)    
  })

  it("handles gaps in dealt cards", () => {
    const cards = [
      new Card(2, SUITS.DIAMONDS),
      new Card(6, SUITS.DIAMONDS),
      new Card(14, SUITS.CLUBS),
    ]
    const hands = straightFlush(cards)
    expect(hands.length).toBe(9)
    expect(hands.find(h => h.cards[0].value == 6).count).toBe(45)    
  })
})