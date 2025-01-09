#Tablero de 0's 
#va a haber un uno donde se ponga una reina

#variable global para columnas y tablero
cols = 8
board = [0]*cols
for i in range(cols):
  board[i] = [0] * cols

#Método que checkea si las diagonales están disponibles
def check_diags(board, i, j):

  for n in range(cols):
    directions = [
        (i + n, j - n),  # Abajo-Izquierda
        (i - n, j + n),  # Arriba-Derecha
        (i + n, j + n),  # Abajo-Derecha
        (i - n, j - n),  # Arriba-Izquierda
    ]
    for x, y in directions:
      if 0 <= x < cols and 0 <= y < cols and board[x][y] == 1:
        return False
  return True

#checkear columnas y filas, 
# si están disponibles, se checkean las diagonales
def check_available(board, i, j):
  for n in range(cols):
    if board[i][n] == 1 or board[n][j] == 1: return False 
  return check_diags(board, i, j)

#Mostrar el tablero
def print_board(board):
  for j in range(cols):
    for i in range(cols):
      print(board[i][j], end = " ")
    print()
  print()


# [print(f"[{x}][{y}]",check_available(board, x, y)) for x in range(cols) for y in range(cols)]


#CBacktracking
def check_queens(col, board):
  #Caso base, si se llegó a la última col, ya se resolvió
  if col == cols:
    print_board(board)
    return True 
  
  #para cada fila probar cada columna
  for x in range(cols):
    if check_available(board, x, col):
      board[x][col] = 1
      if check_queens(col+1, board): return True 
      board[x][col] = 0
  return False

check_queens(0, board)
  