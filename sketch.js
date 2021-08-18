
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var c1, c2;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var HI = 0;
var invisiblegrd, carsGroup;


function preload() {
	bg = loadImage("images/back.jpg")
	died = loadImage("images/die.png")
	c1 = loadImage("images/car.png")

	c2 = loadImage("images/car2.png")

	runnerImg = loadAnimation("images/b1.png", "images/b2.png", "images/b3.png", "images/b4.png"
		, "images/b5.png", "images/b6.png", "images/b7.png", "images/b8.png")

	img = loadImage("images/reset.png")

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	engine = Engine.create();
	world = engine.world;

	background1 = createSprite(0, 0, windowWidth, windowHeight)
	background1.addImage(bg)
	background1.scale = 4.5

	reset1 = createSprite(windowWidth / 2 - 20, windowHeight / 2 - 20)
	reset1.addImage(img)
	reset1.scale = 0.05;

	runner = createSprite(110, height - 150)
	runner.addAnimation("runner", runnerImg)
	runner.scale = 1.4;
	runner.addAnimation("die", died);
	runner.setCollider("rectangle", 0, 0, 60, 125)

	invisiblegrd = createSprite(width / 2, height - 20, width, 10)
	invisiblegrd.visible = false;

	carsGroup = new Group();

	Engine.run(engine);
}


function draw() {
	rectMode(CENTER);

	background(0)


	if (gameState === PLAY) {
		score = score + Math.round(getFrameRate() / 60)

		if (carsGroup.isTouching(runner)) {
			gameState = END;
			console.log("end")
		}
		if (runner.collide(invisiblegrd)) {
			if (keyDown(UP_ARROW) && runner.y >= height - 200) {
				runner.velocityY = -20
			}
		}


		background1.velocityX = -3;
		if (background1.x < 0) {
			background1.x = background1.width / 2;
		}
		obsticle();
		reset1.visible = false;

	}

	if (gameState === END) {

		carsGroup.setVelocityXEach(0)
		runner.changeImage("die", died)
		runner.scale = 0.2;
		carsGroup.setLifetimeEach(-1)
		background1.setVelocity(0, 0)
		reset1.visible = true;
		if (mousePressedOver(reset1)) {
			reset();
			carsGroup.destroyEach()
		}
		if (HI < score) {
			HI = score
		}

	}

	runner.collide(invisiblegrd);
	drawSprites();
	textSize(40)
	fill("Black")
	text("score = " + score, 200, 100)
	runner.velocityY = runner.velocityY + 0.7;
	textSize(40)
	fill("Black")
	text("HI = " + HI, 200, 200)
}

function obsticle() {
	if (frameCount % 100 === 0) {
		car = createSprite(width + 100, height - 60)
		car.velocityX = -10;
		car.scale = 1.2
		var no = round(random(1, 2))
		if (no === 1) {
			car.addImage(c1)
		}
		else {
			car.addImage(c2)
		}
		car.lifetime = 500
		car.setCollider("rectangle", 0, 0, 140, 50)
		carsGroup.add(car);
	}
}

function reset() {
	gameState = PLAY;
	score = 0;
	runner.changeAnimation("runner", runnerImg)
	runner.scale = 1.4
}

