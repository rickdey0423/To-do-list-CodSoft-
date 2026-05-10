let tasks = []; // Our list of tasks

// Load tasks from localStorage on page load
function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
        render();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    if (input.value === "") return;

    // Create a new task object
    let newTask = {
        id: Date.now(),
        text: input.value,
        completed: false
    };

    tasks.push(newTask); // Add to list
    input.value = "";    // Clear input
    saveTasks();         // Save to localStorage
    render();            // Refresh the table
}

function toggleTask(id) {
    tasks = tasks.map(t => {
        if (t.id === id) t.completed = !t.completed;
        return t;
    });
    saveTasks();
    render();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
}

function render() {
    const body = document.getElementById("tableBody");
    body.innerHTML = ""; // Clear current table

    tasks.forEach(t => {
        body.innerHTML += `
            <tr>
                <td class="${t.completed ? 'done' : ''}">${t.text}</td>
                <td>${t.completed ? '✅ Done' : '⏳ Pending'}</td>
                <td>
                    <button onclick="toggleTask(${t.id})">🔄</button>
                    <button onclick="deleteTask(${t.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// Load tasks when page starts
loadTasks();