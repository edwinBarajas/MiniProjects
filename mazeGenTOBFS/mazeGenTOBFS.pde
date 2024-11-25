//vamos a animar bfs y si algo dfs para buscar short path

int res, n;
Node current;
Node graph[][];
int rows, cols;
ArrayList<Node> stack;

ArrayList<Node> queue_to_bfs, checked;

Node start, end;

void setup() {
  n = 0;
  size(600, 600);
  res = 20;
  rows = int(height / res);
  cols = int(width / res);



  //definir las filas
  graph = new Node[rows][cols];


  //en cada spot del grafo un nodo
  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      graph[i][j] = new Node(i, j);
    }
  }
  //a cada nodo agregar aristas o vecinos
  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      if (i < rows - 1) {
        graph[i][j].add_neighbor(graph[i + 1][j]);
      }
      if (i > 0) {
        graph[i][j].add_neighbor(graph[i - 1][j]);
      }
      if (j < cols - 1) {
        graph[i][j].add_neighbor(graph[i][j + 1]);
      }
      if (j > 0) {
        graph[i][j].add_neighbor(graph[i][j - 1]);
      }
      int n = graph[i][j].neighbors.size();
      for (int k = n -1; k>=0; k--) {
        int l = (int) random(k + 1);

        // Intercambiar list[i] con list[j]
        Node temp = graph[i][j].neighbors.get(k);
        graph[i][j].neighbors.set(k, graph[i][j].neighbors.get(l));
        graph[i][j].neighbors.set(l, temp);
      }
    }
  }

  //escoger harcoded principio y fin
  stack = new ArrayList<Node>();
  queue_to_bfs = new ArrayList<Node>();
  checked = new ArrayList<Node>();


  start = graph[res - res/2][res - res/2];





  end = graph[rows - 1][cols - 1];

  //usamos un stack con bfs
  //stack.add(start);
  current = start;
  stack.add(current);

  while (stack.size() > 0) {

    current.visited = true;

    int index = -1;

    for (int i = 0; i < current.neighbors.size(); i++) {
      if (current.neighbors.get(i).visited ==false) {
        index = i;
        break;
      }
    }

    if (index != -1) {
      Node n = current.neighbors.get(index);
      n.visited = true;
      stack.add(current);
      current.remove_wall(n);
      current = n;
    } else if (stack.size() > 0) {
      current = stack.remove(stack.size() - 1);
    }
  }

  start = graph[0][0];
  queue_to_bfs.add(start);
  checked.add(start);
}

void draw() {

  background(0);

  Node to_check = queue_to_bfs.remove(0);
  for (Node neighbor : to_check.final_n) {
    if (!checked.contains(neighbor)) {
      checked.add(neighbor);
      queue_to_bfs.add(neighbor);
      neighbor.parent = to_check;
    }
  }


  //show



  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      graph[i][j].show();
    }
  }
  fill(200, 0, 200);
  rect(to_check.x, to_check.y, res, res);
  /*for(Node nod: checked){
   noStroke();
   fill(0, 180, 0);
   square(nod.x + 1, nod.y + 1, res - 1);
   }*/

  if (to_check == end) {
    Node curr = end;
    while (curr != null) {
      curr.show(color(150, 0, 150));
      curr = curr.parent;
    }
    noLoop();
    print("Endddddd");
  }
}
