import cards from "./cards.js";
import * as handFunctions from "./hands.js";

const playButton = document.querySelector('#play-button');
const discardButton = document.querySelector('#discard-button')
const multDisplay = document.querySelector('#mult');
const pointsDisplay = document.querySelector('#points');
const totalDisplay = document.querySelector('#total');
const deckLength = document.querySelector('#deck-length');
const played = [];
const hand = [];
const discarded = [];
const removed = [];
const handArea = document.querySelector('#hand-area');
const playArea = document.querySelector('#play-area');
const discardArea = document.querySelector('#discard-area')
const handType = document.querySelector('#hand-type');
let cardX = 0, cardY = 0, lastX = 0, lastY = 0;
let isDragged = false;
let isOver = false;
let isOverDiscard = false;
let suit = '';
let value = '';  
let movedCard = '';

function startGame() {
    handleDraw();
    // Creates a list item for each card that is moved to the hand
    populateHTML(hand, handArea);
    startButton.classList.add('hidden');
}

function populateHTML(cardArray, area) {
    cardArray.forEach(card => {
        const cardElement = document.createElement('li');
        const cardImage = document.createElement('img');
        cardElement.classList.add('card');
        cardElement.dataset.suit = card.suit
        cardElement.dataset.value = card.value
        cardImage.src = card.cardImg;
        cardImage.alt = `${card.value} of ${card.suit}`;
        cardImage.draggable = false;
        cardElement.appendChild(cardImage);
        area.appendChild(cardElement);
    })
    handleReset();
    checkHand();
}

function handleDraw() {
    // Takes an amount of cards from the deck using a random index and places them in the hand
    while(hand.length < 8) {
    const randomCard = Math.floor(Math.random() * (cards.length));
    const removedCard = cards.splice(randomCard, 1);
    hand.push(removedCard[0]);
}
  // Sorts the cards in hand in descending order
    hand.sort((a, b) => b.value - a.value);
    deckLength.textContent = `${cards.length}/52`;
}

function handleReset () {
     if (played.length > 0) {
        playButton.classList.remove('hidden');
    } else {
        playButton.classList.add('hidden');
    }
     if (discarded.length > 0) {
        discardButton.classList.remove('hidden');
     } else {
        discardButton.classList.add('hidden');
     }
    handType.textContent="Hand Type";
    played.length > 0 ? handType.textContent="High Card" : handType.textContent = "Hand Type";
}

function grab(e) {
    // Takes the parent of the selected object. Image is selected but we want the list item it resides in
    const selectedCard = e.target.parentNode;
    // Uses the HTML objects dataset in order to globally track its array counterpart
    suit = selectedCard.dataset.suit;
    value = selectedCard.dataset.value;
    movedCard = selectedCard;
    // Sets up the visual aspect of the drag and drop
    lastX = e.clientX;
    lastY = e.clientY;
    isDragged = true;
}

function drag(e) {
    if(isDragged) {
        cardX = lastX - e.clientX;
        cardY = lastY - e.clientY;
        movedCard.style.position = 'absolute';
        movedCard.style.zIndex = 10;
        movedCard.style.left = lastX + 'px';
        movedCard.style.top = lastY + 'px';
        lastX = e.clientX;
        lastY = e.clientY;
    }
}

function drop() {
    // isOver is in the event listener for the playArea. The if statement ensures that this part of the function only activates if the drop is performed over the playArea
    if(isOver && isDragged == true && played.length < 5) {
        // Finds the array element that matches both the suit and the value of the card we selected using the dataset of the HTML list item. It is then transferred to the played array
        const droppedCard = hand.findIndex(card => card.suit == suit && card.value == value);
        const removedCard = hand.splice(droppedCard, 1);
        played.push(removedCard[0]);
        played.sort((a, b) => b.value - a.value);
        playArea.innerHTML = "";
        handArea.innerHTML = "";
        discardArea.innerHTML = "";
        populateHTML(played, playArea);
        populateHTML(hand, handArea);
        populateHTML(discarded, discardArea);
        // The elseif handles discards rather than plays
    } else if(isOverDiscard && isDragged == true && discarded.length < 5 && played.length == 0) {
        const droppedCard = hand.findIndex(card => card.suit == suit && card.value == value);
        const removedCard = hand.splice(droppedCard, 1);
        discarded.push(removedCard[0]);
        discarded.sort((a, b) => b.value - a.value);
        playArea.innerHTML = "";
        handArea.innerHTML = "";
        discardArea.innerHTML = "";
        populateHTML(played, playArea);
        populateHTML(hand, handArea);
        populateHTML(discarded, discardArea);
    } else {
        // This quickly resets the hand when a card is dropped outside the play area, allowing the cards to realign properly
        setTimeout(() => {
            playArea.innerHTML = "";
            handArea.innerHTML = "";
            discardArea.innerHTML = "";
            populateHTML(played, playArea);
            populateHTML(hand, handArea);
            populateHTML(discarded, discardArea);
        }, 10);
    }
        if(movedCard) {
    movedCard.style.left = 0 + 'px';
    movedCard.style.top = 0;
    movedCard.style.zIndex = 0;
    movedCard.style.position = 'static';
    isDragged = false;
}
}

function removePlayed(e, removedFrom) {
    const cardToRemove = e.target.parentNode;
    suit = cardToRemove.dataset.suit;
    value = cardToRemove.dataset.value;
    const removalIndex = removedFrom.findIndex(card => card.suit == suit && card.value == value);
    // This if statement prevents the function from running if the unordered list is selected (its index happens to be -1)
    if(removalIndex == -1) {
        return;
    }
    const removedCard = removedFrom.splice(removalIndex, 1);
    hand.push(removedCard[0]);
    hand.sort((a, b) => b.value - a.value);
    removedFrom.sort((a, b) => b.value - a.value);
    playArea.innerHTML = "";
    handArea.innerHTML = "";
    discardArea.innerHTML = "";
    populateHTML(played, playArea);
    populateHTML(hand, handArea);
    populateHTML(discarded, discardArea);
    if(played.length == 0) {
        multDisplay.textContent = 0;
    }
}

function checkHand() {
    handFunctions.checkHigh(played, handType, multDisplay, pointsDisplay);
    handFunctions.checkPair(played, handType, multDisplay, pointsDisplay); 
    handFunctions.checkThree(played, handType, multDisplay, pointsDisplay);
    handFunctions.checkFour(played, handType, multDisplay, pointsDisplay);
    handFunctions.checkFullHouse(played, handType, multDisplay, pointsDisplay);
    handFunctions.checkFlush(played, handType, multDisplay, pointsDisplay); 
    handFunctions.handlePoints(played, pointsDisplay);
}

function handleRemove(array) {
    removed.push(...array);
    array.splice(0, 5);
    handleDraw();
    populateHTML(played, playArea);
    populateHTML(hand, handArea);
    populateHTML(discarded, discardArea);
}

function handlePlay() {
    handFunctions.handleScore(played, totalDisplay);
}

window.addEventListener('load', startGame);
handArea.addEventListener('mousedown', grab);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', drop);
playArea.addEventListener('mouseenter', () => {isOver = true;});
playArea.addEventListener('mouseleave', () => {isOver = false;});
playArea.addEventListener('click', (e) => {removePlayed(e, played)});
discardArea.addEventListener('mouseenter', () => {isOverDiscard = true;});
discardArea.addEventListener('mouseleave', () => {isOverDiscard = false;});
discardArea.addEventListener('click', (e) => {removePlayed(e, discarded)});
playButton.addEventListener('click', handlePlay);
discardButton.addEventListener('click', () => {handleRemove(discarded)});

export default played;