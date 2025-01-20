let angleX = 0;
let angleY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  position = createVector(width / 2, height / 2, 0);
}

function draw() {
  background(240);

  rotateCanvas();

  drawDroneBody();

  drawPropellers();
}

function rotateCanvas() {
  orbitControl();
}

function drawDroneBody() {
  ambientMaterial(100, 100, 255);
  shininess(20);
  specularMaterial(150, 150, 255);

  box(60, 20, 10);
  translate(0, 0, 5);
  cylinder(5, 30, 8, 8);
}

function drawPropellers() {
  rotatePropellers();
  drawPropeller(-25, -25);
  drawPropeller(25, -25);
  drawPropeller(-25, 25);
  drawPropeller(25, 25);
}

function rotatePropellers() {
  rotateX(angleX);
  rotateY(angleY);
  angleX += 0.1;
  angleY += 0.1;
}

function drawPropeller(x, y) {
  ambientMaterial(150);
  shininess(0);

  push();
  translate(x, y, 5);
  rotateZ(PI / 4);
  cylinder(1, 20, 4, 1, true, true);
  pop();
}

function drawConnection(x1, y1, z1, x2, y2, z2) {
  stroke(150); 
  strokeWeight(2); 
  line(x1, y1, z1, x2, y2, z2);
}
function drawPropellers() {
  rotatePropellers();
  drawPropeller(-25, -25);
  drawPropeller(25, -25);
  drawPropeller(-25, 25);
  drawPropeller(25, 25);

  drawConnection(-25, -25, 5, 25, -25, 5);
  drawConnection(-25, 25, 5, 25, 25, 5);
  drawConnection(-25, -25, 5, -25, 25, 5);
  drawConnection(25, -25, 5, 25, 25, 5);
}