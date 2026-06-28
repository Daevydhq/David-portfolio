

let tasks = JSON.parse(localStorage.getItem('david_tasks') || '[]');
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem('david_tasks', JSON.stringify(tasks));
}

function updateStats() {
  const total     = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending   = total - completed;

  document.getElementById('stat-total').textContent     = total;
  document.getElementById('stat-completed').textContent = completed;
  document.getElementById('stat-pending').textContent   = pending;
}

function getFilteredTasks() {
  if (currentFilter === 'completed') return tasks.filter(t => t.completed);
  if (currentFilter === 'pending')   return tasks.filter(t => !t.completed);
  return tasks;
}

function renderTasks() {
  const list = document.getElementById('task-list');
  if (!list) return;

  const filtered = getFilteredTasks();
  list.innerHTML = '';

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <p>No tasks here yet. Add one above!</p>
      </div>`;
    updateStats();
    return;
  }

  filtered.forEach((task, idx) => {
    const realIdx = tasks.indexOf(task);
    const item = document.createElement('div');
    item.className = `task-item ${task.completed ? 'completed' : ''}`;
    item.innerHTML = `
      <div class="task-check ${task.completed ? 'done' : ''}" onclick="toggleTask(${realIdx})"></div>
      <span class="task-text">${escapeHTML(task.text)}</span>
      <span class="task-priority priority-${task.priority}">${task.priority}</span>
      <button class="task-delete" onclick="deleteTask(${realIdx})" title="Delete task">✕</button>
    `;
    list.appendChild(item);
  });

  updateStats();
}

function addTask() {
  const input    = document.getElementById('task-input');
  const priority = document.getElementById('task-priority');
  const text     = input.value.trim();

  if (!text) {
    input.focus();
    input.style.borderColor = '#ff4757';
    setTimeout(() => input.style.borderColor = '', 1000);
    return;
  }

  tasks.unshift({ text, priority: priority.value, completed: false, id: Date.now() });
  saveTasks();
  renderTasks();
  input.value = '';
}

function toggleTask(idx) {
  tasks[idx].completed = !tasks[idx].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(idx) {
  tasks.splice(idx, 1);
  saveTasks();
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderTasks();
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// Enter key support
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('task-input');
  if (input) {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });
  }
  renderTasks();
});
