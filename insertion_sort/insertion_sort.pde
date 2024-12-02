int [] arr;
int size;
int res;
int current_pointer, mobile_pointer;

void setup() {
  size(800, 600);
  res = 5;
  arr = new int[width /res];
  size = arr.length;
  colorMode(HSB);
  current_pointer = 0;
  mobile_pointer = 1;

  for (int i = 0; i < size; i++) {
    arr[i]  = int(map(i, 0, size, height, 0));
  }
  shuffle_array(arr, size);
}

void draw() {
  background(0);

  //if (arr[mobile_pointer] < arr[mobile_pointer - 1]) {
  //  swap(arr, mobile_pointer, mobile_pointer - 1);
  //  //print(mobile_pointer - 1 + " ");
  //} else  if (mobile_pointer <= 1){
  //  current_pointer++;
  //  mobile_pointer = current_pointer;
  //} else {
  //  mobile_pointer--;
  //}

  if (mobile_pointer>0&&arr[mobile_pointer] < arr[mobile_pointer - 1]) {
    swap(arr, mobile_pointer, mobile_pointer - 1);
    mobile_pointer--;
  } else {

    mobile_pointer = ++current_pointer;
  }

  noStroke();
  //stroke(0);
  for (int i = 0; i < size; i++) {
    if (i == mobile_pointer && mobile_pointer != 0) {
      fill(0);
    } else {
      int b = int(map(arr[i], 0, height, 255, 0));
      int r = 255- b;
      //fill(r, 0, b);
      fill(r, 255, 255);
    }
    //rect(i * res, height - arr[i], res, arr[i]);
    rect(i * res, 0, res, height);
  }



  if (current_pointer ==size) {
    print("Finished");
    noLoop();
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
