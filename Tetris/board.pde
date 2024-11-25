class Board {


  int x_spots, y_spots;
  int res;

  Board() {

    this.x_spots = 10;
    this.y_spots = 20;
    this.res = width / this.x_spots;

  }

  void show() {
    stroke(100);
    noFill();
    int r = this.res;
    for (int i = 0; i < this.x_spots; i++) {
      for (int j = 0; j < this.y_spots; j++) {
        rect(i * r, j*r, r, r);
      }
    }
  }
}
