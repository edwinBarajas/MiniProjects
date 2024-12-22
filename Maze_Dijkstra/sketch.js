let resolution;
let cells;
let graph;

//dijkstra;
let distances = [];
let heap;
let start_node;
let goal;

//mitad de la resolucion
let m_r;

function setup() {
  createCanvas(400, 400);

  //Generate Maze
  cells = 20;

  resolution = int(width / cells);
  m_r = floor(resolution / 2);

  graph = new Graph(cells);

  generate_maze();

  //Dijkstra

  start_node = graph.get_node(0, 0);
  goal = graph.get_node(cells / 2 - 1, cells / 2 - 1);

  for (let i = 0; i < cells; i++) {
    distances[i] = new Array(cells);
  }

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      distances[i][j] = Infinity;
    }
  }

  distances[0][0] = 0;
  heap = new Heap([start_node, 0]);
}

function draw() {
  background(220);

  for (let node of heap.heap) {
    node[0].show(color(180, 0, 0));
  }

  goal.show(color(50, 10, 190));

  let [current_node, current_weight] = heap.heappop();

  print(current_node);
  for (let [neighbor, w] of current_node.final_neig) {
    neig_i = neighbor.x / resolution;
    neig_j = neighbor.y / resolution;

    let w_to_neig = w + current_weight;

    if (distances[neig_i][neig_j] > w_to_neig) {
      distances[neig_i][neig_j] = w_to_neig;
      heap.heappush([neighbor, w_to_neig]);
      neighbor.parent = current_node;
    }
  }

  graph.show();

  //show paths

  let path = current_node;

  while (path != null) {
    if (path.parent) {
      let pa = path.parent;
      stroke(10, 150, 0);
      line(path.x + m_r, path.y + m_r, pa.x + m_r, pa.y + m_r);
    }
    // path.show(color(10, 150, 0));
    path = path.parent;
  }

  if (heap.n == 0 || current_node === goal) {
    print("end");
    noLoop();
  }
}

function generate_maze() {
  let first = graph.get_node(5, 4);

  let stack = [];

  stack.push(first);

  let current_node = first;

  while (stack.length > 0) {
    current_node.visited = true;

    let indx = -1;

    curr_neighbors = current_node.neighbors;

    for (let i = 0; i < curr_neighbors.length; i++) {
      if (!curr_neighbors[i].visited) {
        stack.push(current_node);

        graph.remove_wall(current_node, current_node.neighbors[i]);
        current_node = current_node.neighbors[i];
        indx = i;
        break;
      }
    }
    if (indx == -1) {
      current_node = stack.pop();
    }
  }
}
