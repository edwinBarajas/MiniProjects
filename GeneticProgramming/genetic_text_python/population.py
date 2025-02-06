import dna
import random as rd

def my_map(val, min_val, max_val, min_obj, max_obj):
  rangea = max_val - min_val
  rangeobj = max_obj - min_obj
  rangeobj /= rangea

  return (min_obj + val * rangeobj)




class Population:

  def __init__(self, pop_size, target, mutation_rate):
    self.dna = []
    self.matin_pool = []
    self.mutation_rate = mutation_rate
    self.pop_size = pop_size
    self.target = target


    #create the population
    for i in range(pop_size):
      self.dna.append(dna.Dna(len(target), target))

  def show(self):
    print(self.pop_size)
    print(self.target)

    for n in range(10):
      self.dna[n].show()

  def calculate_fitness(self):
    for adn in self.dna:
      adn.calc_fitness()


  def gen_candidates(self):
    self.matin_pool = []

    best_obj = max(self.dna, key = lambda adn: adn.fitness)
    best_fitness = best_obj.fitness

    # for adn in self.dna:
    #   if adn.fitness  > best_fitness:
    #     best_fitness = adn.fitness


    # print(f"best_fitnes: {best_fitness}")
    print("best till now:")
    best_obj.show()

    #normalize the fitness
    #there are two options to normalize
    # 1. divide all finess by the max fitness
    # 2. map the fitness between 0 and 1, based in the max fitness

    #normalize the fitness
    for adn in self.dna:
      adn.fitness = my_map(adn.fitness, 0, best_fitness, 0, 1)

    for adn in self.dna:
      # prob = adn.fitness * 100
      # if adn.fitness == 0: continue
      prob = my_map(adn.fitness, 0, best_fitness, 0, 1) * 100
      for i in range(int(prob)):
        self.matin_pool.append(adn)



    print(f"len mpool: {len(self.matin_pool)}")


  def reproduction(self):
    #create the new generation from the mating pool
    for i in range(len(self.dna)):
      # parentA = self.pick_one()
      # parentB = self.pick_one()
      parentA = self.matin_pool[rd.randint(0, len(self.matin_pool) - 1)]
      parentB = self.matin_pool[rd.randint(0, len(self.matin_pool) - 1)]
      child = parentA.crossover(parentB)
      child.mutate(self.mutation_rate)
      self.dna[i] = child


  def evaluate(self):
    for adn in self.dna:
      curr_len = 0
      if "".join(adn.dna) == self.target:
        return True
          
    return False
      

  def pick_one(self):
    rand = rd.random()
    i = 0
    while rand>0:
      rand -= self.dna[i].fitness
      i += 1
    i-=1
    # self.dna[i].show()

