type Task = {
    id: number;
    title: string;
    completed: boolean;
    editing: boolean;
};

const form = document.querySelector<HTMLFormElement>(".task-form");
const input = document.querySelector<HTMLInputElement>(".task-input");
const list = document.querySelector<HTMLUListElement>(".task-list");

if (!form || !input || !list) {
    throw new Error("Elementos principais não encontrados...");
}

const taskList: HTMLUListElement = list;

let tasks: Task[] = [];


function renderTasks (taskList: HTMLUListElement) {
    taskList.innerHTML = "";

    for (const task of tasks) {
        const item = document.createElement("li");
        item.classList.add("task-item");
        
        if (task.editing) {
            const editInput =document.createElement("input");
            editInput.classList.add("task-edit-input");
            editInput.value = task.title;

            let canceleouEdicao = false;

            editInput.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    saveEditTask(task.id, editInput.value);
                }
                if (event.key === "Escape") {
                    canceleouEdicao = true;
                    task.editing = false;
                    renderTasks(taskList);
                }
            })
            editInput.addEventListener("blur", function() {
                if (!canceleouEdicao) {
                saveEditTask(task.id, editInput.value);
                }
            });
            item.appendChild(editInput);
            taskList.appendChild(item);
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
        taskList.appendChild(item);
    }}
}

function alternateCompleteTask (idTask: number) : void {
    for (const task of tasks) {
        if (task.id === idTask) {
            task.completed = !task.completed;
        }
    }
    renderTasks(taskList)
}
function removeTask(idTask : number) : void {
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
    renderTasks(taskList);
}

function editTask(idTask : number) : void {
    for (let task of tasks) {
        if (task.id === idTask) {
            task.editing = true;
        } else {
            task.editing = false;
        }
    }
    renderTasks(taskList);
}

function saveEditTask(idTask : number, newTitle : string) : void {
    newTitle = newTitle.trim();
    
    for (let task of tasks) {
        if (task.id === idTask) {
            if (newTitle !== "") {
                task.title = newTitle;
            }
            task.editing = false;
        }
    }
    renderTasks(taskList);
}
form.addEventListener("submit", function (event) {
    event.preventDefault(); // ñ recarregar a página
;

    const typedText = input.value.trim();
    if (typedText === "") {
        return;
    }

    const newTask: Task = {
        id: Date.now(),
        title: typedText,
        completed: false,
        editing: false,
    };
    tasks.push(newTask);
    input.value = "";
    renderTasks(taskList);
    console.log(tasks);
});

