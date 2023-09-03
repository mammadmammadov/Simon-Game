var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$("h1").text("Press Non-button Area to Start");

// animation while pressing buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}

var level = 0;
let hasStarted = false;
var startAgainTime = 0;

$(document).click(function () {
  if(!hasStarted){
    hasStarted = true;
    nextSequence();
  }
});

// random color appearing on UI
function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + ++level);
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  animatePress(userChosenColor);
});

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  hasStarted = false;
}

function checkAnswer(currentLevel) {
  let cnt = 0;

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

    startAgainTime = 500/level;
    
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
        nextSequence()
      },startAgainTime);
    }

  } else {
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over. Press Non-button Area to Start!");

    

    setTimeout(function(){
      startOver();
    }, 2000);
  }
}
