import {Entity} from '../interfaces/interfaces'
import { Player } from './player'

export class Team implements Entity {
  private players: Player[] = []
  constructor(
    public id: string,
    public name: string,
    public contactName: string,
    public contactEmail: string
  ) {}
  
  addPlayer(player: Player): void {
    this.players.push(player)
  }
  
  removePlayer(playerId: string): boolean {
    const index = this.players.findIndex(p => p.id === playerId)
    if (index === -1) return false
    this.players.splice(index, 1)
    return true
  }

  getPlayerById(playerId: string): Player | undefined {
    return this.players.find(player => player.id === playerId)
 }
  
  getSize(): number {
    return this.players.length
  }

  getPlayers(): Player[] {
    return [...this.players]
  }
}
