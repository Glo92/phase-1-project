document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('inputItem');
    const addButton = document.getElementById('addbtn');
    const listContainer = document.getElementById('list-container');
    const prioritySelect = document.getElementById('priority');

    function addTask() {
        if (input.value !== "") {
            const priority = prioritySelect.value;
            const taskText = input.value;

            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskText}</span> <span class="priority-${priority.toLowerCase()}">[${priority}]</span>
                <div class="button-container">
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="delete"><i class="fas fa-trash"></i></button>
                </div>
            `;

            // Append the li 
            listContainer.appendChild(li);
            input.value = "";
            saveTasks();
        }
    }

    addButton.addEventListener('click', addTask);

    // Handle Enter key press to add task
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission if inside a form
            addTask();
        }
    });

    function handleTaskActions(event) {
        const target = event.target;

        if (target.classList.contains('delete') || target.closest('.delete')) {
            const taskItem = target.closest('li');
            listContainer.removeChild(taskItem);
            saveTasks();
        } else if (target.classList.contains('edit') || target.closest('.edit')) {
            const taskItem = target.closest('li');
            const taskText = taskItem.querySelector('span').textContent.trim();
            const priority = taskItem.querySelector('span').nextElementSibling.textContent.replace('[', '').replace(']', '');
            
            input.value = taskText;
            prioritySelect.value = priority;
            listContainer.removeChild(taskItem);
            saveTasks();
        }
    }

    document.addEventListener('click', handleTaskActions);

    function markTaskAsDone(event) {
        if (event.target.tagName === 'SPAN' || event.target.closest('span')) {
            const taskItem = event.target.closest('li');
            taskItem.classList.toggle('done');
            saveTasks();
        }
    }

    listContainer.addEventListener('dblclick', markTaskAsDone);

    function saveTasks() {
        const tasks = [];
        listContainer.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('span').textContent.trim();
            const priority = li.querySelector('span').nextElementSibling.textContent.replace('[', '').replace(']', '');
            const done = li.classList.contains('done'); // Check if task is marked as done
            tasks.push({ taskText, priority, done });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const { taskText, priority, done } = task;
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskText}</span> <span class="priority-${priority.toLowerCase()}">[${priority}]</span>
                <div class="button-container">
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="delete"><i class="fas fa-trash"></i></button>
                </div>
            `;
            if (done) {
                li.classList.add('done');
            }
            listContainer.appendChild(li);
        });
    }
    loadTasks();
});
