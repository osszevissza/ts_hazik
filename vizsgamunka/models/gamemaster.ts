import {GameSystem} from '../enums/enums'
import {Entity} from '../interfaces/interfaces' 

export class GameMaster implements Entity {
  constructor(
    public id: string,
    public name: string,
    public preferredsystem: GameSystem,
    public nickname?: string    
  ){}
}
