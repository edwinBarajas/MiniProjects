//porque dijkstra es mejor con un minHeap

class Heap{
  
  constructor (elt) {
    //elt son nodos y pesos asi [nodo, peso]
    this.heap = [];
    this.heap.push(elt);
    this.n = 1;
  }
  
  //Método que establece el orden del heap
  heapify(index, n){ 
    let minor = index;
    let left = minor * 2 + 1;
    let right = minor * 2 + 2;
    
    if (left < n && this.heap[minor][1] > this.heap[left][1]){
      minor = left;
    }
    if (right < n && this.heap[minor][1] > this.heap[right][1]){
      minor = right;
    }
    if(minor != index){
      this.swap(minor, index);
      this.heapify(minor, n);
    }
  }
  
  //agregar elementos
  //se agrega al final y se "burbujea hasta el puesto corrrecto"
  heappush(elt){
    this.heap.push(elt);
    this.n++;
    
    let child = this.n-1;
    let father = floor((child -1) / 2);
    
    
    while(father >= 0 && this.heap[father][1] > this.heap[child][1]){
      this.swap(father, child);
      child = father;
      father = floor((child -1) / 2);
    }
  }
  
  //eliminar elementos
  //se intercambia con el último, se hace "pop" y se reestablece el orden desde el primer elemento
  heappop(){
    if (this.n == 0) return;
    
    this.n --;
    this.swap(0, this.n);
    let popped = this.heap.pop();
    this.heapify(0, this.n);
    return popped;
    
  }
  
  swap(i, j){
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
  
}