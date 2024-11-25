
int [][][] structs2 = {
  {{0, 0, 0, 0}, {1, 1, 1, 1}, {0, 0, 0, 0}, {0, 0, 0, 0}},
  {{1, 1}, {1, 1}},
  {{0, 1, 0}, {1, 1, 1}, {0, 0, 0}}, // 1
  {{0, 1, 1}, {1, 1, 0}, {0, 0, 0}}, // s
  {{1, 1, 0}, {0, 1, 1}, {0, 0, 0}}, // z
  {{1, 0, 0}, {1, 1, 1}, {0, 0, 0}}, // L
  {{0, 0, 1}, {1, 1, 1}, {0, 0, 0}}, // 7
};
color colors[] = {
  color (255, 182, 193), //(0, 120, 215),
  color (189, 252, 201), //(255, 59, 48),
  color (173, 216, 230), //(255, 204, 0),
  color (255, 239, 213), //(52, 199, 89),
  color (221, 160, 221), //(255, 182, 193),
  color (255, 218, 185), //(180, 130, 255),
  color (230, 230, 250), //(255, 159, 64)
};

class Tetrimino {
  int[][] struct;
  int index;

  ArrayList<Coord> coords;

  int x, y, dim;

  boolean finished;
  Tetrimino(int index) {
    this.x = 4;
    this.y = -2;
    this.index = index;
    this.struct = structs2[index];
    this.dim = this.struct.length;
    this.coords = new ArrayList<Coord>();
    set_coords();
    this.finished = false;
  }

  void show() {
    fill(colors[this.index]);
    noStroke();
    for (int i = 0; i < this.coords.size(); i++) {
      Coord c = this.coords.get(i);
      //fill(255 - 255 / (i+1));
      square(c.x, c.y, res);
    }
  }

  void update() {
    HashSet<Coord> setPuntosGrandes = new HashSet<Coord>(stacks);
    for (int i = 0; i < this.coords.size(); i ++) {
      Coord c = this.coords.get(i);
      Coord centinel = new Coord(c.x, c.y + res);
      if (setPuntosGrandes.contains(centinel) || c.y== (height - 1) - res) {
        this.finished = true;
        return;
      }
    }
    this.y++;

    for (int i = 0; i < this.coords.size(); i++) {
      Coord c = this.coords.get(i);
      c.update_y(c.y+res);
    }
  }

  void rotate(int dir) {
    if (this.index == 1) return;
    if (dir == 1) {
      if (this.x == (width - 1) - res && this.x == width- 1 -res*this.dim)return;
    }
    this.rotate_matrix(dir);
    this.set_coords();
  }

  void rotate_matrix(int dir) {
    HashSet<Coord> setPuntosGrandes = new HashSet<Coord>(stacks);
    int [][] aux = new int[this.dim][this.dim];
    for (int i = 0; i < this.dim; i++) {
      int a = dir == 1? i: this.dim - 1 -i;
      for (int j = this.dim -1; j >= 0; j--) {
        if (this.struct[j][i] != 1) continue;

        int b = dir == 1? this.dim - 1 -j: j;

        Coord aux_spot = new Coord((b+this.x) * res, (a + this.y) * res);

        if (setPuntosGrandes.contains(aux_spot)) {
          if (setPuntosGrandes.contains(new Coord(aux_spot.x, aux_spot.y-res))) {
            return;
          } else {

            this.y--;
            i =0;
            //print("\n", i, "hay que hacer algo");
            break;
          }
        }

        int upper_limit = this.index==0?7:8;

        if (((b + this.x )* res) >= width -1 ||  ((b + this.x )* res) <0) {

          if (this.x <= 0) {
            this.x++;
          } else if (this.x >= upper_limit) {
            this.x--;
          }
          i = 0;
          aux = new int[this.dim][this.dim];
        }
        if (this.y >= upper_limit + 10) {

          this.y--;
        }


        aux[a][b] = this.struct[j][i];
      }
    }

    this.struct = aux;
  }

  void set_coords() {
    ArrayList<Coord> aux = new ArrayList();
    for (int i = 0; i < this.dim; i++) {
      for (int j = 0; j < this.dim; j++) {
        if (this.struct[i][j] == 0)continue;
        aux.add(new Coord((j + this.x )* res, (i + this.y)* res));
      }
    }
    this.coords = aux;
  }

  void move_horizontal(int dir) {
    int limite = (dir == 1) ? (width -1) - res : 0;
    if (!this.available(limite, dir)) return;

    this.x += dir;

    for (int i = 0; i < this.coords.size(); i++) {
      Coord c = this.coords.get(i);
      c.update(c.x + (dir * res), c.y);
    }
  }

  boolean available(int limite, int dir) {
    HashSet<Coord> setPuntosGrandes = new HashSet<Coord>(stacks);
    //if (setPuntosGrandes.contains(p)) {
    for (int i = 0; i < this.coords.size(); i++) {
      Coord c = this.coords.get(i);
      Coord c2 = new Coord(c.x + res * dir, c.y );
      if (setPuntosGrandes.contains(c2) || c.x == limite) {
        return false;
      }
    }
    return true;
  }
}
