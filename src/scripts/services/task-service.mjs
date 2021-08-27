class TaskService {
  calcMaxSubmatrixArea(matrix) {
    const columnLengthsMatrix = matrix.map((row, rowIndex, matrix) =>
      row.map((rowItem, rowItemIndex) =>
        this.countColumnLength(matrix, rowIndex, rowItemIndex),
      ),
    )
    const submatrixAreasMatrix = columnLengthsMatrix.map(
      this.calcSubmatrixAreasCombination,
    )
    console.log(submatrixAreasMatrix)
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

  calcSubmatrixAreasCombination(arrayOfColumnLenghts) {
    let arrayOfsubmatrixAreas = []
    const maxColumnLength = Math.max(...arrayOfColumnLenghts)
    for (let i = 0; i < maxColumnLength + 1; i++) {
      let elementSeriesLength = 0
      for (let j = 0; j < arrayOfColumnLenghts.length; j++) {
        if (arrayOfColumnLenghts[j] >= i) {
          elementSeriesLength += 1
        } else {
          arrayOfsubmatrixAreas.push(i * elementSeriesLength)
          elementSeriesLength = 0
        }
      }
      if (elementSeriesLength !== 1) {
        arrayOfsubmatrixAreas.push(i * elementSeriesLength)
      }
    }
    return arrayOfsubmatrixAreas
  }
}

export default new TaskService()
