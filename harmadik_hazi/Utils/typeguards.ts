import { TaskContent, DatedTask } from "../Types/todotypes"

export function isDatedTask(content: TaskContent): content is DatedTask {
  return (content as DatedTask).dueDate !== undefined
}

export function isSimpleTask(content: TaskContent): content is string {
  return typeof content === "string"
}
