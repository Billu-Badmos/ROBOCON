const API_URL = "http://127.0.0.1:8000/todolist";

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Fetch tasks from backend
async function loadTasks() {
  taskList.innerHTML = ""; // clear old list

  const res = await fetch(API_URL);
  const todos = await res.json();

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between bg-purple-50 border border-purple-200 px-3 py-2 rounded-lg shadow-sm";

    li.innerHTML = `
      <label class="flex items-center gap-2 cursor-pointer w-full">
        <input type="checkbox" class="w-5 h-5 text-purple-500" ${todo.completed ? "checked" : ""}>
        <span class="flex-grow ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}">${todo.title}</span>
      </label>
      <button class="text-red-500 font-bold">✕</button>
    `;

    // delete button
    li.querySelector("button").addEventListener("click", async () => {
      await fetch(`${API_URL}/${todo.id}`, { method: "DELETE" });
      loadTasks();
    });

    taskList.appendChild(li);
  });
}

// Add new task
addBtn.addEventListener("click", async () => {
  const taskText = input.value.trim();
  if (taskText === "") return;

  // make a simple ID (timestamp)
  const newTodo = {
    id: Date.now(),
    title: taskText,
    completed: false
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo)
  });

  input.value = "";
  loadTasks();
});

// load tasks at start
loadTasks();
