import {ExperienceLevel} from '../enums/enums'
import {Entity} from '../interfaces/interfaces' 

export class Player implements Entity {
  constructor(
    public id: string,
    public name: string,
    public experienceLevel: ExperienceLevel,
    public nickname?: string    
  ){}
}
