import {Entity} from '../interfaces/interfaces'
import { Player } from './player'

export class Team implements Entity {
  private players = new Map<string, Player>()
  constructor(
    public id: string,
    public name: string,
    public contactName: string,
    public contactEmail: string
  ) {}
  
  addPlayer(player: Player): void {
    this.players.set(player.id, player)
  }
  
  removePlayer(playerId: string): boolean {
    return this.players.delete(playerId)
  }

  getPlayerById(playerId: string): Player | undefined {
    return this.players.get(playerId)
 }
  
  getSize(): number {
    return this.players.size
  }

  getPlayers(): Player[] {
    return [...this.players.values()]
  }
}
