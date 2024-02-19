let todoList = JSON.parse(localStorage.getItem('todo')) || []
const ids = JSON.parse(localStorage.getItem('todo'))?.map(objeto => getKey(objeto)) || [1];

let globalId = Math.max(...ids);

function getKey (obj) {
  return +Object.keys(obj)[0]
}

const updateLocalStorage = ()=>{
  localStorage.setItem('todo', JSON.stringify(todoList))
}

const deleteTodo = (key) => {

  todoList = todoList.filter((ele)=> getKey(ele) !== key )

  // todoList.forEach((todo,index)=>{
  //   if (getKey(todo) === key ) {
  //     todoList.splice(index,1)
  //   } 
  // })
  
  updateLocalStorage()
  showList()
}

const createTodo = (e) => {
  e.preventDefault()
  if (e.target.title.value.trim() === '') return
  todoList.push({[globalId]: e.target.title.value})
  e.target.title.value = ''
  updateLocalStorage()
  showList()
  globalId++
}

const cardsContainer = document.querySelector('.cards-container')

var sortable = Sortable.create(cardsContainer, {animation: 200, easing: "cubic-bezier(1, 0, 0, 1)", ghostClass: "sortable-ghost",});

const showList = () => {
const cardsContainer = document.querySelector('.cards-container')
  cardsContainer.innerHTML = ''
  todoList.forEach((el) => {       
    const element = document.createElement('div')
    cardsContainer.appendChild(element)
    element.outerHTML = `<li class="todo-card"><p>${el[getKey(el)]}</p><button onClick="deleteTodo(${getKey(el)})">Borrar</button></li>`
  })
}

showList()

const todoForm = document.querySelector('.todo-input')
todoForm.addEventListener('submit', createTodo)