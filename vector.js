class Vector
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
	
	add(Vector)
	{
		this.x = this.x + Vector.x;
		this.y = this.y + Vector.y;
		
	}
	
	subtract(Vector)
	{
		this.x = this.x - Vector.x;
		this.y = this.y - Vector.y;
	}
	
	multiply(scalar)
	{
		this.x = this.x * scalar;
		this.y = this.y * scalar;
		
	}
}