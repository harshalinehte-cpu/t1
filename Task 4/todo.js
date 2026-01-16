const input = document.getElementById('taskInput');
const taskList = document.getElementById('tasks');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
  tasks.forEach(t => createTaskElement(t.text, t.done));
}

function createTaskElement(text, done = false) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span onclick="toggleDone(this)" class="${done ? 'completed' : ''}">${text}</span>
    <button class="delete-btn" onclick="deleteThis(this)">Delete</button>
  `;
  taskList.appendChild(li);
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  
  createTaskElement(text);
  saveAllTasks();
  input.value = '';
}

function toggleDone(span) {
  span.classList.toggle('completed');
  saveAllTasks();
}

function deleteThis(btn) {
  btn.parentElement.remove();
  saveAllTasks();
}

function saveAllTasks() {
  const tasks = [];
  document.querySelectorAll('#tasks li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const done = li.querySelector('span').classList.contains('completed');
    tasks.push({ text, done });
  });
  localStorage.setItem('myTasks', JSON.stringify(tasks));
}

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

loadTasks();