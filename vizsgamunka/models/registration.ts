
import {Entity} from '../interfaces/interfaces'
import {Adventure} from './adventure'
import {Team} from './team'
import {RegistrationStatus} from '../enums/enums'

export class Registration implements Entity {
  constructor(
    public id: string,
    public team: Team,
    public adventure: Adventure,
    public status: RegistrationStatus,
    public registered_at: Date,
    public note?: string
  ){}
}
