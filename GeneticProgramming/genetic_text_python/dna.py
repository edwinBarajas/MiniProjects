import random as rd
chars = " abcdefghijklmnopqrstuvwxyz"

class Dna:

  def __init__(self, length, target, dna = None):

    
    if dna is None:
      self.dna = []
      for i in range(length):
        self.dna.append(chars[rd.randint(0, len(chars)-1)])
    else:
      self.dna = dna
    self.target = target
    self.fitness = 0

    

  def show(self):
    output = "".join(self.dna)
    print(f"{output} ftns: {self.fitness}")

  def calc_fitness(self):
    for target_char, this_char in zip(self.target, self.dna):
      if target_char == this_char:
        self.fitness += 1
    self.fitness = self.fitness / len(self.target)
    # return self.fitness

  def crossover(self, parentB):
    # mid_point = len(self.target) // 2
    mid_point = rd.randint(0, len(self.dna)-1)
    new_dna = self.dna[:mid_point] + parentB.dna[mid_point:]

    

    #to inheritance
    t = self.target
    length = len(self.target)

    # print(new_dna)
    return Dna(length, t, new_dna)


  def mutate(self, mutation_rate):
    # if rd.random() < mutation_rate:
    #   indx = rd.randint(0, len(self.dna) - 1)
    #   self.dna[indx] = chars[rd.randint(0, len(chars)-1)]
    for i in range(len(self.dna)):
      if rd.random() < mutation_rate:
        self.dna[i] = chars[rd.randint(0, len(chars)-1)]



    #lets try to merge the two dnas but searching the best result
    # new_dna = []
    # for i in range(len(self.dna)):
    #   pa_adn = self.dna[i]
    #   pb_adn = parentB.dna[i]
    #   if pa_adn == self.target[i]:
    #     new_dna.append(pa_adn)
    #     continue
    #   if pb_adn == self.target[i]:
    #     new_dna.append(pb_adn)
    #     continue
    #   new_dna.append([pa_adn, pb_adn][rd.randint(0, 1)])