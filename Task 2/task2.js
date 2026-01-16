

const form = document.getElementById('contactForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let isValid = true;

  document.querySelectorAll('.error').forEach(el => el.textContent = '');


  const name = document.getElementById('name');
  if (name.value.trim().length < 3) {
    name.nextElementSibling.textContent = 'Name must be at least 3 characters';
    isValid = false;
  }


  const email = document.getElementById('email');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    email.nextElementSibling.textContent = 'Please enter a valid email address';
    isValid = false;
  }


  const message = document.getElementById('message');
  if (message.value.trim().length < 10) {
    message.nextElementSibling.textContent = 'Message should be at least 10 characters';
    isValid = false;
  }

  if (isValid) {
    alert('Form submitted successfully! (This is just a demo)');
    form.reset();
  }
});



const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

function addTodo() {
  const text = todoInput.value.trim();
  
  if (text === '') return;

  const li = document.createElement('li');
  
  const span = document.createElement('span');
  span.textContent = text;
  
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(deleteBtn);
  
  todoList.appendChild(li);
  
  todoInput.value = '';
  todoInput.focus();
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});