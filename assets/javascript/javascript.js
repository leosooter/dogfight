$(document).ready(function() {
  console.log("JQuery has loaded");
  var enemyCount = 1;
  var missileCount = 0;
  var wing = 20;

  //Hide smoke trails on all planes
  $(".smoke-trail").hide();



  function generateEnemy(){
    rand1 = Math.floor(Math.random()*18)*50 + 50;
    console.log(rand1);
    var enemyId = "#enemy" + enemyCount;
    var enemy = '<div id="enemy' + enemyCount + '" class="enemy jet"><div id="enemy' + enemyCount + '-top" class="enemy-top jet-top"></div><div id="enemy' + enemyCount + '-side" class="jet-side"></div></div>';
    $("#game-screen").prepend(enemy);
    $(enemyId).css("margin-left", rand1 + "px");
    setTimeout(function(){
    $(enemyId).css("margin-top", "1200px");
    }, 100);
    enemyCount ++;
    setTimeout(function(){
      $(enemyId).remove();
      enemyCount --;
    }, 5000);
    setTimeout(function(){
      generateEnemy();
    },5000);
  }

  generateEnemy();


  function moveGround(){
    $("#ground").addClass('move-down');
    setTimeout(function(){
      $("#ground").removeClass('speed-on');
      $("#ground").removeClass('move-down');
      setTimeout(function(){
        $("#ground").addClass('speed-on');
        moveGround();
      },30);
    }, 89970);
  }
  moveGround();

  var player = {
    id : $("#player"),
    topId : $("#player-top"),
    sideId : $("#player-side"),
    life : 1,
    left : 300,
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
      if(player.left >= 150){
        player.rollLeft();
      }
      else if(player.left >= 50){
        player.moveLeft();
      }
      return false;
    }
    else if(event.which === 39 && event.shiftKey){
      if(player.left <= 500){
        player.rollRight();
      }
      else if(player.left <= 650){
        player.moveRight();
      }
      return false;
    }
    else if(event.which === 37){
      if(player.left >= 50){
        player.moveLeft();
      }
      return false;
    }
    else if(event.which === 38){
      console.log("up");
      return false;
    }
    else if(event.which === 39){
      if(player.left <= 650){
        player.moveRight();
      }
      return false;
    }
    else if(event.which === 40){
      //console.log("down");
    }
    else if(event.which === 32){
      if(missileCount < 3){
        fireMissile();
      }
      return false;
    }
  });


  function fireMissile(){
    missileCount ++;
    var missile = "<div id='missile"+ missileCount +"' class='missile'></div>";
    var missileId = "#missile" + missileCount;
    $("#game-screen").prepend(missile);
    $(missileId).css("margin-left", ((player.left + 30) + wing) + "px");
    setTimeout(function(){
      $(missileId).css("margin-top", "-70px");
      missileTrack(missileId);
    },30);
    setTimeout(function(){
      console.log("removing missile - " + missileId);
      $(missileId).remove();
      missileCount --;
    },2200);
  }

  function missileTrack(missile){
    //var missile = missile;
    if( $(missile).offset().left < 1200 ){
      setTimeout(function(){
        var xLow = $(missile).offset().left - 30;
        var xHigh = $(missile).offset().left + 30;

        var yLow = $(missile).offset().top - 60;
        var yHigh = $(missile).offset().top + 10;
        $(".enemy").each(function(){
          var xEnemy = $(this).offset().left;
          var yEnemy = $(this).offset().top;
          if( xLow < xEnemy && xEnemy < xHigh && yLow < yEnemy && yEnemy < yHigh){
            console.log("strike");
            missileCount --;
            enemyCount --;
            $(missile).remove();
            $(this).empty();
            $(this).addClass('enemy-explode');
            return;
          }
        });
        missileTrack(missile);
      }, 50);
    }

  }
  //missileStrike(missileId, dist, target);
  function missileStrike(id, dist, target){
    setTimeout(function(){
      console.log(id);
      console.log(target);
      $(id).remove();
      $(target).empty();
      $(target).addClass('explode-enemy');
    }, dist);
  }


});
