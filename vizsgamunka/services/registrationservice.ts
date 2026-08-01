import {InMemoryRepository} from '../repositories/inmemory'
import {Team} from '../models/team'
import {Adventure} from '../models/adventure'
import {Registration} from '../models/registration'
import {RegistrationStatus} from '../enums/enums'

export class RegistrationService{
  constructor(
    private registrationRepo: InMemoryRepository<Registration>,
    private teamRepo: InMemoryRepository<Team>,
    private adventureRepo: InMemoryRepository<Adventure>
  ){}







  
}
