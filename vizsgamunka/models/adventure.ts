import {Entity} from '../interfaces/interfaces'
import {GameMaster} from './gamemaster'
import {GameSystem} from '../enums/enums'
import {Player} from './player'


export class Adventure implements Entity {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public system: GameSystem,
    public gameMaster: GameMaster,
    public minTeamSize: number,
    public maxTeamSize: number
  ){}
  
  isTeamSizeValid(size: number): boolean {
    return size >= this.minTeamSize && size <= this.maxTeamSize
  }
}

