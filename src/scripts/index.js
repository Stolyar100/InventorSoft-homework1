import TaskService from './services/task-service.js'
const form = document.forms.matrix

form.addEventListener('submit', formSubmitHandler)

function formSubmitHandler(e) {
  e.preventDefault()
  const inputValue = form.matrixParameter.value
  const matrix = JSON.parse(inputValue).map((row) =>
    row.split('').map((matrixItem) => +matrixItem),
  )
  solveProblem(matrix)
}

function solveProblem(matrix) {
  const columnLengthsMatrix = TaskService.calcColumnLengthsMatrix(matrix) // step 1
  const possibleAreasMatrix =
    TaskService.calcPossibleAreasMatrix(columnLengthsMatrix) // step 2
  const maxSubmatrixArea = TaskService.findMaxFromMatrix(possibleAreasMatrix) // step 3

  printTable('originalMatrix', matrix)
  printTable('columnLengthMatrix', columnLengthsMatrix)
  printTable('possibleAreasMatrix', possibleAreasMatrix)
  printResult(maxSubmatrixArea)
}

function printResult(result) {
  const resultElement = document.getElementById('result')
  resultElement.innerText = 'Result ' + result
}

function printTable(tableId, matrix) {
  const table = document.getElementById(tableId)
  table.innerHTML = ''
  matrix.forEach((element) => {
    const tableRow = table.insertRow()
    element.forEach((element) => {
      const cell = tableRow.insertCell()
      cell.innerText = element
      if (element > 0) {
        cell.classList.add('bold')
      }
    })
  })
}
