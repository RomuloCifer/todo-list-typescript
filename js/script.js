
const form = document.querySelector(".task-form");
const input = document.querySelector(".task-input");
const list_ = document.querySelector(".task-list");

let tasks = [];

function renderTasks () {
    list_.innerHTML = "";

    for (const task of tasks) {
        const item = document.createElement("li");
        item.classList.add("task-item");
        
        if (task.editing) {
            const editInput =document.createElement("input");
            editInput.classList.add("task-edit-input");
            editInput.value = task.title;

            editInput.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    saveEditTask(task.id, editInput.value);
                }
                if (event.key === "Escape") {
                    task.editing = false;
                    renderTasks();
                }
            })
            editInput.addEventListener("blur", function() {
                saveEditTask(task.id, editInput.value);
            });
            item.appendChild(editInput);
            list_.appendChild(item);
        } else {
        const text = document.createElement("span");
        text.classList.add("task-text");
        text.textContent = task.title;

        if (task.completed) {
            text.classList.add("completed");
        }
        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-button");
        completeButton.textContent = task.completed ? "Desmarcar" : "Concluir";
        completeButton.addEventListener("click", function() {
        alternateCompleteTask(task.id);
    });

        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.textContent ="Editar";
        editButton.addEventListener("click", function() {
            editTask(task.id);
        })

        const removeButton = document.createElement("button");
        removeButton.classList.add("delete-button");
        removeButton.textContent = "Remover";
        removeButton.addEventListener("click", function() {
            removeTask(task.id);
        })

        item.appendChild(text);
        item.appendChild(editButton);
        item.appendChild(completeButton);
        item.appendChild(removeButton);
        list_.appendChild(item);
    }}
}

function alternateCompleteTask (idTask) {
    for (const task of tasks) {
        if (task.id === idTask) {
            task.completed = !task.completed;
        }
    }
    renderTasks()
}
function removeTask(idTask) {
    const index = tasks.findIndex(function(task) {
        console.log(task.id === idTask, task.id)
        return task.id === idTask;
    })
    if (index === -1) {
        return;
    }
    tasks = [
        ...tasks.slice(0, index),
        ...tasks.slice(index + 1)
    ]
    renderTasks();
}

function editTask(idTask) {
    for (let task of tasks) {
        if (task.id === idTask) {
            task.editing = true;
        } else {
            task.editing = false;
        }
    }
    renderTasks();
}

function saveEditTask(idTask, newTitle) {
    newTitle = newTitle.trim();
    
    for (let task of tasks) {
        if (task.id === idTask) {
            if (newTitle !== "") {
                task.title = newTitle;
            }
            task.editing = false;
        }
    }
    renderTasks();
}
form.addEventListener("submit", function (event) {
    event.preventDefault(); // ñ recarregar a página
    if (!form || !input || !list_) {
    console.error("Elementos do formulario nao encontrados no DOM.");
}

    const typedText = input.value.trim();
    if (typedText === "") {
        return;
    }

    const newTask = {
        id: Date.now(),
        title: typedText,
        completed: false,
        editing: false,
    }
    tasks.push(newTask);
    input.value = "";
    renderTasks();
    console.log(tasks);
})

