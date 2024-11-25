//vamos a animar bfs y si algo dfs para buscar short path

int res, n;
Node current;
Node graph[][];
int rows, cols;
ArrayList<Node> stack;
Node start, end;

void setup() {
  n = 0;
  size(600, 600);
  res = 50;
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
  start = graph[0][0];
  graph[0][0].start = true;
  end = graph[rows - 1][cols - 1];
  end.end = true;
  //usamos un stack con bfs
  //stack.add(start);
  current = start;
}

void draw() {
  n++;
  background(0);
  frameRate(10);

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

  //show
  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      graph[i][j].show();
    }
  }

  fill(0, 200, 0);
  square(current.x, current.y, res);

  if (stack.size() == 0) {
    print("finished");
    noLoop();
  } else {
   
  }
}
