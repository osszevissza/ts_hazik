import {Entity} from '../interfaces/interfaces'
import {Adventure} from './adventure'

export class EventDay implements Entity {
  private adventures: Adventure[] = []
  constructor(
    public id: string,
    public name: string,
    public location: string,
    public date: Date
  ){}

  addAdventure(adventure: Adventure): void {
    this.adventures.push(adventure)
  }

  removeAdventure(adventureId: string): boolean {
    const index = this.adventures.findIndex(a => a.id === adventureId)
    if (index === -1) return false
    this.adventures.splice(index, 1)
    return true 
  }

  getAdventures(): Adventure[] {
    return [...this.adventures]
  }
}

