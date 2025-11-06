let mult = 0;
let points = 0;
let total = 0;

function handleScore(cards, pointsDisplay) {
    points = cards.reduce((accumulator, card) => accumulator + card.value, 0);
    pointsDisplay.textContent = points.toString();
}

export function playHand(totalDisplay) {
    total = mult * points;
    totalDisplay.textContent = total;
}

export function checkHigh(played, text, multDisplay, pointsDisplay) {
    if(played.length == 1) {
        console.log("High Card is played");
        text.textContent = "High Card";
        mult = 1;
        multDisplay.textContent = mult;
    }
    handleScore(played, pointsDisplay);
}

export function checkPair(played, text, multDisplay) {
    if(played.length == 2 && played[0].value == played[1].value) {
        console.log("Pair is played");
        text.textContent = "Pair";
        mult = 1.5;
        multDisplay.textContent = mult;
    }
}

export function checkThree(played, text, multDisplay) {
    if(played.length == 3 && played.every(card => card.value == played[0].value)) {
        console.log("Three of a Kind is played");
        text.textContent = "Three of a Kind";
        mult = 2.5;
        multDisplay.textContent = mult;
    }
}

export function checkFour(played, text, multDisplay) {
    if(played.length == 4 && played.every(card => card.value == played[0].value)) {
        console.log("Four of a Kind is played");
        text.textContent = "Four of a Kind";
        mult = 3.5;
        multDisplay = mult;
    } else if(played.length == 4 && played[0].value == played[1].value && played[2].value == played[3].value) {
        console.log("Two Pair is played");
        text.textContent = "Two Pair";
        mult = 2;
        multDisplay.textContent = mult;
    }
}

export function checkFullHouse(played, text, multDisplay) {
    if(played.length < 5) {
        return;
    }
    const isFullHouse = (played[0].value == played[1].value && played[0].value == played[2].value && played[3].value == played[4].value) ||
                        (played[0].value == played[1].value && played[2].value == played[3].value && played[3].value == played[4].value);
    if(isFullHouse) {
        console.log("Full House is played");
        text.textContent = "Full House";
        mult = 3;
        multDisplay.textContent = mult;
    }
}

export function checkFlush(played, text, multDisplay) {
    if(played.length < 5) {
        return;
    }
    const isFlush = played.every(card => card.suit == played[0].suit);
    const isStraight = played[1].value == played[0].value - 1 && played[2].value == played[1].value -1 && played[3].value == played[2].value - 1 && played[4].value == played[3].value -1;
    const isRoyal = played[0].value == 13 && played[1].value == 12 && played[2].value == 11 && played[3].value == 10 && played[4].value == 1;
    if(isFlush && isRoyal) {
        console.log("Royal Flush is Played");
        text.textContent = "Royal Flush";
        mult = 5;
        multDisplay.textContent = mult;
    } else if(isFlush && isStraight) {
        console.log("Straight Flush is played");
        text.textContent = "Straight Flush";
        mult = 4;
        multDisplay.textContent = mult;
    } else if(isStraight) {
        console.log("Straight is played");
        text.textContent = "Straight";
        mult = 2.5;
        multDisplay.textContent = mult;
    } else if(isFlush) {
        console.log("Flush is played");
        text.textContent = "Flush";
        mult = 2;
        multDisplay.textContent = mult;
    }
}