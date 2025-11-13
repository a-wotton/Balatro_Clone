const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const deck = []

suits.forEach (suit => {
    values.forEach(value => {
    const cardImg = `../images/cards/${value}_${suit}.png`
    deck.push({suit, value, cardImg});
    })
})

export default deck;