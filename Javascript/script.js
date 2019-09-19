var intervalCoins;
var intervalTrash;

$("#button").click(function() {
  $(".startingScreen").css(`display`, `none`);
  $(".instructions").css(`display`, `flex`);
  $("body").css(`background-image`, `url("Images/gameBackground.jpg")`);
  backgroundMusic().appendTo($("body"));
  setTimeout(function() {
    $(".instructions").css(`display`, `none`);
    $(".gameElements").css(`display`, `block`);
    var game = new Game();
  }, 6000);
});

class Trash {
  constructor() {
    this.spawnTrash();
  }
  createTrashPlastic(){
    var trashPlastic=$(`<img class="trashPlastic trash" src="Images/plastictrash.png">`)
    return trashPlastic;
  }
  createTrashBottle(){
    var trashBottle=$(`<img class="trashBottle trash" src="Images/waterbottle.png">`)
    return trashBottle;
  }
  createTrashCan() {
    var trashCan = $(`<img class="trashCan trash" src="Images/can.png">`);
    return trashCan;
  }

  createTrashBag() {
    var trashBag = $(
      `<img class="trashBag trash" src="Images/wEgK14mt75aBF4JDEYmcESGc6.png">`
    );
    return trashBag;
  }

  createTrashChips() {
    var trashChips = $(
      `<img class="trashChips trash" src="Images/TrashPackaging.png">`
    );
    return trashChips;
  }

  randomizeTrash() {
    var randomNumber = Math.floor(Math.random() * 5 + 1);
    if (randomNumber === 1) {
      return this.createTrashCan();
    } else if (randomNumber === 2) {
      return this.createTrashBag();
    } else if (randomNumber === 3) {
      return this.createTrashChips();
    }else if(randomNumber=== 4){
      return this.createTrashBottle();
    }else if(randomNumber===5){
      return this.createTrashPlastic();
    }
  }

  randomizeSpawn(trash) {
    var windowWidth = $(window).width();
    var randomNumber = Math.floor(Math.random() * (windowWidth - 70))+30;
    trash.css(`left`, randomNumber);
  }

  spawnTrash() {
    var fixThis = this;
    var count = 0;
    intervalTrash = setInterval(function() {
      count++;
      var randomTrash = fixThis.randomizeTrash();

      randomTrash.attr(`id`, `trash` + count);
      fixThis.moveTrash(randomTrash);
      fixThis.randomizeSpawn(randomTrash);
      randomTrash.appendTo(".game");
      setTimeout(function() {
        randomTrash.remove();
      }, 4000);
    }, 300);
  }

  moveTrash(item) {
    var fixThis = this;
    setInterval(function() {
      item.css(`top`, `+=8px`);
    }, 40);
  }
}
class Coin {
  constructor() {
    this.coin = $(
      `<img class="coin" src="Images/PinClipart.com_falling-coins-clipart_1122855.png">`
    );
    this.spawnCoin();
    this.intervalCoins;
  }

  randomizeSpawn(item) {
    var windowWidth = $(window).width();
    var randomNumber = Math.floor(Math.random() * (windowWidth - 70))+30;
    item.css(`left`, randomNumber);
  }

  spawnCoin() {
    var fixThis = this;
    var count = 0;
    intervalCoins = setInterval(function() {
      count++;
      var coin = fixThis.coin.clone();
      fixThis.moveCoin(coin);
      fixThis.randomizeSpawn(coin);
      coin.appendTo(".game");
      setTimeout(function() {
        coin.remove();
      }, 3800);
    }, 2500);
  }

  moveCoin(item) {
    setInterval(function() {
      item.css(`top`, `+=8px`);
    }, 40);
  }
}
class Game {

  constructor() {
    this.boat = new Boat();
    this.intervalId;
    this.start();
  }

  start() {
    var count = 0;
    var fixThis = this;
    var body = $("body");
    var scoreContainer = 0;
    this.intervalId = setInterval(function() {
      var trash = $(".trash");
      var coin = $(".coin");
      var score = $(".score");
      for (let i = 0; i < trash.length; i++) {
        if (
          $("#heart1").attr(`src`) ===
          `Images/kisspng-heart-clip-art-heart-emoji-5b227425b7bf78.5888189215289846137526.png`
        ) {
          if (checkCollisionTrash(trash.eq(i)) === true) {
            trash.eq(i).remove();
            trashSound().appendTo($(".game"));
            count++;
            if (count === 1) {
              heartReplace($("#heart3"));
            } else if (count === 2) {
              heartReplace($("#heart2"));
            } else if (count === 3) {
              heartReplace($("#heart1"));
              fixThis.lost();
            }
          }
        }
      }
      for (let i = 0; i < coin.length; i++) {
        if (
          $("#heart1").attr(`src`) ===
          `Images/kisspng-heart-clip-art-heart-emoji-5b227425b7bf78.5888189215289846137526.png`
        ) {
          if (checkCollisionCoin(coin.eq(i)) === true) {
            coin.eq(i).remove();
            coinSound().appendTo($(".game"));
            scoreContainer += 3;
            score.html(`  ` + scoreContainer);
          }
        }
      }
    }, 10);
    var trash = new Trash();
    var coin = new Coin();
  }

