class Graph {
  
  constructor(cells) {
    this.cells = cells;
    this.graph = [];

    for (let i = 0; i < this.cells; i++) {
      this.graph[i] = new Array(this.cells);
    }

    for (let j = 0; j < this.cells; j++) {
      for (let i = 0; i < this.cells; i++) {
        this.graph[i][j] = new Node(i, j);
      }
    }

    this.addNeighbors();
  }

  addNeighbors() {
    const deltas = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];

    for (let j = 0; j < this.cells; j++) {
      for (let i = 0; i < this.cells; i++) {
        for (let [dx, dy] of deltas) {
          let fx = i + dx;
          let fy = j + dy;
          if (fy < this.cells && fy >= 0 && fx < this.cells && fx >= 0) {
            this.graph[i][j].addNeighbor(this.graph[fx][fy]);
          }
        }

        this.shuffle(this.graph[i][j].neighbors);
      }
    }
  }

  get_node(i, j) {
    return this.graph[i][j];
  }

  show() {
    for (let j = 0; j < this.cells; j++) {
      for (let i = 0; i < this.cells; i++) {
        this.graph[i][j].show();
      }
    }
  }

  shuffle(array) {
    // Recorremos el array desde el final hasta el inicio
    for (let i = array.length - 1; i > 0; i--) {
      // Generamos un índice aleatorio entre 0 e i
      const j = Math.floor(Math.random() * (i + 1));

      // Intercambiamos los elementos en las posiciones i y j
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  remove_wall(node_a, node_b){
    if (node_a.x - node_b.x > 0){// remove a left, b right
      node_a.walls[3] = false;
      node_b.walls[1] = false;
    }
    if (node_a.x - node_b.x < 0){// remove a right, b left
      node_a.walls[1] = false;
      node_b.walls[3] = false;
    }
    
    if (node_a.y - node_b.y > 0){// remove a up, b down
      node_a.walls[0] = false;
      node_b.walls[2] = false;
    }
    if (node_a.y - node_b.y < 0){// remove a down, b up
      node_a.walls[2] = false;
      node_b.walls[0] = false;
    }
    
    node_a.final_neig.push([node_b, 1]);
    node_b.final_neig.push([node_a, 1]);
  }
}
