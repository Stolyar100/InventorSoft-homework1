class TaskService {
  calcMaxSubmatrixArea(matrix) {
    console.log(matrix)
    const matrixOfColumnLengths = matrix.map((row, rowIndex, matrix) =>
      row.map((rowItem, rowItemIndex) => this.countColumnLength(matrix, rowIndex, rowItemIndex)),
    )
  console.log(matrixOfColumnLengths)
  }

  countColumnLength(matrix, rowIndex, columnIndex) {
    let columnLengths = 0
    for (let i = rowIndex; i < matrix.length; i++) {
      if (matrix[i][columnIndex] === 1) {
        columnLengths += 1
      } else {
        break
      }
    }
    return columnLengths
  }
}

export default new TaskService()