  createEndScreen() {
    var body=$("body");
    var endScreen = $(".endScreen");
    var score = $(".score").html();
    var newScore = $(`<p class="scoreEnd">Your Score: ${score}</p>`);
    var restartButton=$(`<button id="restartButton">Restart!</button>`)
    restartButton.click(function(){
      location.reload();
    })
    
    endScreen.css(`display`, `flex`);
    body.css(`background-image`,`url("Images/gameBackground.jpg")`)
    newScore.appendTo(endScreen);
    createEndGif(score).appendTo(endScreen);
    restartButton.appendTo(endScreen)
  }

  lost() {
    this.boat = undefined;
    var gameHtml = $(".gameElements");
    var body = $("body");
    clearInterval(this.intervalId);
    console.log("clearing interval");
    clearInterval(intervalTrash);
    clearInterval(intervalCoins);
    this.createEndScreen();
    failSound().appendTo($("body"));
    // clearInterval(this.intervalId);
    // gameHtml.remove()
    gameHtml.css("display", "none");
    $(".backgroundMusic").remove();
  }
}

class Boat {
  constructor() {
    this.htmlRef = $("#boat");
    this.initiateControls();
  }
  initiateControls() {
    var fixThis = this;
    $(window).keydown(function(e) {
      if (
        e.which === 68 &&
        fixThis.htmlRef.offset().left - $(".game").offset().left <
          $(".game").width() - 60
      ) {
        fixThis.htmlRef.css("left", "+=30");
      } else if (
        e.which === 65 &&
        fixThis.htmlRef.offset().left > $(".game").offset().left + 13
      ) {
        fixThis.htmlRef.css("left", "-=30");
      } else if (
        e.which === 87 &&
        fixThis.htmlRef.offset().top > $(".game").offset().top + 40
      ) {
        fixThis.htmlRef.css("top", "-=30");
      } else if (
        e.which === 83 &&
        fixThis.htmlRef.offset().top - $(".game").offset().top <
          $(".game").height() - 190
      ) {
        fixThis.htmlRef.css("top", "+=30");
      }
    });
  }
}

function checkCollisionTrash(trashItem) {
  var boat = $("#boat");
  if (isCollide(boat, trashItem) === true) {
    return true;
  } else {
    return false;
  }
}

function checkCollisionCoin(coin) {
  var boat = $("#boat");
  if (isCollide(boat, coin) === true) {
    return true;
  } else {
    return false;
  }
}

function trashReplace(img) {
  img.attr(`src`, `Images/5a3ab9217dabe8.84747121151379792151483896.png`);
  img.attr(`class`, `explosion`);
}

function heartReplace(img) {
  img.attr(`src`, `Images/blue-cross-icon.png`);
}

function coinSound() {
  var audioElement = $(
    `<audio src="Sounds/coin.wav" autoplay="true" class="coinSoundy">`
  );
  return audioElement;
}

function trashSound() {
  var audioElement = $(
    `<audio src="Sounds/shatter.wav" autoplay="true" class="trashSoundy">`
  );
  return audioElement;
}

function failSound() {
  var audioElement = $(
    `<audio src="Sounds/Fail-music-sound-effect.mp3" autoplay="true" class="failSoundy">`
  );
  return audioElement;
}

function backgroundMusic() {
  var audioElement = $(
    `<audio src="Sounds/16-Bit Wave Super Nintendo & Sega Genesis RetroWave Mix.mp3" autoplay="true" class="backgroundMusic" volume="5.0">`
  );
  return audioElement;
}

function createEndGif(score) {
  if (score < 10) {
    return $(`<img class="finalGif" src="Images/Loser.gif">`);
  } else if (score >= 10 && score < 20) {
    return $(`<img class="finalGif" src="Images/10to20.gif">`);
  } else if (score >= 20 && score < 30) {
    return $(`<img class="finalGif" src="Images/20to30.gif">`);
  } else if (score >= 30 && score < 40) {
    return $(`<img class="finalGif" src="Images/30to40.gif">`);
  } else if (score >= 40 && score < 50) {
    return $(`<img class="finalGif" src="Images/40to50.gif">`);
  } else if (score >= 50 && score < 68) {
    return $(`<img class="finalGif" src="Images/50to68.gif">`);
  } else if (score > 68 && score < 70) {
    return $(`<img class="finalGif" src="Images/nice.gif">`);
  } else if (score >= 70 && score < 100) {
    return $(`<img class="finalGif" src="Images/70to100.gif">`);
  } else if (score >= 100) {
    return $(`<img class="finalGif" src="Images/100.gif">`);
  }
}

function isCollide(element1, element2) {
  var a = {
    y: 100 - element1.offset().top - element1.height(),
    x: element1.offset().left,
    height: element1.height(),
    width: element1.width()
  };
  var b = {
    y: 100 - element2.offset().top - element2.height(),
    x: element2.offset().left,
    height: element2.height(),
    width: element2.width()
  };
  return !(
    a.y + a.height < b.y ||
    a.y > b.y + b.height ||
    a.x + a.width < b.x ||
    a.x > b.x + b.width
  );
}