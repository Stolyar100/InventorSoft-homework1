class TaskService {
  calcMaxSubmatrixArea(matrix) {
    console.log(matrix)
    const matrixOfColumnLengths = matrix.map((row, rowIndex, matrix) =>
      row.map((rowItem, rowItemIndex) => {
        let columnLengths = 0
        for (let i = rowIndex; i < matrix.length; i++) {
          if (matrix[i][rowItemIndex] === 1) {
            columnLengths += 1
          } else {
            break
          }
        }
        return columnLengths
      }),
    )
    console.log(matrixOfColumnLengths)
  }
}

export default new TaskService()
