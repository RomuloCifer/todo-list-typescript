
const form = document.querySelector(".task-form");
const input = document.querySelector(".task-input");
const list_ = document.querySelector(".task-list");

const tasks =[];

function renderTasks () {
    list_.innerHTML = "";

    for (const task of tasks) {
        const item = document.createElement("li");
        item.textContent = task.title;

        list_.appendChild(item);
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault(); // ñ recarregar a página

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

