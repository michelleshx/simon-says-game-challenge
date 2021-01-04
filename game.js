
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Plays sound
function playSound(name) {
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}

// Animates press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

// Restarts the game
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

// Detect when keyboard key is pressed
$(document).keypress(function(event) {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

// Checks which colour is pressed
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Generates next colour
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

// Checks answer
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

    if (currentLevel == gamePattern.length-1) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }

  }

  else {
    var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}
