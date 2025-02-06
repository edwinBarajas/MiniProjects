class Population {
  constructor(pop_size, st_x, st_y) {
    this.pop_size = pop_size;
    this.population = [];
    this.st_x = st_x;
    this.st_y = st_y;
    this.init_pop();
    this.matin_pool = [];
  }

  selection() {
    this.matin_pool = [];
    let max_fit = 0;
    for (let i = 0; i < this.pop_size; i++) {
      this.population[i].calculate_fitness();
      if (this.population[i].fitness > max_fit) {
        max_fit = this.population[i].fitness;
      }
    }

    //create mating pool
    for (let i = 0; i < this.pop_size; i++) {
      // print(this.population[i].fitness);
      let n = this.population[i].fitness / max_fit;
      
      for(let k = 0; k < int(n * 100); k++){
        this.matin_pool.push(this.population[i]);
      }
    }
  }
  
  
  reproduction(){
    for (let i = 0; i < this.pop_size; i++) {
      let parentA = random(this.matin_pool).dna;
      let parentB = random(this.matin_pool).dna;
      
      let child = parentA.crossover(parentB);
      child.mutation();
      
      this.population[i] = new Car(this.st_x, this.st_y, 10, 20, child);
    }
  }
  

  init_pop() {
    for (let i = 0; i < this.pop_size; i++) {
      // let car = new Car(200, 10, 10, 20);
      let car = new Car(this.st_x, this.st_y, 10, 20);
      this.population.push(car);
    }
  }

  show() {
    for (let i = 0; i < this.pop_size; i++) {
      this.population[i].update();
      this.population[i].show();
    }

  }
}
