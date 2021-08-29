class TaskService {
  calcColumnLengthsMatrix(matrix) {
    const columnLengthsMatrix = matrix.map((row, rowIndex, matrix) =>
      row.map((rowItem, rowItemIndex) =>
        this.countColumnLength(matrix, rowIndex, rowItemIndex),
      ),
    )
    return columnLengthsMatrix
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

  calcPossibleAreasMatrix(columnLengthsMatrix) {
    const possibleAreasMatrix = columnLengthsMatrix.map((columnLengthsRow) =>
      this.calcPossibleAreasCombination(columnLengthsRow),
    )
    return possibleAreasMatrix
  }

  calcPossibleAreasCombination(arrayOfColumnLenghts) {
    let possibleAreas = []
    const maxColumnLength = Math.max(...arrayOfColumnLenghts)
    for (let i = 1; i < maxColumnLength + 1; i++) {
      const possibleAreasForColumnLength = this.calcPossibleAreaForColumnLength(
        arrayOfColumnLenghts,
        i,
      )
      possibleAreas.push(...possibleAreasForColumnLength)
    }
    return possibleAreas
  }

  calcPossibleAreaForColumnLength(columnLengthsRow, columnLengths) {
    let possibleAreasForColumnLength = []
    let elementSeriesLength = 0
    columnLengthsRow.forEach((element) => {
      if (element >= columnLengths) {
        elementSeriesLength += 1
      } else {
        if (elementSeriesLength > 0) {
          possibleAreasForColumnLength.push(columnLengths * elementSeriesLength)
        }
        elementSeriesLength = 0
      }
    })
    if (elementSeriesLength > 0) {
      possibleAreasForColumnLength.push(columnLengths * elementSeriesLength)
    }
    return possibleAreasForColumnLength
  }

  findMaxFromMatrix(possibleAreasMatrix) {
    const possibleAreasArray = [].concat(...possibleAreasMatrix)
    const maxFromMatrix = Math.max(...possibleAreasArray)
    return maxFromMatrix
  }
}

export default new TaskService()
