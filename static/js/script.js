function ageindays() {
    var birthyear = parseInt(prompt("what is your birth year"));
    var days = (2021 - birthyear) * 365;

    document.getElementById("ageindays").innerText = 'You are ' + days + ' days old.';
}

function reset() {
    document.getElementById('ageindays').remove();
    // document.getElementById('ageindays').innerText = null;
}

function generateCat() {
    var image = document.createElement('img');
    console.log(image);
    var div = document.getElementById('flex-cat-gen');
    console.log(div);
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
    console.log(div.appendChild(image));
}


function rpsGame(yourChoice) {
    var humanChoice = yourChoice.id;
    var botChoice = numberToChoice(randomRpsInt());
    var result = decideWinner(humanChoice, botChoice);
    var message = finalMessage(result);
    rpsFrontEnd(humanChoice, botChoice, message);
}

function randomRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number]
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        "rock": {
            "rock": 0.5,
            "paper": 0,
            "scissors": 1
        },
        "paper": {
            "paper": 0.5,
            "rock": 1,
            "scissors": 0
        },
        "scissors": {
            "paper": 1,
            "rock": 0,
            "scissors": 0.5
        },
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {
            "message": "You Lost",
            'color': "red"
        }
    } else if (yourScore === 0.5) {
        return {
            "message": "You tied",
            "color": "yellow"
        }
    } else {
        return {
            "message": "You Won",
            "color": "green"
        }
    }
}

function rpsFrontEnd(humanImagechoice, botImagechoice, finalMessage) {
    var imageDatabase = {
        "rock": document.getElementById('rock').src,
        "paper": document.getElementById('paper').src,
        "scissors": document.getElementById('scissors').src,
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humandiv = document.createElement('div');
    var botdiv = document.createElement('div');
    var messagediv = document.createElement('div');

    humandiv.innerHTML = "<img src='" + imageDatabase[humanImagechoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37, 50, 233, 1);'>"
    messagediv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size:60px; padding:30px;'>" + finalMessage['message'] + "</h1>";
    botdiv.innerHTML = "<img src='" + imageDatabase[botImagechoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(243, 38, 24, 1);'>"

    document.getElementById("flex-box-rps-div").appendChild(humandiv);
    document.getElementById("flex-box-rps-div").appendChild(messagediv);
    document.getElementById("flex-box-rps-div").appendChild(botdiv);
}

var all_buttons = document.getElementsByTagName("button");
var copyAllButtons = [];

for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonthingy) {
    if (buttonthingy.value === 'red') {
        buttonRed();
    } else if (buttonthingy.value === 'green') {
        buttonGreen();
    } else if (buttonthingy.value === 'reset') {
        buttonColorreset();
    } else if (buttonthingy.value === 'random') {
        randomColors();
    }
}

function buttonRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');

    }
}

function buttonGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');

    }
}

function buttonColorreset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(copyAllButtons[i])
    }
}

function randomColors() {
    let choices = ['btn-danger', 'btn-success', 'btn-warning', 'btn-primary'];

    for (let i = 0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

// challenge 5
let blackjackGame = {
    'you': {
        'scoreSpan': '#your-blackjack-result',
        'div': '#your-box',
        'score': 0,
    },
    'dealer': {
        'scoreSpan': '#dealer-blackjack-result',
        'div': '#dealer-box',
        'score': 0,
    },

    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap': {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'K': 10,
        'J': 10,
        'Q': 10,
        'A': [1, 11]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,

}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winsound = new Audio('static/sounds/cash.mp3')
const losssound = new Audio('static/sounds/aww.mp3')


document.querySelector("#blackjack-hit-button").addEventListener('click', blackjackhit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerlogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackdeal);

function blackjackhit() {
    let card = randomcard();
    showcard(card, YOU);
    updatescore(card, YOU);
    showscore(YOU);
}

function randomcard() {
    let randomindex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomindex];
}

function showcard(card, activeplayer) {
    if (activeplayer['score'] <= 21) {
        hitSound.play();
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activeplayer['div']).appendChild(cardImage);
    }
}

function blackjackdeal() {
    // showresult(computewinner());
    let yourimages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerimages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i = 0; i < yourimages.length; i++) {
        yourimages[i].remove();
    }

    for (i = 0; i < dealerimages.length; i++) {
        dealerimages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = 'white';
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').style.color = 'white';
    document.querySelector('#blackjack-result').textContent = "Let's play";
    document.querySelector('#blackjack-result').style.color = "black";


}

function updatescore(card, activeplayer) {
    if (card === 'A') {
        // if adding 11 keeps be below 21 then add 11 otherwise add 1
        if (activeplayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activeplayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activeplayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activeplayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showscore(activeplayer) {
    if (activeplayer['score'] > 21) {
        document.querySelector(activeplayer['scoreSpan']).textContent = 'BUSTED!';
        document.querySelector(activeplayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activeplayer['scoreSpan']).textContent = activeplayer['score'];
    }
}

function dealerlogic() {
    let card = randomcard();
    showcard(card, DEALER);
    updatescore(card, DEALER);
    showscore(DEALER);

    if (DEALER['score'] > 15) {
        let winner = computewinner();
        showresult(winner);
    }
}

//compute winner and return who just won
//update the wins,draws,losses
function computewinner() {
    let winner;
    if (YOU['score'] <= 21) {
        //condition: high score than dealer or when dealer busts
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
        //condition: when user busts but dealer doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;
        //when you ad dealer busts
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    // console.log(blackjackGame);
    return winner
}

function showresult(winner) {
    let message, messagecolor;

    if (winner === YOU) {
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = "You Won!";
        messagecolor = 'green';
        winsound.play();
    } else if (winner === DEALER) {
        document.querySelector("#losses").textContent = blackjackGame['losses'];
        message = "You Lost";
        messagecolor = 'red';
        losssound.play();
    } else {
        document.querySelector("#draws").textContent = blackjackGame['draws'];
        message = 'You Drew';
        messagecolor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messagecolor;

}