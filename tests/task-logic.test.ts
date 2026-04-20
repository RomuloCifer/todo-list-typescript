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
import { validTitles } from "./data/task-titles";

describe("task logic", () => {
    it.each(validTitles)("should create a task with a title of: %s", (title) => {
        
    
        // Arrange
        const task = createTask(title);

        // Act


        // Assert
        expect(task.title).toBe(title);
        expect(task.completed).toBe(false);
        expect(task.editing).toBe(false);
        expect(typeof task.id).toBe("number")
    });


    it("should add a new task in the array", () => {
        // Arrange
        const tasks: Task[]= [];
        const newTask = createTask("nova tarefa");

        // Act 
        const result = addTask(tasks, newTask);

        // Assert
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("nova tarefa");
    });

    it("should alternate the 'completed' status from false to true", () => {
        //Arrange
        const task = createTask("nova task");
        const tasks = addTask([], task);

        // Act
        const updatedTasks = alternateCompleteTask(tasks, task.id);

        // Assert
        expect(tasks[0].completed).toBe(false);
        expect(updatedTasks[0].completed).toBe(true);
        expect(typeof(updatedTasks[0].completed)).toBe("boolean");
    }
);

    it("should remove the task given by the ID.", () => {
        // Arrange
        const task = createTask("teste_remove");
        const tasks = addTask([], task);
        // Act
        const removedTasks = removeTask(tasks, task.id);

        // Assert
        expect(tasks).toHaveLength(1);
        expect(removedTasks).toHaveLength(0);
    }
)
});