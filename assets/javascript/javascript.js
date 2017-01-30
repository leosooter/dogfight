$(document).ready(function() {
  console.log("JQuery has loaded");
  var enemyCount = 1;
  var missileCount = 0;
  var gunCount = 0;
  var wing = 20;

  //Hide smoke trails on all planes
$(".smoke-trail").hide();


  function generateEnemy(){
    var rand1 = Math.floor(Math.random()*14)*50 + 50;
    //var rand1 = 500;

    var rand4 = Math.floor((Math.random() * 6) + 1);
    var rand5 = Math.floor((Math.random() * 3000) + 1000);

    var enemyId = "#enemy" + enemyCount;
    var enemy = '<div id="enemy' + enemyCount + '" class="enemy jet"><div id="enemy' + enemyCount + '-top" class="enemy-top jet-top"></div><div id="enemy' + enemyCount + '-side" class="jet-side"><div class="enemy-smoke smoke-trail"></div></div></div>';
    $("#game-screen").prepend(enemy);
    $(".smoke-trail").hide();
    $(enemyId).css("margin-left", rand1 + "px");
    $(enemyId).data("lives", 2);
    setTimeout(function(){
    $(enemyId).css("margin-top", "1200px");
    }, 100);
    enemyCount ++;
    randomMove(enemyId);


    setTimeout(function(){

    }, rand5);

    setTimeout(function(){
      $(enemyId).remove();
      enemyCount --;
    }, 5000);
    setTimeout(function(){
      generateEnemy();
    },5000);
  }

  generateEnemy();

  function randomMove(enemyId){
    var rand3 = Math.floor((Math.random() * 3000) + 1000);
    setTimeout(function(){
      var offset = $(enemyId).offset().top + 58;
      $("#xCoord").text(offset);
      var rand2 = Math.floor((Math.random() * 6) + 1);
      //var rand2 = 4;
      if(rand2 === 1 && offset >= 200){
        console.log("rollingRight");
        rollRight(enemyId);
      }
      else if(rand2 === 2 && offset <= 550){
        console.log("rollingLeft");
        rollLeft(enemyId);
      }
      else if(rand2 === 3 && offset >= 200){
        console.log("movingRight");
        moveRight(enemyId);
      }
      else if(rand2 === 4 && offset <= 650){
        console.log("movingLeft");
        moveLeft(enemyId);
      }
      if($(enemyId).length === 0){
        randomMove(enemyId);
      }
    }, rand3);
  }

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

  console.log($("#player").offset().top);
  console.log(player.left);



  function rollLeft(id){
    var topId = id + "-top";
    var sideId = id + "-side";
    var left = $(id).offset().top;
    var topDeg = 0;
    var sideDeg = 90;

    topDeg -= 360;
    sideDeg -= 360;
    $(topId).css("transform", "rotateY(" + topDeg + "deg)");
    $(sideId).css("transform", "rotateY(" + sideDeg + "deg)");
    left += 200;
    $(id).css("transform", "rotate(170deg)");
    $(id).css("margin-left", left + "px");
    setTimeout(function(){
      $(id).css("transform", "rotate(180deg)");
    }, 400);
  }

  function rollRight(id){
    var topId = id + "-top";
    var sideId = id + "-side";
    var left = $(id).offset().top;
    //console.log(left);
    var topDeg = 0;
    var sideDeg = 90;

    topDeg += 360;
    sideDeg += 360;
    $(topId).css("transform", "rotateY(" + topDeg + "deg)");
    $(sideId).css("transform", "rotateY(" + sideDeg + "deg)");
    left -= 200;
    $(id).css("transform", "rotate(190deg)");
    $(id).css("margin-left", left + "px");
    setTimeout(function(){
      $(id).css("transform", "rotate(180deg)");
    }, 400);
  }

  function moveLeft(id){
    var topId = id + "-top";
    var sideId = id + "-side";
    var left = $(id).offset().top;
    //console.log(left);
    var topDeg = 0;
    var sideDeg = 90;

    topDeg -= 60;
    sideDeg -= 60;
    $(topId).css("transform", "rotateY(" + topDeg + "deg)");
    $(sideId).css("transform", "rotateY(" + sideDeg + "deg)");
    left += 100;
    $(id).css("transform", "rotate(170deg)");
    $(id).css("margin-left", left + "px");
    setTimeout(function(){
      topDeg += 60;
      sideDeg += 60;
      $(topId).css("transform", "rotateY(" + topDeg + "deg)");
      $(sideId).css("transform", "rotateY(" + sideDeg + "deg)");
      $(id).css("transform", "rotate(180deg)");
    }, 400);
  }

  function moveRight(id){
    var topId = id + "-top";
    var sideId = id + "-side";
    var left = $(id).offset().top;
    //console.log(left);
    var topDeg = 0;
    var sideDeg = 90;

    topDeg += 60;
    sideDeg += 60;
    $(topId).css("transform", "rotateY(" + topDeg + "deg)");
    $(sideId).css("transform", "rotateY(" + sideDeg + "deg)");
    left -= 100;
    $(id).css("transform", "rotate(190deg)");
    $(id).css("margin-left", left + "px");
    setTimeout(function(){
      topDeg -= 60;
      sideDeg -= 60;
      $(topId).css("transform", "rotateY(" + topDeg + "deg)");
      $(sideId).css("transform", "rotateY(" + sideDeg + "deg)");
      $(id).css("transform", "rotate(180deg)");
    }, 400);
  }


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
    //console.log(event.which);
    if(event.which === 38){
      if(player.left >= 150){
        player.rollLeft();
      }
      else if(player.left >= 50){
        player.moveLeft();
      }
      return false;
    }
    else if(event.which === 40){
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
    else if(event.which === 39){
      if(player.left <= 650){
        player.moveRight();
      }
      return false;
    }
    else if(event.which === 32){
      if(missileCount < 2){
        fireGun();
      }
      return false;
    }
    else if(event.which === 66 || event.which === 86){
      if(missileCount < 2){
        fireMissile();
      }
      return false;
    }
  });

  function fireGun(){
    gunCount ++;
    var gun = "<div id='gun"+ gunCount +"' class='gun'></div>";
    var gunId = "#gun" + gunCount;
    var playerOffset = $("#player").offset().top;
    $("#game-screen").prepend(gun);
    console.log(playerOffset);
    //Coding mystery- the console.log below will return a correct value for the plane's offset, but will break the function.
    //console.log( $("#player").offset().top );
    $(gunId).css("margin-left", (playerOffset + 30) + "px");
    setTimeout(function(){
      $(gunId).css("margin-top", "-20px");
      gunTrack(gunId);
    },30);
    setTimeout(function(){
      console.log("removing gun - " + gunId);
      $(gunId).remove();
      gunCount --;
    },2200);
  }

  function gunTrack(gun){
    //var gun = gun;
    if( $(gun).offset().left < 1200 ){
      setTimeout(function(){
        var xLow = $(gun).offset().left - 30;
        var xHigh = $(gun).offset().left + 30;

        var yLow = $(gun).offset().top - 60;
        var yHigh = $(gun).offset().top + 10;
        $(".enemy").each(function(){
          var xEnemy = $(this).offset().left;
          var yEnemy = $(this).offset().top;
          if( xLow < xEnemy && xEnemy < xHigh && yLow < yEnemy && yEnemy < yHigh){
            $(this).data("lives", ($(this).data("lives") - 1));
            var lives = $(this).data("lives");
            if(lives === 1){
              console.log("smoke");
              $(gun).remove();
              $(".enemy-smoke").show();
            }
            else if (lives <= 0){
              console.log("strike");
              gunCount --;
              enemyCount --;
              $(gun).remove();
              $(this).empty();
              $(this).addClass('enemy-explode');
              return;
            }

          }
        });
        gunTrack(gun);
      }, 50);
    }
  }


  function fireMissile(){
    missileCount ++;
    var missile = "<div id='missile"+ missileCount +"' class='missile'></div>";
    var missileId = "#missile" + missileCount;
    var playerOffset = $("#player").offset().top;
    $("#game-screen").prepend(missile);
    $(missileId).css("margin-left", (playerOffset + 30) + wing + "px");
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


});
