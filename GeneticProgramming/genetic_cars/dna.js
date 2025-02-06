class Dna {
  constructor(lifespan, genes = null) {
    this.lifespan = lifespan;

    if (genes === null) {
      this.genes = [];
      this.create_dna();
    } else {
      this.genes = genes;
    }
  }

  create_dna() {
    for (let i = 0; i < this.lifespan; i++) {
      this.genes.push(p5.Vector.random2D());
      this.genes[i].setMag(maxforce);
    }
  }
  crossover(other) {
    let lim = this.genes.length;
    let mid = floor(random(lim));

    let new_dna = [];

    for (let i = 0; i < mid; i++) {
      new_dna.push(this.genes[i]);
    }

    for (let i = mid; i < lim; i++) {
      new_dna.push(other.genes[i]);
    }

    return new Dna(this.lifespan, new_dna);
  }
  
  mutation() {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < mutation_rate) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }
}
