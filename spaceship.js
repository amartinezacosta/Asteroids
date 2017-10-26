class SpaceShip
{
	constructor(x, y, r, a, drag)
	{
		this.r = r;
		this.rotation = 1.5*Math.PI;
		this.angle = 0;
		this.position = new Vector(x, y);
		this.velocity = new Vector(0,0);
		this.acceleration = new Vector(0,0);
		this.a = a;
		this.drag = drag;
		this.collision = false;
		this.lasers = [];
	}
	
	update(width, height, meteors)
	{
		/*Linear displacement*/
		this.velocity.add(this.acceleration);
		this.velocity.multiply(this.drag);
		this.position.add(this.velocity);
				
		/*Rotation angle*/
		this.rotation += this.angle;
		
		this.edges(width, height);
		
		/*Check collisions*/
		for(let i in meteors)
		{
			if(CircleCollision(this, meteors[i]))
			{
				this.collision = true;
			}
		}
		
		/*Update lasers position*/
		for(let i in this.lasers)
		{
			/*Laser out of screen bounds erase it or hitted a meteor*/
			let e = this.lasers[i].update(width, height, meteors);
			let ev = e[0];
			let index = e[1];
			
			switch(ev)
			{
			/*Laser is out of the screen just erase it*/
			case "OUT":
				this.lasers.splice(i, 1);
				break;
			/*Laser hitted a meteor, split meteor in two, 
			erase laser and increment score*/
			case "HIT":
				let nm = meteors[index].split();
				if(nm != null)
				{
					meteors.push(nm[0]);
					meteors.push(nm[1]);
				}
				this.lasers.splice(i, 1);
				meteors.splice(index, 1);
				break;
			default:
				break;
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
		context.moveTo(0, -this.r);
		context.lineTo(this.r, 0);
		context.lineTo(0, this.r);
		context.closePath();
		context.stroke();
		context.restore();
		
		for(let i in this.lasers)
		{
			this.lasers[i].render(context, this);
		}
	}
	
	thrust(state)
	{
		if(state)
		{
			
			let ax  = this.a*Math.cos(this.rotation);
			let ay = this.a*Math.sin(this.rotation); 
			this.acceleration.x = ax;
			this.acceleration.y = ay;
		}
		else
		{
			this.acceleration.x = 0;
			this.acceleration.y = 0;
		}
	}
	
	rotate(state)
	{
		switch(state)
		{
		case "Right":
			this.angle = (Math.PI/30);
			break;
		case "Left":
			this.angle = -(Math.PI/30);
			break;
		case "Stop":
			this.angle = 0;
			break;
		}
	}
	
	shot()
	{
		/*Create new laser*/
		this.lasers.push(new Laser(this.position.x, this.position.y, 10, this.rotation));
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
}