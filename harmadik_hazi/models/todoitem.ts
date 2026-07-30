import {Importance, Status} from '../enums/importance'

export class TodoItem <T> {
  constructor (
    public id: number,
    public content: T,
    public importance: Importance = Importance.Normal,
    public status: Status = Status.Pending) {}
}

