window.onload = setup;

let context;
let width;
let height;

let ship;
let meteors = [];

function setup()
{
	canvas = document.getElementById("asteroids-canvas");
	context = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	
	/*Add Event Listeners*/
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	
	/*Create player spaceship*/
	ship = new SpaceShip(width/2, height/2, 25, .45, .99);
	
	/*Create meteors*/
	for(let i = 0; i < 10; i++)
	{
		let m = new Meteor(width, height, 0, 0, 0, 0, 15);
		meteors.push(m);
	}
	
	/*Request first animation frame*/
	requestAnimationFrame(draw);
}

function draw()
{
	/*Clear screen*/
	context.clearRect(0, 0, width, height);
	
	/*Update and render ship*/
	ship.update(width, height, meteors);
	ship.render(context);
	
	/*Update and render all meteors*/
	for(let i in meteors)
	{
		meteors[i].update(width, height, meteors, i);
		meteors[i].render(context);
	}
	
	/*Callback to this function*/
	requestAnimationFrame(draw);
}

function keyDownHandler(event)
{
	let code = event.which || event.keyCode;
	let key = String.fromCharCode(code);
	
	switch(key)
	{
		case "W":
			/*Moving forward*/
			ship.thrust(true);
			break;
		case "S":
			/*Moving backwards*/
			break;
		case "A":
			/*Turning left*/
			ship.rotate("Left");
			break;
		case "D":
			/*Turning right*/
			ship.rotate("Right");
			break;
		case " ":
			/*Shot laser*/
			ship.shot();
			break;
	}
}

function keyUpHandler(event)
{
	let code = event.which || event.keyCode;
	let key = String.fromCharCode(code);
	
	switch(key)
	{
		case "W":
			/*Stop forward*/
			ship.thrust(false);
			break;
		case "S":
			/*Stop backwards*/
			break;
		case "A":
			/*Stop turning left*/
			ship.rotate("Stop");
			break;
		case "D":
			/*Stop turning right*/
			ship.rotate("Stop");
			break;
	}
}