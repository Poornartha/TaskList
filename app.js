// Defining UI Variables:

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners:
loadEventListeners();

// Load all event Listeners:
function loadEventListeners() {
  // Fetch Tasks from Local Storage:
  document.addEventListener('DOMContentLoaded', loadTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTask);
  filter.addEventListener('keyup', filterTask);
}

// Load Tasks:

function loadTasks(e) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach (function (text) {
    if(text) {
      element = document.createElement('li');
      element.className = "collection-item";
      element.appendChild(document.createTextNode(text));
  
      // For Delete Link:
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      // Add Icon:
      link.innerHTML = `<i class="fa fa-remove"></i>`;
      // Append Link to element:
      element.appendChild(link);
      // Append Element: 
      taskList.appendChild(element);
     }})};

// Add Task:

function addTask (e) {
  if(taskInput.value) {
    element = document.createElement('li');
    element.className = "collection-item";
    // element.innerHTML = taskInput.value;
    element.appendChild(document.createTextNode(taskInput.value));

    // For Delete Link:
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add Icon:
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    // Append Link to element:
    element.appendChild(link);
    // Append Element: 
    taskList.appendChild(element);

    // Storing in Local Storage:
    storeLocalStorage(taskInput.value);

    taskInput.value = '';
  } else {
    alert('Add a Task');
  }
  e.preventDefault();
}

// Storing in Local Storage:
function storeLocalStorage (task) {
  let tasks;
  // Check for "tasks" in Local Storage:
  if(localStorage.getItem('tasks') == null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task:

function removeTask(e) {
  if(e.target.className == "fa fa-remove") {
    const remElement = e.target.parentElement.parentElement;
    remElement.remove();
    
    // Remove from LS:
    removeLocalStorage(remElement);
  }  
}

// Remove from Local Storage:
function removeLocalStorage(taskItem) {
  let tasks;
  // Check for "tasks" in Local Storage:
  if(localStorage.getItem('tasks') == null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach( function (task, index) {
    if(taskItem.textContent == task) {
      tasks.splice(index, 1);
    }   
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Task:

function clearTask(e) {
  
  // Faster:
  taskArray = Array.from(taskList.children);
  taskArray.forEach( function(element) {
    element.remove();
  });

  // Alternate:
  // taskList.innerHTML = '';
  // Clear from Local Storage:
  localStorage.setItem('tasks', JSON.stringify([]));
}

// Filter Task:

function filterTask(e) {
  filterBy = e.target.value.toLowerCase();
  Array.from(taskList.children).forEach ( function (element) {
    if(element.innerText.toLowerCase().indexOf(filterBy) != -1) {
      element.style.display = 'block';
    }
    else{
      element.style.display = 'none';
    }
  });
}

