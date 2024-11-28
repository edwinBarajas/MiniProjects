//Code by Edwin Barajas
//It may not be the best, but I'm learning and 
//I will come back to improve it!


//TODO:
// Re build the shortest path
// Try with the maze generator




//columnas y filas del grafo y del gráfico
//resolucón de cada nodo
let cols, rows, res;
let graf;
let bheap;

//Nodo inicial y distancias
let begin;
let distances;

function setup() {
  createCanvas(400, 400);
  res = 40;
  cols = width / res;
  rows = height / res;
  graf = new Graph(rows, cols);

  begin = graf.graph[0][0];
  bheap = new Heap([begin, 5]);

  //Inicializar todas las distancias a Infinito
  distances = [];
  for (let i = 0; i < cols; i++) {
    distances[i] = new Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      distances[i][j] = Infinity;
    }
  }
  //La distancia del nodo inicial se deja en 0
  distances[0][0] = 0;

}

function draw() {
  frameRate(10);
  background(220);
  graf.show();

  //Seguir mientras haya elementos en el heap
  if (bheap.n > 0) {
    
    const [current_node, current_cost] = bheap.heappop();

    current_node.show(color(0, 200, 0));
    
    //Indices para acceder a las distancias
    let c_i = current_node.i;
    let c_j = current_node.j;

    //Procesar los vecinos y costos del nodo actual
    for (const [neighb, we] of current_node.neighbors) {
      let d = current_cost + we;
      if (d < distances[neighb.i][neighb.j]) {
        distances[neighb.i][neighb.j] = d;
        bheap.heappush([neighb, d]);
      }
    }
    //mostrar los nodos que están en el heap
    for (item of bheap.heap){
      item[0].show(color(0, 0, 150));
    }
    
  } else {
    print("finished");
    noLoop();
  }
}
