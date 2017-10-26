class Laser
{
	constructor(x, y, speed, angle)
	{
		let vx = speed*Math.cos(angle);
		let vy = speed*Math.sin(angle);
		
		this.position = new Vector(x, y);
		this.velocity = new Vector(vx, vy);
		this.angle = angle;
	}
	
	update(width, height, meteors)
	{
		this.position.add(this.velocity);
		
		if(	this.position.x > width || this.position.x < 0
			||this.position.y > height || this.position.y < 0)
		{
			return ["OUT", 0];
		}
		
		for(let i in meteors)
		{
			if(PointCollision(this, meteors[i]))
			{
				return ["HIT", i];
			}
		}
		
		return ["NOT", 0];
	}
	
	render(context, ship)
	{
		context.save();
		context.strokeStyle = "white";
		context.translate(this.position.x, this.position.y);
		context.rotate(this.angle);
		context.beginPath();
		context.moveTo(ship.r, 0);
		context.lineTo(5, 0);
		context.stroke();
		context.restore();
	}
}