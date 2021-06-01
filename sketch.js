let dots = [];
let dotColors = [];
let trails = [];
let trailLen = 3;
let t = 0;
let detail = 200;
let step = 1/detail;
let scale = 1;
let cx = 0;
let cy = 0;
// let ws, hs;


function dp(p, t) {
	return createVector( (-t^2 - p.x*p.y + t) , (-p.x*p.y + p.x*t + p.y + t) ).div(detail);
}

function dp1(p, t) {
	return createVector( -p.x^4 + p.y^3 + 7*p.x^2 , -p.y^6 + p.x^3 + 7*p.x^4 - p.y^2 - p.x  ).div(detail);
}

function dp2(p, t) {
	return createVector( (cos(p.y)*p.x^5), (cos(p.x)*p.y^3) ).div(detail);
}

function dp3(p, t) {
	return createVector( cos(p.y)*sin(t) , cos(p.x)*cos(t) ).div(detail);
}

function dp4(p, t) {
	return createVector( cos(p.y), cos(p.x) ).div(detail);
}

function dp5(p, t) {
	return createVector( p.y^2-tan(p.y)*p.x, p.y-p.x).div(detail);
}



function setup() {
	createCanvas(windowWidth, windowHeight);

	for(let i = 0; i < 5000; i++) {
		let w = width/scale/2/1;
		let h = height/scale/2/1;
		let sx = cx + 0;
		let sy = cy + 0;
		dots.push(createVector(random(-w+sx, w+sx), random(-h+sy, h+sy)));
	}

	for (let i = 0; i < dots.length; i++) {
		dotColors.push([random(180,255), random(180,255), random(180,255)]);
		trails.push([]);
	}

	background(20);
}

function draw() {
	// if (t < step*12) {
		background(20);	
	// }

	for (let i = 0; i < dots.length; i++) {
		dots[i].add(dp1(dots[i], t));
		trails[i].push(dots[i].copy());


		let color = dotColors[i];
		stroke(color[0], color[1], color[2]);
		strokeWeight(.6);
		if (i === 10)
			strokeWeight(1);

		for (let j = 0; j < trails[i].length-1; j++) {
			let v1 = trails[i][j].copy().mult(scale);
			let v2 = trails[i][j+1].copy().mult(scale);
			let xShift = width/2 + cx*scale;
			let yShift = height/2 - cy*scale;
			line(v1.x + xShift, -v1.y + yShift, v2.x + xShift, -v2.y + yShift);
		}
		if (trails[i].length > trailLen)
			trails[i].splice(0,1);
	}

	t += step;

	textSize(20);
	fill(240);
	strokeWeight(0.5);
	stroke(220);
	text("FPS: " + floor(frameRate()), 20, 20);

}