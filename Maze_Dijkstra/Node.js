class Node {
  constructor(x, y) {
    this.x = x * resolution;
    this.y = y * resolution;
    this.parent = null;
    this.neighbors = [];
    this.final_neig = [];
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  addNeighbor(neighbor) {
    this.neighbors.push(neighbor);
  }

  show(col = undefined) {
    if (col !== undefined) {
      fill(col);
      noStroke();
      square(this.x + 1, this.y + 1, resolution - 2);
    }

    stroke(0);
    strokeWeight(2);
    let res = resolution;
    //up
    if (this.walls[0]) {
      line(this.x, this.y, this.x + res, this.y);
    }
    //right
    if (this.walls[1]) {
      line(this.x + res, this.y, this.x + res, this.y + res);
    }
    //down
    if (this.walls[2]) {
      line(this.x, this.y + res, this.x + res, this.y + res);
    }
    //left
    if (this.walls[3]) {
      line(this.x, this.y, this.x, this.y + res);
    }
  }
}
