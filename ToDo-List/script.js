// Function to add a new task to the list
function addTask() {
    const newTaskText = document.getElementById("newTask").value.trim();
    if (newTaskText === "") {
        return;
    }

    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.textContent = newTaskText;
    li.addEventListener("click", toggleTaskStatus);

    taskList.appendChild(li);
    saveTasksToLocalStorage();

    document.getElementById("newTask").value = "";
}

const inputField = document.getElementById("newTask");
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// Function to toggle the completed status of a task
function toggleTaskStatus(event) {
    const li = event.target;
    li.classList.toggle("completed");
    saveTasksToLocalStorage();
}

// Function to delete all tasks from the list
function deleteAllTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Empty the task list
    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.children).map((li) => ({
        text: li.textContent,
        completed: li.classList.contains("completed"),
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add("completed");
        }
        li.addEventListener("click", toggleTaskStatus);

        taskList.appendChild(li);
    });
}

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);