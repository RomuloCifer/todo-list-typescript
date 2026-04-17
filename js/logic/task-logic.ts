import type { Task } from "../types/task";

export function createTask(title: string): Task {
    return {
        id: Date.now(),
        title: title,
        completed: false,
        editing: false,
    }
};

export function addTask(tasks: Task[], newTask: Task): Task[] {
    return [... tasks, newTask];
}

export function alternateCompleteTask(tasks: Task[], idTask: number): Task[] {
    return tasks.map((task) =>
    task.id === idTask
        ? { ...task, completed : !task.completed}: task);
}

export function removeTask(tasks: Task[], idTask: number): Task[] {
    const index = tasks.findIndex((task) => task.id === idTask);

    if (index === -1) {
        return tasks;
    }
    return [
        ...tasks.slice(0, index),
        ...tasks.slice(index + 1),
    ];
}

export function editTask(tasks: Task[], idTask: number): Task[] {
    return tasks.map((task) =>
        task.id === idTask
            ? { ...task, editing: true }
            : { ...task, editing: false }
    );
}

export function saveEditTask(tasks: Task[], idTask: number, newTitle: string): Task[] {
    return tasks.map((task) =>
        task.id === idTask
            ? { ...task, title: newTitle, editing: false }
            : task
    );
}