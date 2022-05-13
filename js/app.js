//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
//Event Listeners
todoButton.addEventListener('click', addTodo);
//Functions
function addTodo(event){
    //prevents form from submitting
    event.preventDefault();
}