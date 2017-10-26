class Meteor
{
	constructor(width, height, x, y, speed, r, resolution)
	{
		this.speed = speed || random(1, 2);
		this.r = r || random(10, 30);
		
		let tx = x || random(0, width);
		let ty = y || random(0, height);		
		
		let vx = this.speed*Math.cos(random(0, 2*Math.PI));
		let vy = this.speed*Math.sin(random(0, 2*Math.PI));		
		
		this.velocity = new Vector(vx, vy);
		this.position = new Vector(tx, ty);
		this.rotation = 0;
		this.resolution = resolution;
		this.points = [];
		
		for(let i = 0; i < this.resolution; i++)
		{
			let r = this.r*random(1,1.47);
			let angle = 2*Math.PI*i/this.resolution;
			let x = r*Math.cos(angle);
			let y = r*Math.sin(angle);
			this.points.push(new Vector(x, y));
		}
	}
	
	update(width, height, meteors, index)
	{
		this.position.add(this.velocity);
		this.edges(width, height);
		
		/*Check collisions*/
		let copy = meteors.slice();
		copy.splice(index, 1);
		
		for(let i in copy)
		{			
			if(CircleCollision(this, copy[i]))
			{
				this.velocity.x = -this.velocity.x;
				this.velocity.y = -this.velocity.y;
			}
		}
	}
	
	render(context)
	{
		context.save();
		context.strokeStyle = "white";
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.beginPath();
		//context.moveTo(5, 0);
		for(let i in this.points)
		{
			context.lineTo(this.points[i].x, this.points[i].y);
		}
		context.closePath();
		context.stroke();
		context.restore();
	}
	
	edges(width, height)
	{
		/*Check if wrapping around edges*/
		if(this.position.x > width + this.r)
		{
			this.position.x = -this.r;
		}
		else if(this.position.x < -this.r)
		{
			this.position.x =  width + this.r;
		}
		
		if(this.position.y > height + this.r)
		{
			this.position.y = -this.r;
		}
		else if(this.position.y < -this.r)
		{
			this.position.y =  height + this.r;
		}
	}
	
	split()
	{
		if(this.r > 15)
		{
			let x = this.position.x;
			let y = this.position.y;
			let r = this.r;
			let speed = this.speed;
			
			let m1 = new Meteor(0, 0, x, y, speed, r - 5, this.resolution);
			let m2 = new Meteor(0, 0, x+2*r, y, speed, r - 5, this.resolution);
				
			return [m1, m2];
		}
		
		return null;
	}
}