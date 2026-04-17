import {
  createTask,
  addTask,
  alternateCompleteTask,
  removeTask,
  editTask,
  saveEditTask,
} from "../js/logic/task-logic";


describe("task logic", () => {
    it("should create a task with the correct title.", () => {
        const task = createTask("Entender isso tudo aqui");

        expect(task.title).toBe("Entender isso tudo aqui");
        expect(task.completed).toBe(false);
        expect(task.editing).toBe(false);
        expect(typeof task.id).toBe("number")
    });
});