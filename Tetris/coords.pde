class Coord {
  int x, y;

  Coord(int x, int y) {
    this.x = x;
    this.y = y;
  }
  
  void update(int x, int y){
    this.x = x;
    this.y = y;
  }
  
  void update_y(int y){
    this.y = y;
  }
  void update_x(int x){
    this.x = x;

  }
  
  @Override
  public String toString(){
   return this.y + " "; 
  }
  
  @Override
    public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Coord punto = (Coord) o;
    return x == punto.x && y == punto.y;
  }

  // Sobrescribimos el método hashCode() para que los puntos con las mismas coordenadas
  // tengan el mismo código hash, lo que hace más eficiente la búsqueda en HashSet
  @Override
    public int hashCode() {
    return 10 * this.x + (this.y);
  }
  
  
  
}
