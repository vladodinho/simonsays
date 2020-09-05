let level = 0;
let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ['red', 'blue', 'green', 'yellow'];
let gameIsStarted = false;

$(document).keydown(function() {
    if (!gameIsStarted) {
        $('h1').text(`Level ${level}`);
        nextSequence();
        gameIsStarted = true;
    }
});

$('.btn').click(function() {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log('success');
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);
        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
        console.log('wrong');
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1').text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function () {
        $(`#${currentColour}`).removeClass('pressed')
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameIsStarted = false;
}