import {Entity} from '../interfaces/interfaces'
import {GameMaster} from './gamemaster'
import {GameSystem} from '../enums/enums'
import {Player} from './player'


export class Adventure implements Entity {
  private players: Player[] = []
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public system: GameSystem,
    public gameMaster: GameMaster,
    public minTeamSize: number,
    public maxTeamSize: number
  ){}

  addPlayer(player: Player): void {
    this.players.push(player);
  }

// One eternity later...:)
  removePlayer(playerId: string): boolean {
    const filtered = this.players.filter(p => p.id !== playerId);
    if (filtered.length === this.players.length) return false;
    this.players = filtered;
    return true;
  }
}

// Ajj, nem ez jön. A Team játszik, nem a player és még nincs Team.

