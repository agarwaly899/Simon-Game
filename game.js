var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var toggle = true;

function newSequence(){
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var random = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[random];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function(){

  var userChosenColor = this.id;

  playSound(userChosenColor);

  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);

  console.log(userClickedPattern);
});

$(document).keypress(function() {
  if(toggle == true){
    toggle = false;
    newSequence();
  }
});

function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        newSequence();
      }, 1000);

    }

  }
  else {

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {$("body").removeClass("game-over")}, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userClickedPattern = [];
    level = 0;

    toggle = true;
  }
}

function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {$("#"+currentColor).removeClass("pressed")}, 70);
}
