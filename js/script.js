
const form = document.querySelector(".task-form");
const input = document.querySelector(".task-input");
const list_ = document.querySelector(".task-list");

let tasks = [];

function renderTasks () {
    list_.innerHTML = "";

    for (const task of tasks) {
        const item = document.createElement("li");
        item.classList.add("task-item");

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

        const removeButton = document.createElement("button");
        removeButton.classList.add("delete-button");
        removeButton.textContent = "Remover";
        removeButton.addEventListener("click", function() {
            removeTask(task.id);
        })

        item.appendChild(text);
        item.appendChild(completeButton);
        item.appendChild(removeButton);
        list_.appendChild(item);
    }
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
        tasks = tasks.filter(function (task) {
        return task.id !==idTask; // Mantém toda a lista que o ID é diferente da task
    });

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
    }
    tasks.push(newTask);
    input.value = "";
    renderTasks();
    console.log(tasks);
})

