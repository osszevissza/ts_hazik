export interface Entity {
    id: string
}

export interface Repository<T extends Entity> {
    add(item: T): void
    getById(id: string): T | undefined
    getAll(): T[]
    update(item: T): void
    delete(id: string): boolean
}
