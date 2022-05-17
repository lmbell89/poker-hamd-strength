/* eslint-disable no-undef */
import { fourOfAKind, royalFlush, straightFlush } from "../src/calculate.js";
import Card from "../src/card.js"
import SUITS from "../src/constants/suits.js"

describe("Royal flush", () => {
  it("handles 1 required with 1 to draw", () => {
    const cards = [2, 3, 10, 11, 12, 13].map(v => new Card(v, SUITS.CLUBS))
    const hands = royalFlush(cards)
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(1)
  })

  it("handles 2 required with 1 to draw", () => {
    const cards = [2, 3, 9, 11, 12, 13].map(v => new Card(v, SUITS.CLUBS))
    const hands = royalFlush(cards)
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(0)
  })

  it("handles 1 required with 2 to draw", () => {
    const cards = [3, 10, 11, 12, 13].map(v => new Card(v, SUITS.CLUBS))
    const hands = royalFlush(cards)
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(46)
  })

  it("handles 0 required with 2 to draw", () => {
    const cards = [10, 11, 12, 13, 14].map(v => new Card(v, SUITS.CLUBS))
    const hands = royalFlush(cards)
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(1081)
  })

  it("handles 5 required with 5 to draw", () => {
    const cards = [2, 3].map(v => new Card(v, SUITS.CLUBS))
    const hands = royalFlush(cards)
    expect(hands.length).toBe(1)
    expect(hands[0].count).toBe(4)
  })

  it("handles 5 required with 7 to draw", () => {
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
  it("handles 1 required with 0 to draw", () => {
    const cards = [2, 3, 4, 5, 8, 9, 10].map(v => new Card(v, SUITS.CLUBS))
    const hands = straightFlush(cards)
    expect(hands.length).toBe(9)
    expect(hands.map(h => h.count).reduce((a, b) => a + b)).toBe(0)
  })

  it("handles 5 required with 7 to draw", () => {
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
    const hands = fourOfAKind(cards)
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
    const hands = fourOfAKind(cards)
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
    const hands = fourOfAKind(cards)
    expect(hands.length).toBe(156)
    expect(hands.filter(h => h.count > 0).length).toBe(12)
    expect(hands.find(h => h.cards[0].value == 3 && h.cards[4].value == 2).count).toBe(4)
    expect(hands.find(h => h.cards[0].value == 3 && h.cards[4].value == 4).count).toBe(52)
    expect(hands.find(h => h.cards[0].value == 3 && h.cards[4].value == 5).count).toBe(164)
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
    const hands = fourOfAKind(cards)
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
    const hands = fourOfAKind(cards)
    expect(hands.length).toBe(156)
    expect(hands.map(h => h.count).reduce((a, b) => a + b)).toBe(4)
  })

  it("handles starting with 0 cards", () => {
    const hands = fourOfAKind([])
    expect(hands.length).toBe(156)
    expect(hands.find(h => h.cards[0].value == 10 && h.cards[4].value == 14).count).toBe(4052)
  })
})