
class Node {
  int i, j, x, y, val;
  ArrayList<Node> neighbors;
  Node parent;

  boolean start, end;
  boolean visited, walls[];
  Node(int i, int j) {
    this.val = i + j * (height / res);
    this.i = i;
    this.j = j;
    this.x = i * res;
    this.y = j * res;
    this.neighbors = new ArrayList<Node>();
    this.parent = null;
    this.walls = new boolean[]{true, true, true, true};//[up, right, down, left]
    this.visited = false;
    this.start = false;
    this.end = false;
  }


  void show() {
    /*fill(255);
    noStroke();
    square(this.x, this.y, res);*/

    stroke(255);
    strokeWeight(2);
    if (this.walls[0]) line(this.x, this.y, this.x + res, this.y);//up
    if (this.walls[1]) line(this.x + res, this.y, this.x + res, this.y + res);//right
    if (this.walls[2]) line(this.x, this.y +res, this.x + res, this.y + res);//bottom
    if (this.walls[3]) line(this.x, this.y, this.x, this.y + res);//left
  }

  void add_neighbor(Node neighbor) {
    this.neighbors.add(neighbor);
  }

  void remove_wall(Node n) {
    if (this.i - n.i == 1) {
      this.walls[3] = false;
      n.walls[1] = false;
    }
    if (this.i - n.i == -1) {
      this.walls[1] = false;
      n.walls[3] = false;
    }
    if (this.j - n.j == 1) {
      this.walls[0] = false;
      n.walls[2] = false;
    }
    if (this.j - n.j == -1) {
      this.walls[2] = false;
      n.walls[0] = false;
    }
  }
}
