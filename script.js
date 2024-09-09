document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const themeToggle = document.getElementById('theme-toggle-btn');
    const allTasksButton = document.getElementById('allTasks');
    const todaysTasksButton = document.getElementById('todaysTasks');
    const importantTasksButton = document.getElementById('importantTasks');
    const completedTasksButton = document.getElementById('completedTasks');
    const incompleteTasksButton = document.getElementById('incompleteTasks');
    
    let tasks = [];

    // Toggle the sidebar
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';
    });

    // Toggle dark mode
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Add task
    addTaskButton.addEventListener('click', function() {
        const taskTitle = document.getElementById('taskTitle').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const taskDate = document.getElementById('taskDate').value;

        if (taskTitle === '') {
            alert('Task Title is required');
            return;
        }

        const task = {
            id: tasks.length + 1,
            title: taskTitle,
            description: taskDescription,
            date: taskDate,
            completed: false,
            important: false
        };

        tasks.push(task);
        updateTaskList(tasks);
        updateProgress();
        clearTaskInputFields();  // Clear input fields after task is added
    });

    function updateTaskList(filteredTasks = tasks) {
        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''} ${task.important ? 'important' : ''}`;
            taskItem.innerHTML = `
                <div>
                    <h4>${task.title}</h4>
                    <small>${task.date || 'No Date Set'}</small>
                </div>
                <div class="task-buttons">
                    <button class="done-button" onclick="toggleComplete(${task.id})">✔ Done</button>
                    <button class="important-button" onclick="toggleImportant(${task.id})">⭐ Important</button>
                    <button class="delete-button" onclick="deleteTask(${task.id})">✖ Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function clearTaskInputFields() {
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskDate').value = '';
    }

    window.toggleComplete = function(id) {
        const task = tasks.find(t => t.id === id);
        task.completed = !task.completed;
        updateTaskList(tasks);
        updateProgress();
    };

    window.toggleImportant = function(id) {
        const task = tasks.find(t => t.id === id);
        task.important = !task.important;
        updateTaskList(tasks);
    };

    window.deleteTask = function(id) {
        tasks = tasks.filter(t => t.id !== id);
        updateTaskList(tasks);
        updateProgress();
    };

    function updateProgress() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const progressPercentage = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = `${progressPercentage}%`;

        // Update progress text
        const progressText = document.getElementById('progressText');
        progressText.textContent = `${completedTasks}/${tasks.length} Tasks Completed`;
    }

    // Filter: All Tasks
    allTasksButton.addEventListener('click', function() {
        updateTaskList(tasks);
    });

    // Filter: Today's Tasks
    todaysTasksButton.addEventListener('click', function() {
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = tasks.filter(task => task.date === today);
        updateTaskList(todayTasks);
    });

    // Filter: Important Tasks
    importantTasksButton.addEventListener('click', function() {
        const importantTasks = tasks.filter(task => task.important);
        updateTaskList(importantTasks);
    });

    // Filter: Completed Tasks
    completedTasksButton.addEventListener('click', function() {
        const completedTasks = tasks.filter(task => task.completed);
        updateTaskList(completedTasks);
    });

    // Filter: Incomplete Tasks
    incompleteTasksButton.addEventListener('click', function() {
        const incompleteTasks = tasks.filter(task => !task.completed);
        updateTaskList(incompleteTasks);
    });
});
