let p1, p2, p3;
function setup() {
  createCanvas(400, 400);
  p1 = { x: 0, y: height - 1 };
  p2 = { x: width / 2, y: 0 };
  p3 = { x: width, y: height - 1 };
}

function draw() {
  background(220);
  noFill();
  drawTriangle(p1, p2, p3);
  noLoop();
}

function drawTriangle(p_1, p_2, p_3) {
  if (abs(p_1.y - p_2.y) < 10) {
    stroke(0);
    triangle(p_1.x, p_1.y, p_2.x, p_2.y, p_3.x, p_3.y);

    return;
  }


  let new_p1 = {
    x: p_1.x + (p_2.x - p_1.x) / 2,
    y: p_2.y + (p_1.y - p_2.y) / 2,
  };
  let new_p2 = {
    x: p_2.x + (p_3.x - p_2.x) / 2,
    y: p_3.y - (p_3.y - p_2.y) / 2,
  };
  let new_p3 = { x: p_1.x + (p_3.x - p_1.x) / 2, y: p_1.y };

  drawTriangle(p_1, new_p1, new_p3);
  drawTriangle(new_p1, p_2, new_p2);
  drawTriangle(new_p3, new_p2, p_3);

}
