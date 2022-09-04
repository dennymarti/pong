const countdownMenu = document.querySelector("#countdownMenu");
const pong = document.querySelector("#pong");
const playerPaddle = document.querySelector("#playerPaddle");
const computerPaddle = document.querySelector("#computerPaddle");
const ball = document.querySelector("#ball");
const gameMenu = document.querySelector("#gameMenu");

let countdown = document.querySelector("#countdown");
let counter;

let playerScore = 0;
let computerScore = 0;

var gameRunning = false;

let pitchHeight = 500;
let pitchWidth = 800;

let paddleHeight = 140;
let paddleWidth = 14;

let ballX = 380;
let ballY = 230;
let ballWidth = 40;
let ballSpeedX = 2;
let ballSpeedY = 1;

let playerPaddleY = 180;
let computerPaddleY = 180;

let keyUp = false;
let keyDown = false;

let localizeBall = true;

var countdownInterval;
var updateInterval;

function changePage(page) {
    window.location.href = page;
}

function showMenu(menu) {
    document.querySelector("#" + menu).style.display = "flex";
}

function hideMenu(menu) {
    document.querySelector("#" + menu).style.display = "none";
}

function startCountdown() {
    // Spielmenü verstecken
    gameMenu.style.display = "none";

    // Coundown auf 3 Sekunden setzen
    counter = 3;

    // Countdown bereits aktualisieren
    countdown.innerHTML = counter;

    // Countdown Interval starten
    countdownInterval = window.setInterval(function() {
        if (counter !== 0) {
            counter--;
            countdown.innerHTML = counter;
        } else {
            // Countdown Interval stoppen
            window.clearInterval(countdownInterval);

            // Countdownmenü verschwinden lassen
            hideMenu('countdownMenu');

            // Spiel starten
            startGame();
        }
    }, 1000);
}

// Spiel starten
function startGame() {
    // Spiel läuft
    gameRunning = true;

    // Spielfeld einblenden
    showMenu('pong');
    pong.style.opacity = "1.0";

    // Hotkeys
    document.addEventListener("keydown", onkeydown);
    document.addEventListener("keyup", onkeyup);

    // Spiel aktualisieren
    updateInterval = window.setInterval(updateGame, 5);
}

// Spiel pausieren
function pauseGame() {
    // Hotkeys deaktivieren
    gameRunning = false;

    // Spielmenü anzeigen
    showMenu('gameMenu');

    // Interval stoppen
    window.clearInterval(updateInterval);

    // Spielfeldsichtbarkeit reduzieren
    pong.style.opacity = "0.2";

}

// Spiel beenden
function stopGame() {
    // Zur Startseite wechseln
    changePage("index.html");
}

// Spiel fortsetzen
function resumeGame() {
    // Countdown einblenden
    showMenu('countdownMenu');

    // Spiel starten
    startCountdown();
}

function updateGame() {
    if (keyUp) {
        playerPaddleY -= 1.2;
    }

    if (keyDown) {
        playerPaddleY += 1.2;
    }

    // Spielerpaddle
    if (playerPaddleY >= pitchHeight - paddleHeight) {
        playerPaddleY = pitchHeight - paddleHeight;
    }

    if (playerPaddleY <= 0) {
        playerPaddleY = 0;
    }
    playerPaddle.style.top = playerPaddleY + "px";

    // Computerpaddle
    if (localizeBall) {
        computerPaddleY = ballY - ballWidth;
    } else {
        computerPaddleY += 0.2;
    }

    if (computerPaddleY + paddleHeight >= pitchHeight) {
        computerPaddleY = pitchHeight - paddleHeight;
    }

    if (computerPaddleY <= 0) {
        computerPaddleY = 0;
    }

    computerPaddle.style.top = computerPaddleY + "px";

    // Spielball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball ausserhalb des Spielfeldes vermeiden
    if (ballX <= paddleWidth) {
        if (ballY >= playerPaddleY && ballY <= playerPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;

            // Ball Geschwindigkeit erhöhen
            ballSpeedX += 0.2;
        } else {
            // Punkte aktualisieren
            computerScore++;
            resetBall();

            // Ball Geschwindigkeit zurücksetzen
            ballSpeedX = 2;

            // Computerintelligenz zurücksetzen
            localizeBall = true;
        }
    }

    if (ballX >= pitchWidth - ballWidth - paddleWidth) {
        if (ballY >= computerPaddleY && ballY <= computerPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            // Intelligenz des Computers anpassen
            localizeBallY();

            // Ball Geschwindigkeit erhöhen
            ballSpeedX -= 0.2;
        } else {
            // Punkte aktualisieren
            playerScore++;
            resetBall();

            // Ball Geschwindigkeit zurücksetzen
            ballSpeedX = 2;

            // Computerintelligenz zurücksetzen
            localizeBall = true;
        }
    }

    if (ballY >= pitchHeight - ballWidth) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    ball.style.top = ballY + "px";
    ball.style.left = ballX + "px";

    // Punkte aktualisieren
    updateScore();
}

// Hotkeys
function onkeydown(event) {
    // Abfragen ob das Spiel läuft
    if (gameRunning) {
        switch (event.keyCode) {
            case 87:
                // W key
                keyUp = true;
                break;
            case 83:
                // S key
                keyDown = true;
                break;
            case 38:
                // Arrow key up
                keyUp = true;
                break;
            case 40:
                // Arrow key down
                keyDown = true;
                break;
            case 27:
                // Escape key
                pauseGame();
                break;
        }
    }
}

// Hotkeys
function onkeyup(event) {
    // Abfragen ob das Spiel läuft
    if (gameRunning) {
        switch (event.keyCode) {
            case 87:
                // W key
                keyUp = false;
                break;
            case 83:
                // S key
                keyDown = false;
                break;
            case 38:
                // Arrow key up
                keyUp = false;
                break;
            case 40:
                // Arrow key down
                keyDown = false;
                break;
        }
    }
}

function updateScore() {
    document.querySelector("#playerScore").innerHTML = playerScore;
    document.querySelector("#computerScore").innerHTML = computerScore;
}

function localizeBallY() {
    let random = Math.floor(Math.random() * 20) + 1;
    // 5% Wahrscheinlichkeit (100/20)
    if (random >= 19) {
        localizeBall = false;
    } else {
        localizeBall = true;
    }
}

function resetBall() {
    ballX = pitchWidth / 2;
    ballY = pitchHeight / 2;

    ball.style.top = ballY + "px";
    ball.style.left = ballX + "px";

    let xSpeed;

    // 50% wahrscheinlichkeit (100/2)
    if (Math.random() < 0.5) {
        xSpeed = 2;
    } else {
        xSpeed = -2;
    }

    ballSpeedX = xSpeed;

    let ySpeed;
    
    // 50% Wahrscheinlichkeit
    if (Math.random() < 0.5) {
        ySpeed = 1;
    } else {
        ySpeed = -1;
    }
    ballSpeedY = ySpeed;
}