import population, dna 
import os, time
# import random as rd 

target = "ser o no ser esa es la cuestion"
# target = "hola"

mutation_rate = 0.01
population_size = 200

#step 1
new_pop = population.Population(population_size, target, mutation_rate)


#step 2

gen = 0
while True:

  os.system("cls")
  print(f"generation: {gen}")
  gen += 1
  new_pop.calculate_fitness()
  #matin pool
  new_pop.gen_candidates()
  new_pop.reproduction()
  # new_pop.pick_one()
  # print()
  new_pop.show()
  if new_pop.evaluate():
    print("finished")
    break
  # break
