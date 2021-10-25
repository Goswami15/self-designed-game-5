const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var boundary1, boundary2, boundary3, boundary4;
var bumper1, bumper2, bumper3, bumper4, bumper5;
var wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, wall10;
var engine, world;
var dome;
var pieceT1, pieceT2, pieceT3, pieceT4, pieceT5, pieceT6;
var pieceFT1, pieceFT2;
var pieceFR1, pieceFR2;

var ball;

var stopper1, stopper2, stopper3, stopper4;

var paddle1State, paddle2State;

var paddle1, paddle2;

var cpoint1, cpoint2, cpoint3, cpoint4, cpoint5, cpoint6, cpoint7, cpoint8;

var charge = 0;
var gameState = "release";

const PATHS = {
  DOME: [
    0, 0, 0, 250, 19, 250, 20, 231.9, 25.7, 196.1, 36.9, 161.7, 53.3, 129.5,
    74.6, 100.2, 100.2, 74.6, 129.5, 53.3, 161.7, 36.9, 196.1, 25.7, 231.9, 20,
    268.1, 20, 303.9, 25.7, 338.3, 36.9, 370.5, 53.3, 399.8, 74.6, 425.4, 100.2,
    446.7, 129.5, 463.1, 161.7, 474.3, 196.1, 480, 231.9, 480, 250, 500, 250,
    500, 0, 0, 0,
  ],
  DOME_VERTICES:
    "0 0 0 250 19 250 20 231.9 25.7 196.1 36.9 161.7 53.3 129.5 74.6 100.2 100.2 74.6 129.5 53.3 161.7 36.9 196.1 25.7 231.9 20 268.1 20 303.9 25.7 338.3 36.9 370.5 53.3 399.8 74.6 425.4 100.2 446.7 129.5 463.1 161.7 474.3 196.1 480 231.9 480 250 500 250 500 0 0 0",
  DROP_LEFT: "0 0 20 0 70 100 20 150 0 150 0 0",
  DROP_RIGHT: "50 0 68 0 68 150 50 150 0 100 50 0",
  APRON_LEFT: "0 0 180 120 0 120 0 0",
  APRON_RIGHT: "180 0 180 120 0 120 180 0",
};
function preload() {
  var a = loadImage("images/1.png");
  var c = loadImage("images/3.png");
  var d = loadImage("images/4.png");
  var e = loadImage("images/5.png");
  var f = loadImage("images/6.png");
  var g = loadImage("images/7.png");
  var h = loadImage("images/8.png");
  var i = loadImage("images/9.png");
  var j = loadImage("images/10.png");
  var k = loadImage("images/11.png");
  var l = loadImage("images/12.png");
  var m = loadImage("images/13.png");
  var n = loadImage("images/14.jpg");
  var o = loadImage("images/15.png");
}

function setup() {
  createCanvas(450, 700);

  engine = Engine.create();
  world = engine.world;

  bumper1 = new Bumper(90, 200);
  bumper2 = new Bumper(210, 200);
  bumper3 = new Bumper(330, 200);

  wall1 = new Wall(390, 370, 20, 520);
  wall2 = new Wall(450, 350, 50, 1000);
  wall3 = new Wall(405, 650, 50, 140);
  wall4 = new Wall(225, 20, 450, 100);
  wall5 = new Wall(0, 350, 50, 1000);

  pieceT1 = new Edges(415, 60, 40, PI / 11);
  pieceT4 = new Edges(22.5, 585, 35, PI / 2);
  pieceT5 = new Edges(382.5, 585, 35, PI / 2);
  pieceT6 = new Edges(30, 60, 40, PI / 1.15);

  pieceFT1 = new Triangles(142.5, 320, 25, 0);
  pieceFT2 = new Triangles(262.5, 320, 25, PI / -3);
  cpoint3 = new ConstraintPoint(pieceFT1.body, { x: 142.5, y: 320 }, 1, 0, 0);
  cpoint4 = new ConstraintPoint(pieceFT2.body, { x: 262.5, y: 320 }, 1, 0, 0);

  pieceFR1 = new Squares(202.5, 400, 100, 10);
  pieceFR2 = new Squares(132.5, 455, 100, 10);
  cpoint5 = new ConstraintPoint(pieceFR1.body, { x: 202.5, y: 400 }, 1, 0, 0);
  cpoint6 = new ConstraintPoint(pieceFR2.body, { x: 122.5, y: 455 }, 1, 0, 0);

  // dome = new Path(239, 86, PATHS.DOME_VERTICES);

  ball = new Ball(413, 568);

  paddle1 = new Paddle2(100, 670, 130, 40, 1);
  cpoint1 = new Screw(paddle1.body, { x: 40, y: 670 }, 1, 0, -65);
  cpoint8 = new Screw(paddle1.body, { x: 40, y: 645 }, 1, 0, -65);

  paddle2 = new Paddle2(305, 670, 130, 40, 0);
  cpoint2 = new Screw(paddle2.body, { x: 365, y: 670 }, 1, 0, 65);
  cpoint7 = new Screw(paddle2.body, { x: 365, y: 645 }, 1, 0, 65);

  paddle1State = "resting";
  paddle2State = "resting";
  charge = 0;
  gamestate = "waiting";
}

function draw() {
  background(0);
  Engine.update(engine);

  bumper1.display();
  bumper2.display();
  bumper3.display();

  wall1.display();
  wall2.display();
  wall3.display();
  wall4.display();
  wall5.display();

  //dome.display();

  pieceT1.display();
  pieceT4.display();
  pieceT5.display();
  pieceT6.display();

  ball.display();

  paddle1.display();
  paddle2.display();

  pieceFT1.display();
  pieceFT2.display();

  pieceFR1.display();
  pieceFR2.display();

  //cpoint1.display();
  //cpoint2.display();
  //cpoint7.display();

  if (keyIsDown(UP_ARROW) && gameState === "release") {
    fill("white");
    textAlign(CENTER);
    textSize(10);

    if (charge > -50) {
      charge -= 0.3;
      text("Charge: " + round(charge * -1), 410, 610);
    } else {
      text("Charge: MAX", 410, 610);
    }
  }

  if (ball.body.position.x < 390) {
    gameState = "playing";
  }

  //set the paddle angles
  if (paddle1State === "resting") {
    Matter.Body.setAngle(paddle1.body, 0);
  }

  if (paddle2State === "resting") {
    Matter.Body.setAngle(paddle2.body, 0);
  }
  //set paddles back to normal after flinging
  if (paddle1.body.angle > 0) {
    Matter.Body.setAngularVelocity(paddle1, 0);
    paddle1State = "resting";
  }

  if (paddle2.body.angle < 0) {
    Matter.Body.setAngularVelocity(paddle2, 0);
    paddle2State = "resting";
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    Matter.Body.setVelocity(ball.body, { x: 0, y: charge });

    charge = 0;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    paddle1State = "flinging";
    Matter.Body.setAngularVelocity(paddle1.body, -0.5);
  }

  if (keyCode === RIGHT_ARROW) {
    paddle2State = "flinging";
    Matter.Body.setAngularVelocity(paddle2.body, 0.5);
    Matter.Body.setAngle(paddle2.body, 0);
  }
  if (keyCode === 32) {
    gameState = "release";
    Matter.Body.setPosition(ball.body, { x: 413, y: 568 });
  }
}
