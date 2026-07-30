import { TodoItem } from "../models/todoitem";
import { Importance, Status } from "../enums/importance"
import { Log } from '../decorators/log'


export class TodoList <T> {
  private items: Map<number, TodoItem<T>> = new Map()

  @Log
  addItem(item: TodoItem<T>): void {
    if (this.items.has(item.id)) {
      console.log('Ez az ID foglalt: ' + item.id)
      return
    }

    this.items.set(item.id, item)
    console.log('Teendő hozzáadva: ' + item.id)
  }

  @Log
  deleteItem(id: number): void {
    if (this.items.delete(id)) {
      console.log('Teendő törölve: ' + id)
    }
    else {
      console.log('Nincs ilyen ID: ' + id)
    }
  }

  listItems(): TodoItem<T>[] {
    return Array.from(this.items.values())
  }

  getItem(id: number): TodoItem<T> | undefined {
    return this.items.get(id)
  }

  @Log
  changeImportance(id: number, newImportance: Importance): void {
    const item = this.items.get(id)
    if (item) {
      item.importance = newImportance
      console.log('Teendő (' + id + ') fontossága módosítva: ' + newImportance)
    } else {
      console.log('Nincs ilyen ID: ' + id)
    }
  }

  @Log
  changeStatus(id: number, newStatus: Status): void {
    const item = this.items.get(id)
    if (item) {
      item.status = newStatus
      console.log('Teendő (' + id + ') állapota módosítva: ' + newStatus)
    } else {
      console.log('Nincs ilyen ID: ' + id)
    }
  }
}
