
window.onload=function(){
    var game=new Game();
  };

  function isCollide(element1,element2) {
    var a = {
        y: 100-element1.offset().top - element1.height(), 
        x: element1.offset().left,
        height: element1.height(),
        width: element1.width()
    }
    var b = {
        y:100- element2.offset().top - element2.height(), 
        x: element2.offset().left,
        height: element2.height(),
        width: element2.width()
    }
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}
class Trash{
    constructor(){
        this.spawnTrash();
    }

    createTrashCan(){
    var trashCan=$(`<img class="trashCan trash" src="Images/can.png">`)
    return trashCan;
    }

    createTrashBag(){
    var trashBag=$(`<img class="trashBag trash" src="Images/wEgK14mt75aBF4JDEYmcESGc6.png">`)
    return trashBag;
    }

    createTrashChips(){
        var trashChips=$(`<img class="trashChips trash" src="Images/TrashPackaging.png">`)
        return trashChips;
    }

    randomizeTrash(){
        var randomNumber=Math.floor(Math.random()*3+1);
        if(randomNumber===1){
            return this.createTrashCan();
        }else if(randomNumber===2){
            return this.createTrashBag();
        }else if(randomNumber===3){
            return this.createTrashChips();
        }
    }

    randomizeSpawn(trash){
        var randomNumber=Math.floor(Math.random()*2)
    }

    spawnTrash(){
        var fixThis=this;
        var count=0;
    setInterval(function(){
        count++;
        var randomTrash=fixThis.randomizeTrash();
        
        randomTrash.attr(`id`,`trash`+count)
        randomTrash.appendTo(".game")
    },1000)
    }

    moveTrash(item){
    setInterval(function(){
        item.css(`top`,-1)
    },100)
    }
}
class Game{
    constructor(){
        this.boat=new Boat();
        this.start();
        this.obstacle=[];
    }
    start(){
        var count=0;
        var fixThis=this;
        setInterval(function(){
            
            var trash=$(".trash");
            for(let i=0;i<trash.length;i++){
            if(checkCollisionTrash(trash.eq(i))===true){
                trash.eq(i).remove();
                count++;
                if(count===1){
                   heartReplace($("#heart3"));
                }else if(count===2){
                   heartReplace($("#heart2"));
                }else if(count===3){
                  heartReplace($("#heart1"));
                  fixThis.lost();
                }
            }
            }
        },10)
        var trash=new Trash();
    }
    lost(){
        var gameHtml= $(".game");
        var losingScreen=$(".losing-screen")
        gameHtml.css(`display`,`none`)
        losingScreen.css(`display`,`block`)
    }
}
class Boat{
    constructor(){
        this.htmlRef=$("#boat");
        this.initiateControls();
    }
    initiateControls(){
        var fixThis=this;
            $(window).keydown(function(e){
                if(e.which===68 && fixThis.htmlRef.offset().left-$(".game").offset().left<$(".game").width()-60){
                  fixThis.htmlRef.css("left","+=20")
                }else if(e.which===65&&fixThis.htmlRef.offset().left>$(".game").offset().left+13){
                  fixThis.htmlRef.css("left","-=20")
                }else if(e.which===87&&fixThis.htmlRef.offset().top>$(".game").offset().top+20){
                  fixThis.htmlRef.css("top","-=20")
                }else if(e.which===83&&fixThis.htmlRef.offset().top-$(".game").offset().top<$(".game").height()-130){
                  fixThis.htmlRef.css("top","+=20")
                }
            })
    }
}

function checkCollisionTrash(trashItem){
    var boat=$("#boat");
        if(isCollide(boat,trashItem)===true){
            return true;
        }else{
            return false;
        }
}

function checkCollisionCoin(){

}
function trashReplace(img){
    img.attr(`src`,`Images/5a3ab9217dabe8.84747121151379792151483896.png`)
    img.attr(`class`,`explosion`)
}
function heartReplace(img){
        img.attr(`src`,`Images/blue-cross-icon.png`)
}
