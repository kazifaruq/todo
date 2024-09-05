function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();
    const entryTime = new  Date();

    if (taskValue) {
        const existingTasks = document.querySelectorAll('#taskList li span.task-text');
        for (let task of existingTasks) {
            if (task.textContent === taskValue) {
                alert('Task already exists!');
                return;
            }
        }

        const li = document.createElement('li');
        li.innerHTML = `<div class="task-info">
                            <span class="task-text">${taskValue}</span>
                            <span class="entry-time">➕${formatDate(entryTime)}</span>
                        </div>
                        <div class="buttons">
                            <button class="complete-button" onclick="completeTask(this)">Complete</button>
                            <button class="edit-button" onclick="editTask(this)">Edit</button>
                            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
                        </div>`;
        document.getElementById('taskList').appendChild(li);
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
}

function completeTask(button) {
    const li = button.parentElement.parentElement;
    const completeTime = new Date();
    li.querySelector('span.task-text').classList.toggle('completed');

    if (li.querySelector('.complete-time')) {
        li.querySelector('.complete-time').remove();
    } else {
        const completeTimeSpan = document.createElement('span');
        completeTimeSpan.className = 'complete-time';
        completeTimeSpan.textContent = ` (✅: ${formatDate(completeTime)})`;
        li.querySelector('.task-info').appendChild(completeTimeSpan);
    }
}

function editTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector('span.task-text').textContent.trim();
    const newTask = prompt('Edit task:', taskText);
    if (newTask) {
        li.querySelector('span.task-text').textContent = newTask;
    }
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
}
function formatDate(date) {
    const days = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()]; // Get month as 3-letter string
    const year = date.getFullYear(); // Get full year

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with zero
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Get seconds and pad with zero
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM

    hours = String(hours % 12 || 12).padStart(2, '0'); // Convert to 12-hour format and pad with zero

    return `${days}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}