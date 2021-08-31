class TaskService {
  calcColumnLengthsMatrix(matrix) {
    /*
     * Returns new matrix where every element represents the length of
     *  a column which starts from the original one element
     * @param matrix 2D array elements has value '0' or '1'
     */
    const columnLengthsMatrix = matrix.map((row, rowIndex, matrix) =>
      row.map((rowItem, rowItemIndex) =>
        this.countColumnLength(matrix, rowIndex, rowItemIndex),
      ),
    )
    return columnLengthsMatrix
  }

  countColumnLength(matrix, rowIndex, columnIndex) {
    /*
     * Returns Length of column of '1' that starts from current element
     * @param matrix 2D number array elements has value '0' or '1'
     * @param rowIndex Index of nested array in matrix(i)
     * @param columnIndex Index of element in nested array(j)
     */
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
    /*
     * Returns 2D array where every row is array of areas of possible '1'
     *  submatrix combinations that starts in original matrix corresponding row
     * @param columnLengthsMatrix 2D array that calcColumnLengthsMatrix returns
     */
    const possibleAreasMatrix = columnLengthsMatrix.map((columnLengthsRow) =>
      this.calcPossibleAreasCombination(columnLengthsRow),
    )
    return possibleAreasMatrix
  }

  calcPossibleAreasCombination(arrayOfColumnLenghts) {
    /*
     * Returns array of areas of possible '1' submatrix combinations that starts in original matrix corresponding row
     * @param arrayOfColumnLenghts nested array of array that calcColumnLengthsMatrix returns
     * Calls calcPossibleAreaForColumnLength with different column length(from 1
     *  to max available in current row) to find areas of all possible submatrix height and width combinations
     */
    let possibleAreas = [] // areas of all possible submatrix
    const maxColumnLength = Math.max(...arrayOfColumnLenghts) // finds max matrix column length for current row
    for (let i = 1; i < maxColumnLength + 1; i++) {
      const possibleAreasForColumnLength = this.calcPossibleAreaForColumnLength(
        arrayOfColumnLenghts,
        i,
      )
      // pushes areas of all possible submatrix with height === columnLengths in general array
      possibleAreas.push(...possibleAreasForColumnLength)
    }
    return possibleAreas
  }

  calcPossibleAreaForColumnLength(columnLengthsRow, columnLengths) {
    /*
     * Returns array of areas of possible '1' submatrix combinations that starts
     *  in original matrix corresponding row with set column length
     * @param columnLengthsRow nested array of array that calcColumnLengthsMatrix returns
     * @param columnLengths height of the searched submatrix
     */
    let possibleAreasForColumnLength = [] // areas of all possible submatrix with height === columnLengths
    let elementSeriesLength = 0 // submatrix width counter
    columnLengthsRow.forEach((element) => {
      // checks if element(length of column that starts from the original matrix element) is higher than columnLengths
      if (element >= columnLengths) {
        elementSeriesLength += 1 // increase submatrix width counter
      } else {
        // checks if previous elements creates series(which in the original
        // matrix is submatrix with size columnLengths x elementSeriesLength)
        if (elementSeriesLength > 0) {
          possibleAreasForColumnLength.push(columnLengths * elementSeriesLength) // pushes current submatrix area to list
        }
        elementSeriesLength = 0 // resets submatrix width counter as it can be more than 1 series in columnLengthsRow
      }
    })
    if (elementSeriesLength > 0) {
      possibleAreasForColumnLength.push(columnLengths * elementSeriesLength) // checks if there is series that finishes with end of row
    }
    return possibleAreasForColumnLength
  }

  findMaxFromMatrix(possibleAreasMatrix) {
    const possibleAreasArray = [].concat(...possibleAreasMatrix) // converts 2D array to 1D
    const maxFromMatrix = Math.max(...possibleAreasArray) // finds max value from 1D array
    return maxFromMatrix
  }
}

export default new TaskService()
