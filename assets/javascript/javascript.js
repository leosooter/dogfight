$(document).ready(function() {
  console.log("JQuery has loaded");

  $(".smoke-trail").hide();


  function moveGround(){
    $("#ground").addClass('move-down');
    setTimeout(function(){
      $("#ground").removeClass('speed-on');
      $("#ground").removeClass('move-down');
      setTimeout(function(){
        $("#ground").addClass('speed-on');
        moveGround();
      },30);
    }, 2970);
  }
  moveGround();
  var missle = "<div class='missle'></div>";
  var missleCount = 0;
  var wing = 1;

  var player = {
    id : $("#player"),
    topId : $("#player-top"),
    sideId : $("#player-side"),
    life : 1,
    left : 470,
    topDeg : 0,
    sideDeg : 90,
    moveRight : function(){
      wing = -20;
      this.topDeg -= 50;
      this.sideDeg -= 50;
      player.topId.css("transform", "rotateY(" + this.topDeg + "deg)");
      player.sideId.css("transform", "rotateY(" + this.sideDeg + "deg)");
      this.left += 50;
      this.id.css("transform", "rotate(5deg)");
      this.id.css("margin-left", this.left + "px");
      setTimeout(function(){
        player.topDeg += 50;
        player.sideDeg += 50;
        player.id.css("transform", "rotate(0deg)");
        player.topId.css("transform", "rotateY(" + player.topDeg + "deg)");
        player.sideId.css("transform", "rotateY(" + player.sideDeg + "deg)");
        wing = -10;
      }, 400);
    },
    moveLeft : function(){
      wing = 20;
      this.topDeg += 50;
      this.sideDeg += 50;
      player.topId.css("transform", "rotateY(" + this.topDeg + "deg)");
      player.sideId.css("transform", "rotateY(" + this.sideDeg + "deg)");
      this.left -= 50;
      this.id.css("transform", "rotate(-5deg)");
      this.id.css("margin-left", this.left + "px");
      setTimeout(function(){
        player.topDeg -= 50;
        player.sideDeg -= 50;
        player.id.css("transform", "rotate(0deg)");
        player.topId.css("transform", "rotateY(" + player.topDeg + "deg)");
        player.sideId.css("transform", "rotateY(" + player.sideDeg + "deg)");
        wing = 10;
      }, 400);
    },
    rollRight : function(){
      wing = -150;
      this.topDeg -= 360;
      this.sideDeg -= 360;
      this.topId.css("transform", "rotateY(" + this.topDeg + "deg)");
      this.sideId.css("transform", "rotateY(" + this.sideDeg + "deg)");
      this.left += 200;
      this.id.css("transform", "rotate(10deg)");
      this.id.css("margin-left", this.left + "px");
      setTimeout(function(){
        player.id.css("transform", "rotate(0deg)");
        wing = -10;
      }, 400);
    },
    rollLeft : function(){
      wing = 150;
      this.topDeg += 360;
      this.sideDeg += 360;
      this.topId.css("transform", "rotateY(" + this.topDeg + "deg)");
      this.sideId.css("transform", "rotateY(" + this.sideDeg + "deg)");
      this.left -= 200;
      this.id.css("transform", "rotate(-10deg)");
      this.id.css("margin-left", this.left + "px");
      setTimeout(function(){
        player.id.css("transform", "rotate(0deg)");
        wing = 10;
      }, 400);
    },
  };

  player.id.click(function(){
    if(player.life < 4){
      $("#player-smoke-" + player.life).show();
      player.life += 1;
    }
    else{
      endGame();
    }
  });
  function endGame(){
    console.log("endGame");
    player.id.empty();
    player.id.addClass('explode');
    player.id.css("margin-left", (player.left - 70) + "px");
  }

  $(document).keydown(function(event){
    console.log(event.which);
    if(event.which === 37 && event.shiftKey){
      //console.log("left + shift");
      player.rollLeft();
    }
    else if(event.which === 39 && event.shiftKey){
      //console.log("right + shift");
      player.rollRight();
    }
    else if(event.which === 37){
      //console.log("left");
      player.moveLeft();
    }
    else if(event.which === 38){
      console.log("up");
    }
    else if(event.which === 39){
      //console.log("right");
      player.moveRight();
    }
    else if(event.which === 40){
      //console.log("down");
    }
    else if(event.which === 32){
      //console.log("space");
      missleCount ++;

      $("#game-screen").prepend("<div id='missle"+ missleCount +"' class='missle'></div>");
      $("#missle" + missleCount).css("margin-left", ((player.left + 30) + wing) + "px");
      console.log("plane " + (player.left + 30) + " missle start " + ((player.left + 30) + wing) + "");
      setTimeout(function(){
        $("#missle" + missleCount).css("margin-top", "0");
        $("#missle" + missleCount).css("margin-left", (player.left + 30) + "px");
      },30);

    }

  });


});
