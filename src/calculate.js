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

const fourOfAKind = (cards) => {
  const { toDraw } = _getCardNumbers(cards.length)
  const hands = []

  const _getCombinations = (foursNeeded, kickersNeeded, kickersDrawn, othersNeeded, othersDrawn, otherPossibleValues, toDraw) => {
    const cardsNeeded = foursNeeded + kickersNeeded + othersNeeded
    if (cardsNeeded > toDraw) {
      return 0
    }
    if (otherPossibleValues == 0 && othersNeeded > 0) {
      return 0
    }
    let combinations = kickersNeeded ? _combinations(4 - kickersDrawn, kickersNeeded) : 1    
    combinations *= othersNeeded ? _combinations(otherPossibleValues * 4 - othersDrawn, othersNeeded) : 1
    return combinations
  }

  for (let fours = 2; fours < 15; fours++) {
    const foursDrawn = cards.filter(c => c.value == fours)
    const foursNeeded = 4 - foursDrawn.length

      for (let kicker = 2; kicker < 15; kicker++) {
        const hand = new Hand(
          HAND_TYPES.FOUR_OF_A_KIND, 
          [fours, fours, fours, fours, kicker]
        )

        if (kicker == fours) {
          continue
        }

        hands.push(hand)

        const kickersDrawn = cards.filter(c => c.value == kicker).length
        const othersDrawn = cards.filter(c => c.value < kicker && c.value != fours).length

        const otherPossibleValues = fours < kicker ? kicker - 3 : kicker - 2
        let kickersNeeded = 0
        let othersNeeded = 0

        // 3x kickers
        kickersNeeded = 3 - kickersDrawn
        hand.count += _getCombinations(foursNeeded, kickersNeeded, kickersDrawn, othersNeeded, othersDrawn, otherPossibleValues, toDraw)

        // 2x kickers, 1x other
        kickersNeeded = 2 - kickersDrawn
        othersNeeded = 1 - othersDrawn
        hand.count += _getCombinations(foursNeeded, kickersNeeded, kickersDrawn, othersNeeded, othersDrawn, otherPossibleValues, toDraw)

        // 1x kicker, 2x others
        kickersNeeded = 1 - kickersDrawn
        othersNeeded = 2 - othersDrawn
        hand.count += _getCombinations(foursNeeded, kickersNeeded, kickersDrawn, othersNeeded, othersDrawn, otherPossibleValues, toDraw)
    }
  }

  return hands
}

export { royalFlush, straightFlush, fourOfAKind }