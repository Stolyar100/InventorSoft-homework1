import TaskService from './services/task-service.mjs'
const form = document.forms.matrix

form.addEventListener('submit', formSubmitHandler)

function formSubmitHandler(e) {
  e.preventDefault()
  const inputValue = form.matrixParameter.value
  const matrix = JSON.parse(inputValue).map((row) =>
    row.split('').map((matrixItem) => +matrixItem),
  )
  TaskService.calcMaxSubmatrixArea(matrix)
}
