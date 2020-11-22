const cvs = document.getElementById("unicornGame");
const ctx = cvs.getContext("2d");

// create the unit
const box = 50;


// load images
const ground = new Image();
const foodImg = new Image();
const candyImg = new Image();
const cottonImg = new Image();
const gameover = new Image();
const startImg = new Image();
const playImg = new Image();


ground.src = "img/bg.png";
foodImg.src = "img/candy.png";
candyImg.src = "img/unicorn2.png";
cottonImg.src = "img/mak.png";
gameover.src = "img/gameover1.png";
startImg.src = "img/start2.jpg";
playImg.src = "img/spacebar.jpg";

// load audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
let enter = new Audio();
let spacebar = new Audio();
let homepage = new Audio();
let gameoversfx = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3"
enter.src = "audio/enter.mp3";
spacebar.src = "audio/spacebar.mp3";
homepage.src = "audio/1page.mp3";
gameoversfx.src = "audio/gameover.mp3";


///////////////////////////////////////////////////////////////////////////////////////////////////////


// create the Unicorn
let unicorn = [];
function createunicorn(){
    unicorn[0] = {
        x : 9 * box,
        y : 10 * box
    };
}



// create the food
let food = {
    x : Math.floor(Math.random()*24+1) * box,
    y : Math.floor(Math.random()*11+2) * box
}


// create the score var
let score = 0;


//control the unicorn
let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }else if (key == 32){
        spacebar.play();
        clearInterval(game);
        score =0;
        unicorn.length = 0;
        createunicorn()
        d=0;
        game = setInterval(draw,200);
    }else if (key == 13){
        enter.play();
        clearInterval(game);
        score =0;
        unicorn.length = 0;
        d=0;
        
        game = drawmainmenu();
    }

}


// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


// draw everything to the canvas
function draw(){
    ctx.drawImage(ground,0,0);
    ctx.drawImage(foodImg, food.x, food.y);
    
    for( let i = 0; i < unicorn.length ; i++){
        if (i==0) ctx.drawImage(candyImg, unicorn[i].x,unicorn[i].y,box,box);
        else ctx.drawImage(cottonImg, unicorn[i].x,unicorn[i].y,box,box);
    }
    
    
    // old head position
    let unicornX = unicorn[0].x;
    let unicornY = unicorn[0].y;
    

    // which direction
    if( d == "LEFT") unicornX -= box;
    if( d == "UP") unicornY -= box;
    if( d == "RIGHT") unicornX += box;
    if( d == "DOWN") unicornY += box;
    

    // if the unicorn eats the food
    if(unicornX == food.x && unicornY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*24+1) * box,
            y : Math.floor(Math.random()*11+2) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        unicorn.pop();
    }


    // add new Head
    let newHead = {
        x : unicornX,
        y : unicornY
    }


    // game over
    if(unicornX < box || unicornX > 24 * box || unicornY < 2*box || unicornY > 12*box || collision(newHead,unicorn)){
        clearInterval(game);
        dead.play();
        setTimeout("whendie()",1000);
        
    } 
    
    unicorn.unshift(newHead);


    //show score (set)
    ctx.fillStyle = "white";    //score's color
    ctx.font = "50px Cooper Black";
    ctx.fillText(score,7*box,1.35*box);
    
     
}


function whendie(){
    ctx.drawImage(gameover,0,0);
    gameoversfx.play();
    ctx.font = "60px Cooper Black";
    ctx.fillText(score,15*box,7.7*box); //position score

}

function drawmainmenu(){
    homepage.play();
    ctx.drawImage(startImg,0,0);
}


// call draw function every 200 ms
let game = setTimeout(drawmainmenu,200); // 200 is unicorn speed


