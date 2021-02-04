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
    // console.log(yourChoice);
    var humanChoice = yourChoice.id;
    var botChoice = numberToChoice(randomRpsInt());
    // console.log(botChoice);
    var result = decideWinner(humanChoice, botChoice);
    // console.log(result);
    var message = finalMessage(result);
    console.log(message);

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

    humandiv.innerHTML = "<img src='" +imageDatabase[humanImagechoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37, 50, 233, 1);'>"
    messagediv.innerHTML = "<h1 style='color:"+ finalMessage['color'] +"; font-size:60px; padding:30px;'>"+ finalMessage['message'] + "</h1>";
    botdiv.innerHTML = "<img src='" +imageDatabase[botImagechoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(243, 38, 24, 1);'>"
    
    document.getElementById("flex-box-rps-div").appendChild(humandiv);
    document.getElementById("flex-box-rps-div").appendChild(messagediv);
    document.getElementById("flex-box-rps-div").appendChild(botdiv);
}