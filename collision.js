function CircleCollision(circle1, circle2)
{
	let dx = circle1.position.x - circle2.position.x;
	let dy = circle1.position.y - circle2.position.y;
	let distance  = Math.sqrt(dx * dx + dy * dy);
		
	if(distance < circle1.r + circle2.r)
	{
		return true;
	}
	
	return false;
}

function SquareCollision(rectangles1, rectangles2)
{

}

function PointCollision(point, shape)
{
	let dx = point.position.x - shape.position.x;
	let dy = point.position.y - shape.position.y;
	let distance  = Math.sqrt(dx * dx + dy * dy);
	
	if(distance <= shape.r)
	{
		return true;
	}
	
	return false;
}