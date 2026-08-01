import {InMemoryRepository} from '../repositories/inmemory'
import {Team} from '../models/team'
import {Player} from '../models/player'
import { ExperienceLevel } from '../enums/enums'

export class TeamService{
  constructor(
    private teamRepo: InMemoryRepository<Team>,
    private playerRepo: InMemoryRepository<Player>
  ){}

// Csapat létrehozása

  createTeam(id: string, name: string, contactName: string, contactEmail: string): Team {
    const existingById = this.teamRepo.getById(id)
    if (existingById) {
        throw new Error(`A ${id} csapat id már létezik.`)
    }

    const existingByName = this.teamRepo.getAll().find(team => team.name === name)
    if (existingByName) {
        throw new Error(`A ${name} csapat már létezik.`)
    }

    const team = new Team(id, name, contactName, contactEmail)
    this.teamRepo.add(team)
    return team
  }

  
// Csapat módosítása

  updateTeam(id: string, name?: string, contactName?: string, contactEmail?: string): void {
    const team = this.teamRepo.getById(id)
    if (!team) {
        throw new Error(`Ezzel ${id} nincs csapat`)
    }

    if (name !== undefined) {
        team.name = name
    }
    
    if (contactName !== undefined) {
        team.contactName = contactName
    }
    
    if (contactEmail !== undefined) {
        team.contactEmail = contactEmail
    }
  }

  
// Csapat törlése

  deleteTeam(teamId: string): boolean {
    const team = this.teamRepo.getById(teamId)

    if (!team) {
      throw new Error(`A ${teamId} csapat nem található.`)
    }

    return this.teamRepo.delete(teamId)
  }

  
// Játékos hozzáadása

 addPlayerToTeam(teamId: string, playerId: string): void {
    const team = this.teamRepo.getById(teamId)
    if (!team) {
        throw new Error(`A ${teamId} csapat nem található.`)
    }

    const player = this.playerRepo.getById(playerId)
    if (!player) {
        throw new Error(`A ${playerId} játékos nem található.`)
    }

    if (team.getPlayerById(playerId)) {
        throw new Error(`A ${playerId} játékos már tagja a csapatnak.`)        
    }

    team.addPlayer(player)
  }


// Játékos létrehozása

  createPlayer(id: string, name: string, experienceLevel: ExperienceLevel, nickname?: string): Player {
    const existing = this.playerRepo.getById(id)
    if (existing) {
        throw new Error(`A ${id} játékos id már létezik.`)
    }

    const player = new Player(id, name, experienceLevel, nickname)
    this.playerRepo.add(player)
    return player
  }

// Játékos törlése

  removePlayerFromTeam(teamId: string, playerId: string): void {
    const team = this.teamRepo.getById(teamId)
    if (!team) {
        throw new Error(`A ${teamId} csapat nem található.`)
    }

    const removed = team.removePlayer(playerId)
    if (!removed) {
        throw new Error(`A ${playerId} játékos nincs a csapatban.`)
    }
  }

}
