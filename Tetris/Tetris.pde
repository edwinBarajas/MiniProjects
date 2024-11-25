import java.util.HashSet;
import java.util.Collections;
import java.util.Comparator;
import java.util.Arrays;

Board board;
Tetrimino tetri;
ArrayList<Coord> stacks;
int res;
PImage img;

ArrayList<Integer> indexes2;

void setup() {
  img = loadImage("carlos2.jpg");
  size(301, 601);
  //board = new Board();
  indexes2 = new ArrayList(Arrays.asList(0, 1, 2, 3, 4, 5, 6));
  res = 30;//board.res;
  tetri = new Tetrimino(get_index());
  stacks = new ArrayList<Coord>();
}

Integer get_index() {
  if (indexes2.size() == 0) {

    indexes2 = new ArrayList(Arrays.asList(0, 1, 2, 3, 4, 5, 6));
  }
  int ind = int(random(indexes2.size()));
  return indexes2.remove(ind);
}


void draw() {
  //background(194, 230, 221);//(127, 255, 212);
  background(img);
  if (stacks.size() > 0) {
    for (int i = 0, n = stacks.size(); i < n; i ++) {
      fill(121);
      square(stacks.get(i).x, stacks.get(i).y, res);
    }
  }

  //if (keyPressed) {
  //  int dir = 0;
  //  if (keyCode == RIGHT || keyCode == LEFT) {
  //    dir = -1 * (38- keyCode);
  //    tetri.move_horizontal(dir);
  //  }
  //}
  //frameRate(10);

  //print(frameRate + " ");
  //tetri.update();


  tetri.show();

  if (tetri.finished) {
    next();
    check_lines();
  }
}


void next() {
  stacks.addAll(tetri.coords);
  tetri = new Tetrimino(get_index());
}

void mousePressed() {
  stacks = new ArrayList();
}


void keyPressed() {
  if (key == 'z') {
    tetri.rotate(-1);
  }




  switch(keyCode) {
    case(RIGHT):
    tetri.move_horizontal(1);
    break;
    case(LEFT):
    tetri.move_horizontal(-1);
    break;
    
    case(UP):
    tetri.rotate(1);
    break;
    case(DOWN):
    tetri.update();
    break;
  }
}

void check_lines() {
  Collections.sort(stacks, new Comparator<Coord>() {
    @Override
      public int compare(Coord p1, Coord p2) {
      return p2.y - p1.y;  // Comparar por la coordenada y
    }
  }
  );

  int counter = 1, current_y = 0;

  ArrayList <Integer> ys = new ArrayList();

  for (int i = 0; i < stacks.size(); i++) {
    int current = stacks.get(i).y;
    if (current == current_y) {
      counter++;
    } else {
      counter = 1;
      current_y = current;
    }
    if (counter == 10) {
      ys.add(current_y);
    }
  }

  if (ys.size() > 0) {
    for (int i = 0, j = 0; i<stacks.size(); i++) {
      if (ys.get(j) == stacks.get(i).y) {
        stacks.subList(i, i+10).clear();
        j++;
        i--;
      }
      if (j == ys.size()) break;
    }


    for (int i = ys.size()-1; i >= 0; i--) {
      update_stacks_pos(ys.get(i));
    }
  }
}

void update_stacks_pos(int y_pos) {
  for (int j = stacks.size() - 1; j >=0; j--) {
    Coord c = stacks.get(j);
    if (c.y == y_pos) {
      return;
    }
    if (c.y<y_pos) {
      c.update_y(c.y + res);
    }
  }
}
