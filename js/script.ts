import type { Task } from "./types/task";
import { form, input, taskList } from "./ui/elements.js";

import {
    createTask,
    addTask,
    alternateCompleteTask,
    removeTask,
    editTask,
    saveEditTask,
} from "./logic/task-logic.js";

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
                    saveEditTask(tasks, task.id, editInput.value);
                }
                if (event.key === "Escape") {
                    canceleouEdicao = true;
                    task.editing = false;
                    renderTasks(taskList);
                }
            })
            editInput.addEventListener("blur", function() {
                if (!canceleouEdicao) {
                saveEditTask(tasks, task.id, editInput.value);
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
        tasks = alternateCompleteTask(tasks, task.id);
        renderTasks(taskList)
    });

        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.textContent ="Editar";
        editButton.addEventListener("click", function() {
            editTask(tasks, task.id);
        })

        const removeButton = document.createElement("button");
        removeButton.classList.add("delete-button");
        removeButton.textContent = "Remover";
        removeButton.addEventListener("click", function() {
            removeTask(tasks, task.id);
        })

        item.appendChild(text);
        item.appendChild(editButton);
        item.appendChild(completeButton);
        item.appendChild(removeButton);
        taskList.appendChild(item);
    }}
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

