int arr[];
int res, size;

int curr, mob;
int lower_index;
void setup() {
  size(800, 600);
  res = 10;

  curr = 0;
  mob = 0;


  arr = new int[width / res];
  size = arr.length;


  for (int i = 0; i < size; i++) {
    arr[i] = int(map(i, 0, size, 0, height));
  }
  lower_index = 0;
  shuffle_array(arr, size);
}
void draw() {
  background(0);
  stroke(0);
  for (int k = 0; k < 10; k++) {
    //encontrar el menor
    if (arr[mob] < arr[lower_index]) {
      lower_index = mob;
    }


    mob++;
    //si el mob es el fin, reinicie
    if (mob >= size) {

      //if (lower_index != mob) {
      swap(arr, lower_index, curr);
      //}

      mob = ++curr;

      lower_index = mob;
    }


    if (curr >= size) {
      print("finished");
      noLoop();
    }



    for (int i = 0; i < size; i++) {
      if (i == mob) {
        fill(0, 255, 0);
      } else if (i == lower_index) {
        fill(255, 0, 0);
      } else if (i == curr) {
        fill(0, 0, 255);
      } else {
        fill(255);
      }
      rect(i * res, height - arr[i], res, arr[i]);
    }
  }
}

void shuffle_array(int[] array, int size) {
  for (int i = size -1; i >= 0; i--) {
    int indx = int(random(size));
    swap(array, i, indx);
  }
}

void swap(int[] array, int i, int j) {
  int temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
