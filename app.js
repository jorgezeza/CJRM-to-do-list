const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const formSearch = document.querySelector('.form-search')
const formEditTodo = document.querySelector('.form-edit-todo')

const addTodo = (inputValue, isEdit) => {
  if (inputValue.length && !isEdit) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
      <span>${inputValue}</span>
      <div class="w-25 d-flex justify-content-around">
        <i class="fa-solid fa-pen me-1" data-pen="${inputValue}"></i>
        <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
      </div>
    </li>
    `
    event.target.reset()
  }
}

const removeTodo = clickedElement => {
  if (clickedElement) {
    document.querySelector(`[data-todo="${clickedElement}"]`).remove()
  }
}

const manipulateEditClasses = () => {
  formAddTodo.classList.add('form-edit-todo')
  formAddTodo.classList.remove('form-add-todo')
}

const removeFormAddTodoEventListener = () => formAddTodo.removeEventListener('submit', handleAddSubmit)

const handleSubimitFormEditTodo = clickedElement => {
  const editableElement = document.querySelector(`[data-todo="${clickedElement}"]`)
  editableElement.children[0].textContent = event.target.add.value
  event.target.reset()
}

const editTodo = clickedElement => {
  if (clickedElement) {
    manipulateEditClasses()
    removeFormAddTodoEventListener()

    formAddTodo.add.value = clickedElement
    const formEditTodo = document.querySelector('.form-edit-todo')
    formEditTodo.addEventListener('submit', event => {
      event.preventDefault()
      handleSubimitFormEditTodo(clickedElement)
    })
  }
}

const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos.forEach(todo => {
    todo.classList.add(classToAdd)
    todo.classList.remove(classToRemove)
  })
}

const filteredTodos = (todos, inputValue, returnMatchedTodos) => todos
  .filter(todo => {
    const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
    return returnMatchedTodos ? matchedTodos : !matchedTodos
  })

const hideTodos = (todos, inputValue) => {
  const todosToHide = filteredTodos(todos, inputValue, false)
  manipulateClasses(todosToHide, 'hidden', 'd-flex')
}

const showTodos = (todos, inputValue) => {
  const todosToShow = filteredTodos(todos, inputValue, true)
  manipulateClasses(todosToShow, 'd-flex', 'hidden')
}

const handleAddSubmit = event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()

  addTodo(inputValue, false)
}

const handleSearchSubmit = event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)

  hideTodos(todos, inputValue)
  showTodos(todos, inputValue)
}

handleClickTodosContainer = event => {
  const clickedElementTrash = event.target.dataset.trash
  const clickedElementPen = event.target.dataset.pen

  clickedElementTrash ? removeTodo(clickedElementTrash) : editTodo(clickedElementPen, event.target)
}

todosContainer.addEventListener('click', handleClickTodosContainer)
formAddTodo.addEventListener('submit', handleAddSubmit)
formSearch.addEventListener('input', handleSearchSubmit)
