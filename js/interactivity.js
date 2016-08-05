$(document).ready(function(){

  jQuery("#scoreDiv").hide();
  jQuery("#creditsDiv").hide();
  jQuery("#helpDiv").hide();


  jQuery("#scoresbtn").on("click", function() {
     jQuery("#scoreDiv").show();
     jQuery("#creditsDiv").hide();
     jQuery("#helpDiv").hide();
  });

  jQuery("#creditsDiv").append(
      "<div>" + "Game created by @sharonoh2 in 2016!" + "</div>"
  );
  jQuery("#helpDiv").append(
      "<ul>"+ "<li>" + "Press ENTER to start the game" + "</li>"+ "<li>" + "Press SPACE to jump up and down" + "</li>"+ "</ul>" +
      "<ul>"+ "<li>" + "Press SPACE to flap your wings" + "</li>"+ "<li>" + "Avoid the incoming pile of work that is ahead of you" + "</li>"+ "</ul>" +
      "<ul>"+ "<li>" + "Hit the Money bag and ballons to get extra points" + "</li>"+ "<li>" + "One last thing, happy GoPoke!" + "</li>"+ "</ul>"

  );

  jQuery("#creditsbtn").on("click", function() {
    jQuery("#scoreDiv").hide();
    jQuery("#creditsDiv").show();
    jQuery("#helpDiv").hide();
  });

  jQuery("#helpbtn").on("click", function() {
    jQuery("#scoreDiv").hide();
    jQuery("#creditsDiv").hide();
    jQuery("#helpDiv").show();
  });
  jQuery("#board5").on("click", function() {
      var message = "Click the buttons below!";
      alert(message);
  });

  jQuery("#sharing").on("click", function(){
    var text =
        "I found the game created by @sharonoh2 and I scored " +
        score1.toString() +
        " in her Flappy Birdy! Can you do better?";
    var escapedText = encodeURIComponent(text);
    var url =
        "https:twitter.com/share?text=" + escapedText;
    jQuery("#sharing").attr("href", url);
});

});


function registerScore()
{
var playerName = prompt("What's your name?");
var scoreEntry = "<li>" + playerName + ":" + score1.toString() + "</li>";
jQuery("#scoreDiv").append(
    "<ul>" + scoreEntry + "</ul>"
);
   score1 = 0;


   game.state.restart();
}
