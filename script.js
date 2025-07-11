
// Global List
let tasks = [];

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');

    // Validate inputs
    if (taskInput.value === '' || dueDateInput.value === '') {
        alert('Please fill in both task and due date.');
    } else {
        // Create a new task object
        const newTask = {
            id: Date.now(), // Unique ID based on current timestamp
            task: taskInput.value,
            dueDate: dueDateInput.value,
            completed: false
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Clear the input fields
        taskInput.value = '';
        dueDateInput.value = '';
    }
    console.log('Adding task:', taskInput.value, 'Due date:', dueDateInput.value);
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list
    tasks.forEach(element => {
        const taskItem = `
        <div class="flex justify-between items-center p-[8px] border-b">
            <div class="flex flex-col">
                <span class="text-lg">${element.task}</span>
                <span class="text-sm text-gray-500">${element.dueDate}</span>
            </div>
            <button class="bg-green-500 text-white p-[4px] rounded" onclick="toggleTaskCompletion(${element.id})">${element.completed ? 'Undo' : 'Complete'}</button>
            <button class="bg-red-500 text-white p-[4px] rounded" onclick="deleteTask(${element.id})">Delete</button>
        </div>
        `;
        taskList.innerHTML += taskItem;
    });
}

// Function to delete a specific task
function deleteTask(id) {
    // Find the index of the task to delete
    const taskIndex = tasks.findIndex(task => task.id === id);
    console.log('Deleting task with ID:', id);
    console.log('Task index found:', taskIndex);
    if (taskIndex !== -1) {
        // Remove the task from the tasks array
        tasks.splice(taskIndex, 1);
        displayTasks(); // Refresh the displayed task list
    }
}

// Function to delete all task
function deleteAllTasks() {
    tasks = []; // Clear the tasks array
    displayTasks(); // Refresh the displayed task list
    console.log('All tasks deleted');
}

function toggleTaskCompletion(id) {
    // Find the task by ID
    const task = tasks.find(task => task.id === id);
    if (task) {
        // Toggle the completed status
        task.completed = !task.completed;
        console.log('Toggling completion for task with ID:', id, 'New status:', task.completed);
        displayTasks(); // Refresh the displayed task list
    }
}

// Function to filter task
function filterTasks() 
{
    const filterInput = document.getElementById('filter-input').value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.task.toLowerCase().includes(filterInput));
    
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list
    filteredTasks.forEach(element => {
        const taskItem = `
        <div class="flex justify-between items-center p-[8px] border-b">
            <div class="flex flex-col">
                <span class="text-lg">${element.task}</span>
                <span class="text-sm text-gray-500">${element.dueDate}</span>
            </div>
            <button class="bg-green-500 text-white p-[4px] rounded" onclick="toggleTaskCompletion(${element.id})">${element.completed ? 'Undo' : 'Complete'}</button>
            <button class="bg-red-500 text-white p-[4px] rounded" onclick="deleteTask(${element.id})">Delete</button>
        </div>
        `;
        taskList.innerHTML += taskItem;
    });
}