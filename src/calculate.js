import _ from 'lodash';
import SUITS from "./constants/suits.js"
import HAND_TYPES from "./constants/hand-types.js"
import Hand from "./hand.js"
import { nCr } from "./math.js"

const PLAYER_CARDS = 2
const COMMUNITY_CARDS = 5
const DECK_SIZE = 52

const _getCardNumbers = (cardsDrawn) => {
  return {
    toDraw: PLAYER_CARDS + COMMUNITY_CARDS - cardsDrawn,
    cardsInDeck: DECK_SIZE - cardsDrawn,
  }
}

const _combinations = (n, r) => r < 0 ? 0 : nCr(n, r)

const royalFlush = (cards) => {
  const { toDraw, cardsInDeck } = _getCardNumbers(cards.length)
  const hand = new Hand(HAND_TYPES.ROYAL_FLUSH, [14, 13, 12, 11, 10])

  Object.values(SUITS).forEach(suit => {
    const drawn = cards.filter(c => c.value >= 10 && c.suit == suit)
    const needed = 5 - drawn.length
    hand.count += _combinations(cardsInDeck - needed, toDraw - needed)
  })

  return [hand]
}

const straightFlush = (cards) => {
  const { toDraw, cardsInDeck } = _getCardNumbers(cards.length)
  const hands = []

  const isCardInStraightFlush = (card, flushHighCard, suit) => {
    let value = (flushHighCard == 5 && card.value == 14) ? 1 : card.value
    return card.suit == suit && value <= flushHighCard && value >= flushHighCard - 4
  }
 
  for (let highCard = 5; highCard < 14; highCard++) {
    const hand = new Hand(HAND_TYPES.STRAIGHT_FLUSH, _.range(highCard, highCard - 5, -1))
    hands.push(hand)

    Object.values(SUITS).forEach(suit => {
      const drawn = cards.filter(c => isCardInStraightFlush(c, highCard, suit))
      const cardForHigherStraight = cards.find(c => c.value == highCard + 1 && c.suit == suit)
      if (cardForHigherStraight) {
        return
      }
      const needed = 5 - drawn.length
      hand.count += _combinations(cardsInDeck - 1 - needed, toDraw - needed)
    })
  }

  return hands
}

export { royalFlush, straightFlush }