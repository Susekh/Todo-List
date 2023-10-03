// eslint-disable-next-line max-classes-per-file
import './style.css';

const form = document.querySelector('[data-form]');
const lists = document.querySelector('[data-lists]');
const input = document.querySelector('[data-input]');

// local Storage
class Storage {
  static addTodStorage(todoArr) {
    const storage = localStorage.setItem('todo', JSON.stringify(todoArr));
    return storage;
  }

  static getStorage() {
    const storage = localStorage.getItem('todo') === null
      ? [] : JSON.parse(localStorage.getItem('todo'));
    return storage;
  }
}

// array
let todoArr = Storage.getStorage();

// display the todo in the DOM
class UI {
  static displayData() {
    const displayData = todoArr.map((item) => `
                  <div class="todo">
                      <p>${item.todo}</p>
                      <span class="remove" data-id = ${item.id} >🗑️</span>
                  </div>
              
              
              `);
    lists.innerHTML = (displayData).join(' ');
  }

  static clearInput() {
    input.value = '';
  }

  static removeTodo() {
    lists.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
      }
      const btnId = e.target.dataset.id;
      // remove from array.
      UI.removeArrayTodo(btnId);
    });
  }

  static removeArrayTodo(id) {
    todoArr = todoArr.filter((item) => item.id !== +id);
    Storage.addTodStorage(todoArr);
  }
}

// form part
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = Math.random() * 1000000;
  // eslint-disable-next-line no-use-before-define
  const todo = new Todo(id, input.value);
  todoArr = [...todoArr, todo];
  UI.displayData();
  Storage.addTodStorage(todoArr);
  UI.clearInput();
  UI.removeTodo();
});

// make object instance
class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}

// once the browser is loaded
window.addEventListener('DOMContentLoaded', () => {
  UI.displayData();
  // remove from the dom
  UI.removeTodo();
});
