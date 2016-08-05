/* $(document).ready(function(){
  jQuery("#helpbtn").on("clickText", function() {
    jQuery("#scoreDiv").hide();
    jQuery("#creditsDiv").hide();
    jQuery("#helpDiv").show();
  });
} */

// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var width = 790;
var height = 400;
var gameSpeed = 200;
var gameGravity = 200;
var jumpPower = 200;
var gapSize = 200;
var gapMargin = 50;
var blockHeight = 50;
var pipeEndHeight;
var pipeEndExtraWidth;
var balloons = [];
var weights = [];
var splashDisplay;
var stars = [];
var greeting = { language: "English", first: "Hello", last: "Goodbye"};
var labelScore;

var easyMode = {
    pipeInterval: 8 * Phaser.Timer.SECOND,
    gameSpeed: 150,
    gameGravity: 200,
    gapSize: 150
};
var normalMode = {
    pipeInterval: 2 * Phaser.Timer.SECOND,
    gameSpeed: 200,
    gameGravity: 200,
    gapSize: 100
};

var modes = {
    easy: easyMode,
    normal: normalMode
};

var easyTag;
var normalTag;

var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);


var score1 = 0;
var score2 = 0;
var player1;
var player2;
var gapStart = game.rnd.integerInRange(1, 5);
var pipes = [];
var score = 0;
if (score < 1) {
  score += 1;
}
if (score >= 1) {
  score += 2;
}
var pipeInterval = 0.5 * Phaser.Timer.SECOND;


/*
 * Loads all resources for the game and gives them names.
 */


function preload() {
game.load.image("playerImg", "../assets/jamesBond.gif");
game.load.audio("scoreSound", "../assets/point.ogg");
game.load.image("player1Img","../assets/flappy.png");
//game.load.image("player2Img","../assets/jamesBond.gif");
game.load.image("pipeBlock","../assets/pipe.png");
game.load.image("back","../assets/grasshill.jpg");
game.load.image("balloons","../assets/balloons.png");
game.load.image("weight","../assets/weight.png");
game.load.image("bg", "../assets/MyAwesomeBackGround.jpeg");
game.load.image("star", "../assets/star.png");
game.load.image("easy", "../assets/easy.png");
game.load.image("normal", "../assets/normal.png");


}

function clickHandler(event) {
  game.sound.play("scoreSound");
    //alert("Click!");
}

//clickText
function clickText(event) {
  console.log("clickText");
  $(document).ready(function(){
    console.log(event.x);
    console.log(event.y);
  if(event.x >= 100 && event.x <= 650 && event.y >= 80 && event.y <= 130){
    jQuery("#scoreDiv").hide();
    jQuery("#creditsDiv").hide();
    jQuery("#helpDiv").show();
  }
});
}

function spaceHandler() {
game.sound.play("scoreSound");}

/*
 * Initialises the game. This function is only called once.
 */
function changeScore(add) {
//  alert(score1);
  score1 = score1 + add;
	labelScore.setText(score1.toString());
}

function moveRight() {
	//player.x = playerImg.x + 1;
}

function movePlayer1Up() {
	player1.y = player1.y - 50;
}

function movePlayer2Up() {
player2.x = player2.x + 10;
}

function generatePipe() {
    var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

    for(var y = gapStart; y > 0; y -= blockHeight){
        addPipeBlock(width, y - blockHeight);
    }
    for(y = gapStart + gapSize; y < height; y += blockHeight) {
        addPipeBlock(width, y);
    }
    changeScore(1);
}

function addPipeBlock(x, y) {
    // create a new pipe block
    var pipeBlock = game.add.sprite(x,y,"pipeBlock");
      pipes.push(pipeBlock);
      game.physics.arcade.enable(pipeBlock);
      pipeBlock.body.velocity.x = -gameSpeed;
}
/*
 * This function updates the scene. It is called for every new frame.
 */

//Place Pipe Ending
 function addPipeEnd() {
    var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart - pipeEndHeight);
    for(var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
        addPipeBlock(width, y - blockHeight);
    }

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
    for(y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
        addPipeBlock(width, y);
    }

    changeScore(1);
}

 function update() {
     game.physics.arcade.overlap(player1,pipes,gameOver);
     checkBonus(balloons, -50);
checkBonus(weights, 50);

if(typeof easyTag != "undefined" && easyTag.game != null){
game.physics.arcade.overlap(player1,easyTag, function(){
        easyTag.destroy();
        normalTag.destroy();
        setMode(modes.easy);
        game.time.events.loop(pipeInterval, generate);
    });
  }

  if(typeof normalTag != "undefined" && normalTag.game != null){
  game.physics.arcade.overlap(player1,normalTag, function(){
          easyTag.destroy();
          normalTag.destroy();
          setMode(modes.normal);
          game.time.events.loop(pipeInterval, generate);
      });
    }

     //Bird rotation
     // player1.rotation = Math.atan(player1.body.velocity.y / gameSpeed);
     //if(player1.body.y < 0 || player1.body.y > 400){
  //  gameOver();
//}

/*OpeningSeq
function clickHere(event) {
    alert("Click!");
} */

 }

 function gameOver() {

   registerScore(score);
   game.state.restart();
   gameGravity = 200;
   star=[];
 }



