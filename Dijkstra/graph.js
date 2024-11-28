//estructura de datos para cada nodo del grafo
class Node {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = j * res;
    this.y = i * res;
    this.is_obstacle = false;
    this.neighbors = [];
  
  }

  show(colo = color(255)) {
    stroke(0);
    fill(colo);
    if (this.is_obstacle) {
      fill(0);
    }
    square(this.x, this.y, res);
  }
}

//clase Grafo
class Graph {
  constructor(rows, cols) {
    //Definir nro de filas y columnas
    this.rows = rows;
    this.cols = cols;

    this.graph = [];

    //inicializar el grafo
    for (let i = 0; i < this.rows; i++) {
      this.graph[i] = new Array(this.cols);
    }
    //crear obstaculos random
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.graph[i][j] = new Node(i, j);
        if (random() < 0.15) {
          this.graph[i][j].is_obstacle = true;
        }
      }
    }

    //asignar vecinos
    //asignar pesos a cada vecino

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.graph[i][j].is_obstacle) {
          continue;
        }

        const dirs = [
          [1, 0], // Right
          [-1, 0], // Left
          [0, 1], // Down
          [0, -1], // Up
        ];
        //iterar sobre las direccione para evitar hacer ifs repetitivos
        for (const [dx, dy] of dirs) {
          const nI = i + dx;
          const nJ = j + dy;

          if (nI >= 0 && nI < this.cols && nJ >= 0 && nJ < this.rows) {
            if (!this.graph[nI][nJ].is_obstacle) {
              this.graph[i][j].neighbors.push([this.graph[nI][nJ], nI+ nJ]);
            }
          }
        }
      }
    }
  }

  show() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.graph[i][j].show();
      }
    }
  }
}
