// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event Listeners
loadEventListeners();

// Load all event Listeners
function loadEventListeners()
{
  //DOM load Event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add Task event
  form.addEventListener('submit', addTask, false);

  // Remove Tasks
  taskList.addEventListener('click', removeTask);

  // Clear Task Events
  clearBtn.addEventListener('click', clearTasks);

  // Filter Task Event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks
function getTasks()
{
  let tasks;
  if(localStorage.getItem('tasks')===null)
  {
    tasks=[];
  }
  else
  {
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  })
}

// Add Task
function addTask(e)
{
  if(taskInput.value==='')
  {
    alert("Add a Task");
  }
 else
  {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

    // Storing in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
  }
  e.preventDefault();
}

//Store Tasks
function storeTaskInLocalStorage(task)
{
  let tasks;
  if(localStorage.getItem('tasks')==null)
  {
    tasks=[];
  }
  else
  {
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Tasks
function removeTask(e)
{
  if(e.target.parentElement.classList.contains('delete-item'))
  {
    if(confirm("Are You Sure?"))
    {
      e.target.parentElement.parentElement.remove();

      removeTaskfromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskfromLocalStorage(taskItem)
{
  let tasks;
  if(localStorage.getItem('tasks')==null)
  {
    tasks=[];
  }
  else
  {
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task)
    {
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks()
{
  // taskList.innerHTML = '';

  // Faster Method
  if(confirm("Are You Sure?"))
  {
    while(taskList.firstChild)
    {
      taskList.removeChild(taskList.firstChild);
    }
  }
  clearTasksFromLocalStorage();
}

// Clear from Local Storage
function clearTasksFromLocalStorage()
{
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e)
{
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task)
    {
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text)!=-1)
      {
        task.style.display = 'block';
      }
      else
      {
        task.style.display = 'none';
      }
    }
  )
}