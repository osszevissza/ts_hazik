import {InMemoryRepository} from '../repositories/inmemory'
import {Team} from '../models/team'
import {Adventure} from '../models/adventure'
import {Registration} from '../models/registration'
import {RegistrationStatus} from '../enums/enums'
import {Log} from '../decorators/logactions'


export class RegistrationService{
  constructor(
    private registrationRepo: InMemoryRepository<Registration>,
    private teamRepo: InMemoryRepository<Team>,
    private adventureRepo: InMemoryRepository<Adventure>
  ){}

// Regisztráció
  @Log
  registerTeam(teamId: string, adventureId: string): Registration {
    const team = this.teamRepo.getById(teamId)
    if (!team) {
      throw new Error(`A ${teamId} csapat nem található.`)
    }
    
    const adventure = this.adventureRepo.getById(adventureId)
    if (!adventure) {
      throw new Error(`A ${adventureId} kaland nem található.`)
    }
    
    if (!adventure.isTeamSizeValid(team.getSize())) {
      throw new Error(`A csapat létszáma (${team.getSize()}) nem megfelelő ehhez a kalandhoz (${adventure.minTeamSize}-${adventure.maxTeamSize} fő).`)
    }
    
    const alreadyRegistered = this.registrationRepo.getAll().some(
       reg => reg.team.id === teamId && reg.adventure.id === adventureId && reg.status === RegistrationStatus.Accepted
    )
    
    if (alreadyRegistered) {
      throw new Error(`A csapat már jelentkezett erre a kalandra.`)
    }
    
    const hasOtherRegistration = this.registrationRepo.getAll().some(
      reg => reg.team.id === teamId && reg.status === RegistrationStatus.Accepted
    )
    
    if (hasOtherRegistration) {
      throw new Error(`A csapat már jelentkezett egy másik kalandra.`)
    }

    const registration = new Registration (
      `reg_${this.registrationRepo.getAll().length + 1}`,
      team,
      adventure,
      RegistrationStatus.Accepted,
      new Date()
    )

    this.registrationRepo.add(registration)
    return registration 
  }

  
// Visszavonás
  @Log  
  withdrawRegistration(registrationId: string): void {
    const registration = this.registrationRepo.getById(registrationId)
    if (!registration) {
      throw new Error (`A ${registrationId} regisztráció nem található.`)
    }
    
    if (registration.status === RegistrationStatus.Withdrawn) {
        throw new Error(`A regisztráció már vissza van vonva.`)
    }
    registration.status = RegistrationStatus.Withdrawn
  }

    
// Regisztrációk megtekintése

  getRegistrations(): Registration[] {
    return this.registrationRepo.getAll()
    }

    

  getRegistrationsByAdventure(adventureId: string): Registration[] {
    return this.registrationRepo.getAll().filter(
        reg => reg.adventure.id === adventureId && reg.status === RegistrationStatus.Accepted)
    }

    

  getRegistrationByTeam(teamId: string): Registration | undefined {
    return this.registrationRepo.getAll().find(
        reg => reg.team.id === teamId && reg.status === RegistrationStatus.Accepted
    )
  }

//Async - bónusz

async registerTeamAsync(
  teamId: string, adventureId: string): Promise<Registration> {
    try {
        await Promise.resolve()
        return this.registerTeam(teamId, adventureId)}
    catch (error) {throw error}
  }

}
