board = [
  [5, 0, 0, 4, 0, 7, 9, 0, 3],
  [0, 0, 2, 0, 1, 0, 0, 8, 7],
  [1, 0, 0, 6, 8, 0, 0, 0, 4],
  [8, 0, 0, 3, 0, 0, 7, 0, 0],
  [0, 2, 6, 0, 0, 1, 3, 4, 5],
  [4, 7, 0, 0, 5, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 2, 4, 0, 9],
  [0, 3, 0, 0, 0, 8, 0, 6, 2],
  [0, 0, 9, 7, 6, 0, 5, 0, 8],
]
#rows & cols, the board is a square, so they're equal
rows = cols = len(board)

#show the state of the board
def print_board(board):
  for i in range(rows):
    for j in range(rows):
      print(board[i][j], end = " ")
    print()
  print()


def check_block(board, i, j, n):
  #gr es de group
  #o sea, el bloque en el que está el número enviado
  gr_i, gr_j = 0, 0

  if i in (0, 1, 2): gr_i = 0
  if i in (3, 4, 5): gr_i = 3
  if i in (6, 7, 8): gr_i = 6

  if j in (0, 1, 2): gr_j = 0
  if j in (3, 4, 5): gr_j = 3
  if j in (6, 7, 8): gr_j = 6

  for di in range(3):
    for dj in range(3):
      current = board[gr_i + di][gr_j + dj]
      if current == n: return False

  return True


#check col and row, if valid, check square
def check_valid(board, i, j, n):
  for k in range(rows):
    if board[i][k] == n or board[k][j] == n: return False
  return check_block(board, i, j, n)

#solve by brute force, trying every possibility
def solve_sudoku(row, col):

  #base case
  if row == rows:
    print_board(board)
    return True

  # next_col = 0 if col+1 == cols else col + 1
  # next_row = row + 1 if next_col == 0 else row
  next_col = (col + 1) % cols
  next_row = row + (1 if next_col == 0 else 0)

  if board[row][col] > 0:
    return solve_sudoku(next_row, next_col)

  #missing values in row
  left_vals = [n for n in range(1, rows + 1) if n not in board[row]]

  for n in left_vals:
    if check_valid(board, row, col, n):
      board[row][col] = n   
      if solve_sudoku(next_row, next_col): return True
      board[row][col] = 0 

  return False


print_board(board)
print(solve_sudoku(0, 0))
