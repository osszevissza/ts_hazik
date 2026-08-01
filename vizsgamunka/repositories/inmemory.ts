import {Entity, Repository} from '../interfaces/interfaces'

export class InMemoryRepository<T extends Entity> implements Repository<T> {
  private items = new Map<string, T>()

  add(item: T): void{
    this.items.set(item.id, item)
  }

  getById(id: string): T | undefined {
    return this.items.get(id)
  }
 
  getAll(): T[] {
    return [...this.items.values()]
  }

  update(item: T): void {
    this.items.set(item.id, item)
  }

  delete(id: string): boolean {
    return this.items.delete(id)
  }
}


