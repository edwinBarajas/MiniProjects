class Car {
  constructor(x, y, h, w, dna = null) {
    this.x = x;
    this.y = y;
    this.pos = createVector(this.x, this.y);
    this.vel = createVector();
    this.acc = createVector();
    this.crashed = false;

    this.w = w;
    this.h = h;
   

    //genetics
    if (dna == null){
      this.dna = new Dna(lifespan);
    }else{
      this.dna = dna;
    }
    
    this.fitness = 0;
  }
  

  
  calculate_fitness() {
    
    // this.fitness += 3 * (1 / this.pos.y);
    this.fitness += exp(-this.pos.y);
    this.fitness += this.pos.x / 10;
    
    // if(this.crashed){
    //   this.fitness *= 0.8;
    // }
    if (this.pos.x> width - (wide + 5) && this.pos.y < (wide + 5) ){
      this.fitness *= 50;
    }
    
  }

  update() {
    this.apply_force(this.dna.genes[current_gen]);

    if (this.pos.x < 5 || this.pos.x > width) {
      this.crashed = true;
    }
    
    if (this.pos.y < 0 || this.pos.y > height) {
      this.crashed = true;
    }
    
    //lets hardcode the crash with the track, refactor later
    
    if ((this.pos.y > wide && this.pos.y < height) && 
        this.pos.x > wide-5 && this.pos.x < wide+5 ) {
      this.crashed = true;
    }
    
    if ((this.pos.x > wide && this.pos.x < width) && 
        this.pos.y > wide-5 && this.pos.y < wide+5 ) {
      this.crashed = true;
    }
    
    
    
    if (!this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.vel.limit(4);
      this.acc.mult(0);
    }
  }

  show() {
    fill(200, 0, 0, 150);
    push();
    translate(this.pos.x, this.pos.y);

    rotate(this.vel.heading());

    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }

  apply_force(force) {
    this.acc.add(force);
  }
}
