// Theme Toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  toggle.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
});

// ── To-Do List ────────────────────────────────────────
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(t => addTaskToDOM(t.text, t.completed));
}

function addTaskToDOM(text, completed = false) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span onclick="toggleComplete(this)" class="${completed ? 'completed' : ''}">${text}</span>
    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
  `;
  taskList.appendChild(li);
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  addTaskToDOM(text);
  saveTasks();
  taskInput.value = '';
}

function toggleComplete(span) {
  span.classList.toggle('completed');
  saveTasks();
}

function deleteTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const completed = li.querySelector('span').classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskInput.addEventListener('keypress', e => { 
  if(e.key === 'Enter') addTask(); 
});

loadTasks();

// ── Product Filter & Sort ─────────────────────────────
const products = [
  {name:"Oversized Tee",     category:"top",    price:699,  img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"},
  {name:"Black Hoodie",      category:"top",    price:1599, img:"https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500"},
  {name:"Slim Jeans",        category:"bottom", price:1399, img:"https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=500"},
  {name:"Cargo Pants",       category:"bottom", price:1899, img:"https://images.unsplash.com/photo-1624378435789-76d41d4d03c9?w=500"},
  {name:"Smart Watch",       category:"accessory", price:4499, img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500"},
  {name:"Leather Belt",      category:"accessory", price:899, img:"https://images.unsplash.com/photo-1625104440619-0a1a2b2c3e4d?w=500"},
];

const grid = document.getElementById('productsGrid');
const catBtns = document.querySelectorAll('.cat-btn');
const sortSelect = document.getElementById('sortSelect');

function showProducts(list) {
  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="info">
        <h3>${p.name}</h3>
        <div class="price">₹${p.price}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterAndSort() {
  let filtered = [...products];
  const active = document.querySelector('.cat-btn.active').dataset.cat;
  if (active !== 'all') filtered = filtered.filter(p => p.category === active);

  const sortVal = sortSelect.value;
  if (sortVal === 'low')  filtered.sort((a,b) => a.price - b.price);
  if (sortVal === 'high') filtered.sort((a,b) => b.price - a.price);

  showProducts(filtered);
}

catBtns.forEach(btn => {
  btn.onclick = () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterAndSort();
  };
});

sortSelect.onchange = filterAndSort;
showProducts(products);