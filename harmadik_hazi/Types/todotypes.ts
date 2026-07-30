export type SimpleTask = string

export type DatedTask = {
  message: string
  dueDate: Date
}

export type TaskContent = SimpleTask | DatedTask 
