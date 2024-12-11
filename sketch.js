// YOU'RE TOO LATE SPIDER-MAN!
// project by: Jaekob Gamboa, Conrad Mateo, Danny Nguyen
// original Angry Bird code by The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/content/videos/challenges/138-angry-birds-with-matterjs
// https://youtu.be/TDQzoe9nslY
// Code from Challenge: https://editor.p5js.org/codingtrain/sketches/UOR4nIcNS

const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;
let ground;
const boxes = [];
let box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12, box13, box14, box15, box16, box17, box18, box19, box20;
const boxes2 = [];
let bird;
let world, engine;
let mConstraint;
let slingshot;
let numboxes = 5
let dotImg;
let boxImg;
let bkgImg;
let scene = 0
let pressedKeys = {};
let titleMusic, instructionsMusic, gameplayMusic

function preload() {
  dotImg = loadImage('pumpkin_bomb_green_goblin_png_by_akithefull_dewww5w-pre.png');
  goblin = loadImage('Goblin.png');
  title = loadImage('goblinTitle.png');
  manual = loadImage('manual.png');
  nyc = loadImage('NYC.png');
  block = loadImage('window.png');
  reload = loadImage('reload.png');
  
  soundFormats("mp3");
  titleMusic = loadSound ("title.mp3");
  instructionsMusic = loadSound ("instructions.mp3");
  gameplayMusic = loadSound ("gameplay.mp3");
  voice = loadSound ("voice.mp3");
}

function setup() {
  let canvas = createCanvas(1280, 720);
  canvas.parent("final");
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(1000, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(450, 600 - i * 75, 84, 100);
  } 
  bird = new Bird(450, 520, 25);

  slingshot = new SlingShot(220, 520, bird.body);
  
  box2 = new Box(580, 600, 84, 100);
  box3 = new Box(580, 400, 84, 100);
  box4 = new Box(580, 350, 84, 100);
  box5 = new Box(580, 280, 84, 100);
  box6 = new Box(700, 600, 84, 100);
  box7 = new Box(700, 550, 84, 100);
  box8 = new Box(700, 450, 84, 100);
  box9 = new Box(820, 280, 84, 100);
  box10 = new Box(820, 350, 84, 100);
  box11 = new Box(820, 400, 84, 100);
  box12 = new Box(820, 500, 84, 100);
  box13 = new Box(820, 600, 84, 100);
  box14 = new Box(950, 600, 84, 100);
  box15 = new Box(950, 550, 84, 100);
  box16 = new Box(950, 450, 84, 100);
  box17 = new Box(950, 310, 84, 100);
  box18 = new Box(950, 200, 84, 100);
  box19 = new Box(950, 100, 84, 100);

  playTitleMusic();

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse
  };

  // A fix for HiDPI displays
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  
   
}

function keyPressed() {
  if (keyCode === ENTER) {
    World.remove(world, bird.body);
    bird = new Bird(220, 520, 25);
    slingshot.attach(bird.body);
    playGameplayMusic();
  } else if (key == 'r') {
    World.remove(world, bird.body);
    bird = new Bird(220, 520, 25);
    slingshot.attach(bird.body);
  } else if (key == ' ') {
    playInstructionsMusic();
  } 
  pressedKeys[key] = true;
}

function keyReleased() {
  delete pressedKeys[key];
}


function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
  }, 100);
}

function startScreen(){
   fill(255);
  image(title, 0, 0, 1280, 720);
     textSize(50);
     textAlign(CENTER)
      textSize(35);
      text("Press SPACE to begin", width/2, height-45);
        if(key == ' '){
          scene++;
        }
}
function manualScreen(){

  image(manual, 0, 0, 1280, 720);
     textSize(50);
     textAlign(CENTER)
      textSize(25);
      text("Press ENTER to begin", 660, height-80);
        if(keyCode === ENTER){
          scene++;
        }
  titleMusic.stop();
  voice.stop();
}

function gameplay(){
           image(nyc, 0, 0, 1920, 1080);
        image(goblin, 200, 480, 100, 150);
  image(reload, 10, 20, 140, 100);
  Matter.Engine.update(engine);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  box2.show();
  box3.show();
  box4.show();
  box5.show();
  box6.show();
  box7.show();
  box8.show();
  box9.show();
  box10.show();
  box11.show();
  box12.show();
  box13.show();
  box14.show();
  box15.show();
  box16.show();
  box17.show();
  box18.show();
  box19.show();
  slingshot.show();
  bird.show();
  instructionsMusic.stop();

}

function winScreen(){
image(nyc, 0, 0, 1920, 1080);
}

function draw() {
    background(0);
  switch(scene){
     case 0:
  startScreen();
        break;
      case 1:
  manualScreen();
        break;
        case 2:
  gameplay();
        break;
        case 3:
      winScreen();
      break;
  }
}

function playTitleMusic() {
  titleMusic.play();
  titleMusic.setVolume(0.5);
  voice.play();
}

function playInstructionsMusic() {
  instructionsMusic.setVolume(0.8);
  instructionsMusic.stop();
  instructionsMusic.play();
}

function playGameplayMusic() {
  gameplayMusic.setVolume(0.5);
  gameplayMusic.stop();
  gameplayMusic.play();
}