function player1_initialisation(){
  player1 = game.add.sprite(100, 200, "player1Img");
  game.physics.arcade.enable(player1);
  //Flapp Bird Anchor Head
      player1.anchor.setTo(0.5, 0.5);

}

function player1Jump() {
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(function () {
      player1.body.velocity.y = - jumpPower;
  });
}

function changeGravity(g) {
    gameGravity += g;
    player1.body.gravity.y = gameGravity;
}

function generateBalloons(){
    var bonus = game.add.sprite(width, height, "balloons");
    balloons.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 200;
    bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
}

function generate() {
    var diceRoll = game.rnd.integerInRange(1, 7);
    if(diceRoll==1) {
        generateBalloons();
    } else if(diceRoll==2) {
        generateWeight();
    } else if(diceRoll == 2){
      generateStars();
    }else{
        generatePipe();
    }
}

function generateWeight(){
    var bonus = game.add.sprite(width, height, "weight");
    weights.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 200;
    bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
}

function checkBonus(bonusArray, bonusEffect) {
    for(var i = bonusArray.length - 1; i >= 0; i--){
        game.physics.arcade.overlap(player1, bonusArray[i], function(){
            changeGravity(bonusEffect);
            changeScore(5);
            bonusArray[i].destroy();
            bonusArray.splice(i,1);
        });
    }
}

function start(){
var background = game.add.image(0,0,"back");
player1_initialisation();
background.width=790;
background.height=400;
game.add.text(260, 60, "Welcome to the mixed reality world game",{font: "20px Arial", fill:"#ffffff"});
//  game.add.sprite(300, 270, "playerImg");
//  game.input.keyboard.SPACEBAR.add(clickHandler);
game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(player1Jump);
  // set the background colour of the scene
  game.input.onDown.add(clickHandler);
  labelScore = game.add.text(20, 20, "0");
  changeScore(1);
  game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(spaceHandler);

  //alert(score);
//    player = game.add.sprite(100, 200, "playerImg");
  game.input.keyboard.addKey(Phaser.Keyboard.UP)
                 .onDown.add(moveRight);

  var gameGravity = 200;
  game.input.keyboard.addKey(Phaser.Keyboard.W)
                     .onDown.add(movePlayer2Up);
  /* game.time.events.loop(
     pipeInterval,
     generate
   ); */
   easyTag = game.add.sprite(350, 100, "easy");
    game.physics.arcade.enable(easyTag);
    easyTag.body.velocity.x = - gameSpeed;
    normalTag = game.add.sprite(350, 300, "normal");
    game.physics.arcade.enable(normalTag);
    normalTag.body.velocity.x = - gameSpeed;

  game.input.keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(movePlayer1Up);
                   // player1.body.velocity.y = 100;
                   //player1.body.velocity.x = 100;
                   //  player1.body.gravity.x = 800;
  player1.body.gravity.y = 500;
//background
  splashDisplay.destroy();

}
function create() {
    //    player1 = game.add.sprite(150, 200, "player1Img");
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
                       .onDown.add(start);
                       splashDisplay = game.add.text(100,200, "Press ENTER to start, SPACEBAR to jump");
//background
                       var backgroungVelocity = gameSpeed / 10;
                       var backgroundSprite = game.add.tileSprite(0, 0, width, height, "bg");
                       //instruction
                       console.log("create");
                       game.input.onDown.add (clickText);
                       game.add.text( 110, 80, "Press here to see the game instructions",{font: "30px Arial", fill:"#ffffff"});
                       game.add.text( 160, 130, "Once ready, press Enter to start",{font: "30px Arial", fill:"#ffffff"});




             backgroundSprite.autoScroll(-backgroungVelocity, 0);
    //game mode
    setMode(modes.normal);
    /* game.input.onDown.add(clickHere); */

}
function generateStars(){
   var bonus = game.add.sprite(width, height, "star");
   stars.push(bonus);
   game.physics.arcade.enable(bonus);
   bonus.body.velocity.x = - 200;
   bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
}


//Level mode
function setMode(mode) {
    pipeInterval = mode.pipeInterval;
    gameSpeed = mode.gameSpeed;
    gameGravity = mode.gameGravity;
    gapSize = mode.gapSize;
}
