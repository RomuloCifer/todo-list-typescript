/// <reference types="jest" />

import {
    createTask,
    addTask,
    alternateCompleteTask,
    removeTask,
    editTask,
    saveEditTask,
} from "../js/logic/task-logic";

import type { Task } from "../js/types/task";


describe("task logic", () => {
    it("should create a task with the correct title.", () => {
        const task = createTask("Entender isso tudo aqui");

        expect(task.title).toBe("Entender isso tudo aqui");
        expect(task.completed).toBe(false);
        expect(task.editing).toBe(false);
        expect(typeof task.id).toBe("number")
    });

    it("should add a new task in the array", () => {
        const tasks: Task[]= [];
        const newTask = createTask("nova tarefa");
        const result = addTask(tasks, newTask);

        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("Nova tarefa");
    });

    it("should alternate the 'completed' status from false to true", () => {
        const task = createTask("nova task");
        const tasks = addTask([], task);
        expect(tasks[0].completed).toBe(false);
        
        const updatedTasks = alternateCompleteTask(tasks, task.id);
        expect(updatedTasks[0].completed).toBe(true);
        expect(typeof(updatedTasks[0].completed)).toBe("boolean");
    }
);

    it("should remove the task given by the ID.", () => {
        const task = createTask("teste_remove");
        const tasks = addTask([], task);
        expect(tasks).toHaveLength(1);
        const removedTasks = removeTask(tasks, task.id);
        expect(removedTasks).toHaveLength(0);
    }
)
});