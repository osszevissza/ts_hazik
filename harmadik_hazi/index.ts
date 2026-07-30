import { TodoItem } from "./models/todoitem"
import { TodoList } from "./services/todolist"
import { Importance, Status } from "./enums/importance"
import { TaskContent } from "./Types/todotypes"
import { isDatedTask } from "./Utils/typeguards"

const todoList = new TodoList<TaskContent>()

const task1 = new TodoItem<TaskContent>(1, "R-t gyakorolni", Importance.Normal, Status.Pending)
const task2 = new TodoItem<TaskContent>(2, { message: "TypeScriptet gyakorolni", dueDate: new Date("2026-08-02") },
  Importance.Urgent, Status.Pending)

todoList.addItem(task1)
todoList.addItem(task2)

todoList.listItems().forEach(item => {
  if (isDatedTask(item.content)) {
    console.log("Határidős: " + item.content.message + ", dátum: " + item.content.dueDate)
  } else {
    console.log("Nincs még elcsúszva: " + item.content)
  }
})

todoList.changeStatus(1, Status.Done)
console.log("Teendők:")
todoList.listItems().forEach(item => {
  console.log(" - " + item.content + " [" + item.status + "]")
})
