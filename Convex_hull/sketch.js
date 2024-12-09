/*
* Algoritmo de Jarvis para calcular el Convex Hull (Envolvente Convexa)
* Objetivo: Encontrar el polígono más pequeño que contiene todos los puntos 
* y cuya forma es convexa (sin ángulos interiores mayores de 180°).

 * Funcionamiento general:
 * 1. Se selecciona el punto más a la izquierda como punto inicial.
 * 2. A partir de este punto, se selecciona el siguiente punto del convex hull 
 *    buscando siempre el punto más a la izquierda relativo al punto actual.
 * 3. El proceso continúa hasta regresar al punto inicial, cerrando el polígono.

*/
// Declaración de variables globales
let points = []; // Array para almacenar los puntos generados aleatoriamente.
let convex_hull = []; // Array para almacenar los puntos que forman el convex hull.

let current_point; // Variable para rastrear el punto actual del algoritmo.
let limit, current_index; // 'limit' define el número total de puntos. 'current_index' es el índice del punto que se está procesando.
let left_most_index; // Índice del punto más a la izquierda, utilizado como punto inicial para el convex hull.

function setup() {
  createCanvas(420, 420);

  // Generación de 15 puntos aleatorios dentro del canvas
  for (let i = 0; i < 15; i++) {
    let x = random(20, width - 20); // Coordenada x dentro de los márgenes.
    let y = random(20, height - 20); // Coordenada y dentro de los márgenes.
    points.push({ x, y }); // Agregar el punto como objeto {x, y} al array.
  }

  // Ordenar los puntos por su coordenada x en orden ascendente
  points.sort((a, b) => a.x - b.x);

  // Inicialización de variables para el algoritmo
  limit = points.length; // Número total de puntos generados.
  current_index = 1; // Comenzamos a procesar desde el segundo punto.
  left_most_index = 1; // Al inicio, asumimos que el punto más a la izquierda es el primero.

  // Agregar el punto más a la izquierda al convex hull
  convex_hull.push(points[0]);
  current_point = convex_hull[0]; // Establecer el punto inicial como el punto más a la izquierda.
}


function draw() {
  frameRate(10);
  background(220);

  //Dibujar todos los puntos
  stroke(0);
  strokeWeight(4);
  for (let po of points) {
    point(po.x, po.y);
  }

  //Dibujar el convex hull
  stroke(100, 0, 100);
  for (let i = 0; i < convex_hull.length; i++) {
    let p = convex_hull[i];
    //circle(p.x, p.y, 4);
    if (i + 1 < convex_hull.length) {
      let p2 = convex_hull[i + 1];
      line(p.x, p.y, p2.x, p2.y);
    }
  }

  //Puntos a evaluar respecto al ultimo punto del ch
  //p_a: El punto más a la izquierda hasta el momento
  let p_a = points[left_most_index];
  //p_b: punto a evaluar actual
  let p_b = points[current_index];

  //cross: el cross product de los 2 puntos referentes al ultimo punto
  //del convex hull(current_point)
  let cross = cross_product(current_point, p_a, p_b);
  
  /*
  Si el resultado del cross product es menor que 0, el punto actual es el que está
  más a la izquierda respecto al current_point
  */
  if (cross < 0) {
    left_most_index = current_index;
  }
  
  /*OPCIONAL:
  línea del punto actual al punto que se está evaluando
  */
  stroke(0, 150, 0);
  line(
    current_point.x,
    current_point.y,
    points[current_index].x,
    points[current_index].y
  );
  
  //mostrar el punto mas a la izquierda
  circle(points[left_most_index].x, points[left_most_index].y, 8);
  current_index++;

  //Si el "current index" llega al limite(el tamaño del array de puntos), entonces:
  if (current_index == limit) {
    //Si el punto más a la izquierda es 0, ya terminó
    //Se cierra el polígono y se termina el ciclo
    if (left_most_index == 0) {
      stroke(100, 0, 100);
      let last_c_indx = convex_hull.length-1;
      let last_point = convex_hull[last_c_indx];
      let p = convex_hull[0];
      line(p.x, p.y, last_point.x, last_point.y);
      noLoop();
    }
    //si no, se añade un nuevo punto al polígono y se reinician los valores de las 
    //variables
    convex_hull.push(points[left_most_index]);
    current_point = points[left_most_index];
    current_index = 0;
    left_most_index = convex_hull.length - 1;

  }
}
/*
*Con la función cross product se calcula orientación de 2 puntos referentes a otro punto
 * Parámetros:punto de referencia, point_a, point_b.
 *
 * Retorno:
 * - Un número que indica la orientación de los tres puntos:
 *   > 0: Giro en sentido antihorario (punto_b está a la izquierda del segmento reference -> point_a).
 *   < 0: Giro en sentido horario (punto_b está a la derecha del segmento reference -> point_a).
 *   = 0: Los puntos son colineales.
*/
function cross_product(reference, point_a, point_b) {
  //translate to the reference point
  let a = { x: point_a.x - reference.x, y: point_a.y - reference.y };
  let b = { x: point_b.x - reference.x, y: point_b.y - reference.y };

  return a.x * b.y - a.y * b.x;
}
