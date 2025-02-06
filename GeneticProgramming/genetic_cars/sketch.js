let current_gen = 0;
let maxforce;

let target;
let wide;

let lifespan;
let lifespanp;
let gen, genp;
let pop_size;
let mutation_rate;

function setup() {
  createCanvas(400, 400);

  wide = 100;
  
  maxforce = 0.2;
  lifespan = 300;
  lifespanp = createP();
  gen = 0;
  genp = createP();
  pop_size = 50;
  
  population = new Population(pop_size, 20, height- 20);
  mutation_rate = 0.01;
  
  target = [width - wide, 0, wide];
}

function draw() {
  background(220);
  population.show();
  lifespanp.html(current_gen);
  genp.html(gen);
  current_gen++;
  if (current_gen == lifespan){
    current_gen = 0;
    population.selection();
    population.reproduction();
    // noLoop();
    gen++;
  }
  
  //show target
  fill(0, 150, 0);
  square(target[0], target[1], target[2]);
  
  line(wide, wide, wide, height);
  line(wide, wide, width, wide);


}
