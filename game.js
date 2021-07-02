var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userSelectedPattern = [];
var hasGameStarted = false;
var level = 0;
$(".btn").click(function(event) {
    var userChoosenColor = this.id;
    userSelectedPattern.push(userChoosenColor);
    console.log("UserSelectedPattern: " + userSelectedPattern);
    console.log("GamePattern: " + gamePattern);
    playSound("sounds/" + userChoosenColor + ".mp3");
    animatePress(userChoosenColor);
    checkAnswer(userSelectedPattern.length - 1);
});












$(document).keypress(function(event){
    if(!hasGameStarted){
        newSequence();
        hasGameStarted = true;
    }
});

$("#level-title").click(function(){
    if(!hasGameStarted){
        newSequence();
        hasGameStarted = true;
    }
});







function startOver(){
    gamePattern = [];
    hasGameStarted = false;
    level = 0;
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userSelectedPattern[currentLevel]){
        if(gamePattern.length === userSelectedPattern.length){
            setTimeout(function(){
                console.log("Correct");
                newSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 100);
        $("#level-title").text("Game Over. Press any key to restart.");
        startOver();
    }
}

function newSequence(){
    userSelectedPattern = [];
    var random = (Math.floor(Math.random() * 4));
    var randomChoosenColor = buttonColors[random];
    gamePattern.push(randomChoosenColor);
    $("." + randomChoosenColor).fadeOut(500).fadeIn(500);
    playSound("sounds/" + randomChoosenColor + ".mp3");
    level++;
    $("#level-title").text("Level " + level);
}

function playSound(name){
    var audio = new Audio(name);
    audio.play();
}

function animatePress(id){
    $("#" + id).addClass("pressed");
    setInterval(function (){
        $("#" + id).removeClass("pressed");
    }, 100);
}