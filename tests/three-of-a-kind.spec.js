/* eslint-disable no-undef */
import Card from "../src/card.js"
import SUITS from "../src/constants/suits.js"
import ThreeOfAKind from "../src/hand-types/three-of-a-kind.js"


fdescribe("Three of a kind", () => {
  it("finds the correct number of hands", () => {
    const threeOfAKind = new ThreeOfAKind()
    expect(threeOfAKind.hands.length).toBe(585)
  })

  it("handles 1 required with 0 to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(3, SUITS.CLUBS),
      new Card(5, SUITS.SPADES),
      new Card(6, SUITS.SPADES),
      new Card(7, SUITS.DIAMONDS),
      new Card(8, SUITS.DIAMONDS),
      new Card(10, SUITS.HEARTS),
    ]
    const threeOfAKind = new ThreeOfAKind(cards)
    expect(threeOfAKind.count).toBe(0)
  })

  it("handles three of a kind already drawn with 0 left to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(3, SUITS.SPADES),
      new Card(3, SUITS.HEARTS),
      new Card(6, SUITS.CLUBS),
      new Card(7, SUITS.SPADES),
      new Card(8, SUITS.HEARTS),
      new Card(10, SUITS.DIAMONDS),
    ]
    const threeOfAKind = new ThreeOfAKind(cards)
    expect(threeOfAKind.count).toBe(1)
  })

  it("handles three of a kind already drawn with 3 left to draw", () => {
    const cards = [
      new Card(3, SUITS.CLUBS),
      new Card(3, SUITS.SPADES),
      new Card(3, SUITS.HEARTS),
      new Card(10, SUITS.DIAMONDS),
    ]
    const threeOfAKind = new ThreeOfAKind(cards)
    expect(threeOfAKind.possibleHands.length).toBe(15)
    expect(threeOfAKind.filter([3, 3, 3, 10, 9]).count).toBe(960)
    expect(threeOfAKind.filter([3, 3, 3, 13, 12]).count).toBe(512)
    expect(threeOfAKind.filter([3, 3, 3, 8, 7]).count).toBe(0)
  })

  it("handles 2 to draw with straight possible", () => {
    const cards = [
      new Card(5, SUITS.CLUBS),
      new Card(5, SUITS.SPADES),
      new Card(6, SUITS.SPADES),
      new Card(7, SUITS.DIAMONDS),
      new Card(8, SUITS.HEARTS),
    ]
    const threeOfAKind = new ThreeOfAKind(cards)
    expect(threeOfAKind.possibleHands.length).toBe(10)
    expect(threeOfAKind.filter([5, 5, 5, 8, 7]).count).toBe(16)
    expect(threeOfAKind.filter([5, 5, 5, 12, 8]).count).toBe(8)
    expect(threeOfAKind.filter([5, 5, 5, 14, 13]).count).toBe(0)
  })

  it("handles 2 to draw with flush possible", () => {
    const cards = [
      new Card(4, SUITS.CLUBS),
      new Card(4, SUITS.SPADES),
      new Card(4, SUITS.DIAMONDS),
      new Card(7, SUITS.DIAMONDS),
      new Card(10, SUITS.DIAMONDS),
    ]
    const threeOfAKind = new ThreeOfAKind(cards)
    expect(threeOfAKind.filter([4, 4, 4, 10, 7]).count).toBe(54)
    expect(threeOfAKind.filter([4, 4, 4, 12, 10]).count).toBe(90)
  })

  fit("handles 2 to draw with straight flush possible", () => {
    const cards = [
      new Card(5, SUITS.CLUBS),
      new Card(5, SUITS.SPADES),
      new Card(5, SUITS.DIAMONDS),
      new Card(6, SUITS.DIAMONDS),
      new Card(7, SUITS.DIAMONDS),
    ]
    const threeOfAKind = new ThreeOfAKind(cards)
    console.log(threeOfAKind.filter([5, 5, 5, 7, 6]).count)
    expect(threeOfAKind.filter([5, 5, 5, 7, 6]).count).toBe(30)
    expect(threeOfAKind.filter([5, 5, 5, 8, 7]).count).toBe(30)
    expect(threeOfAKind.filter([5, 5, 5, 9, 8]).count).toBe(0)
    expect(threeOfAKind.filter([5, 5, 5, 10, 9]).count).toBe(15)
  })
})