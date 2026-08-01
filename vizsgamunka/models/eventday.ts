import {Entity} from '../interfaces/interfaces'
import {Adventure} from './adventure'

export class EventDay implements Entity {
  private adventures = new Map<string, Adventure>()
  constructor(
    public id: string,
    public name: string,
    public location: string,
    public date: Date
  ){}

  addAdventure(adventure: Adventure): void {
   this.adventures.set(adventure.id, adventure)
  }

  removeAdventure(adventureId: string): boolean {
   return this.adventures.delete(adventureId)
  }

  getAdventures(): Adventure[] {
    return [...this.adventures.values()]
  }
}

