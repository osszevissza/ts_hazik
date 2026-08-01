import {InMemoryRepository} from "./repositories/inmemory"
import {EventDay} from "./models/eventday"
import {GameMaster} from "./models/gamemaster"
import {Adventure} from "./models/adventure"
import {Player} from "./models/player"
import {Team} from "./models/team"
import {Registration} from "./models/registration"

import {TeamService} from "./services/teamservice"
import {RegistrationService} from "./services/registrationservice"

import {eventDay, gameMasters, adventures} from "./data/sample"
import {players,teams} from "./data/teamsample"

import { GameSystem } from "./enums/enums"


async function main(): Promise<void> {
  console.log("Szerepjátékos klub eseménynap-kezelő")

  const eventDayRepo = new InMemoryRepository<EventDay>()
  const gameMasterRepo = new InMemoryRepository<GameMaster>()
  const adventureRepo = new InMemoryRepository<Adventure>()
  const playerRepo = new InMemoryRepository<Player>()
  const teamRepo = new InMemoryRepository<Team>()
  const registrationRepo = new InMemoryRepository<Registration>()


  // Sample adatok betöltése
  
  eventDayRepo.add(eventDay)
  gameMasters.forEach(gameMaster => {gameMasterRepo.add(gameMaster)})
  adventures.forEach(adventure => {adventureRepo.add(adventure)})
  players.forEach(player => {playerRepo.add(player)})
  teams.forEach(team => {teamRepo.add(team)})


  // Service-ek létrehozása

  const teamService = new TeamService(
    teamRepo,
    playerRepo
  )

  const registrationService = new RegistrationService(
    registrationRepo,
    teamRepo,
    adventureRepo
  )


  // Eseménynap adatainak megjelenítése

  console.log("\n--- Eseménynap ---")

  console.log(`Név: ${eventDay.name}`)
  console.log(`Helyszín: ${eventDay.location}`)
  console.log(`Dátum: ${eventDay.date.toLocaleDateString("hu-HU")}`)


  // Kalandok listázása

  console.log("\n--- Kalandok ---")

  eventDay.getAdventures().forEach(adventure => {
    console.log(
      `${adventure.title} | ` +
      `${adventure.system} | ` +
      `Mesélő: ${adventure.gameMaster.name} | ` +
      `Létszám: ${adventure.minTeamSize}-${adventure.maxTeamSize} fő`
    )
  })


  // Tematikus szűrés játékrendszer szerint

  console.log("\n--- Call of Cthulhu kalandok ---")

  const callOfCthulhuAdventures = eventDay.getAdventuresBySystem(GameSystem.CallOfCthulhu)

  callOfCthulhuAdventures.forEach(adventure => {console.log(`- ${adventure.title}`)})


  // Csapatok listázása

  console.log("\n--- Regisztrált csapatok ---")

  teamRepo.getAll().forEach(team => {
    console.log(`${team.name}: ${team.getSize()} fő`)

    team.getPlayers().forEach(player => {
    console.log(`  - ${player.name} (${player.experienceLevel})`)})
  })


  // Csapat módosítása

  console.log("\n--- Csapat módosítása ---")

  const firstTeam = teams[0]

  if (firstTeam) {
    teamService.updateTeam(
      firstTeam.id,
      firstTeam.name,
      firstTeam.contactName,
      "uj-email@example.com"
    )

    console.log(`${firstTeam.name} új kapcsolattartói e-mail-címe: ` + firstTeam.contactEmail)}


  // Sikeres regisztrációk

  console.log("\n--- Sikeres regisztrációk ---")

  try {
    const firstRegistration =
      registrationService.registerTeam(
        "team_1",
        "adv_1"
      )

    console.log(
      `${firstRegistration.team.name} sikeresen jelentkezett: ` +
      `${firstRegistration.adventure.title}`
    )
  }
  catch (error) {
    printError(error)
  }

  try {
    const secondRegistration =
      registrationService.registerTeam(
        "team_3",
        "adv_2"
      )

    console.log(
      `${secondRegistration.team.name} sikeresen jelentkezett: ` +
      `${secondRegistration.adventure.title}`
    )
  }
  catch (error) {
    printError(error)
  }


  // Hibás létszám bemutatása

  console.log("\n--- Hibás létszám tesztelése ---")

  try {
    registrationService.registerTeam(
      "team_2",
      "adv_3"
    )
  }
  catch (error) {
    printError(error)
  }


  // Duplikált jelentkezés bemutatása

  console.log("\n--- Duplikált jelentkezés tesztelése ---")

  try {
    registrationService.registerTeam(
      "team_1",
      "adv_1"
    )
  }
  catch (error) {
    printError(error)
  }


  // Másik kalandra történő jelentkezés tiltása

  console.log("\n--- Másik kalandra jelentkezés tesztelése ---")

  try {
    registrationService.registerTeam(
      "team_1",
      "adv_4"
    )
  }
  catch (error) {
    printError(error)
  }


  // Aktív regisztrációk listázása

  console.log("\n--- Aktív regisztrációk ---")

  registrationService.getRegistrations().forEach(registration => {
    console.log(
      `${registration.id}: ` +
      `${registration.team.name} → ` +
      `${registration.adventure.title} | ` +
      `${registration.status}`
    )
  })


  // Egy kalandhoz tartozó regisztrációk

  console.log("\n--- Az első kaland csapatai ---")

  const firstAdventureRegistrations = registrationService.getRegistrationsByAdventure(
      "adv_1"
    )

  firstAdventureRegistrations.forEach(registration => {
    console.log(`- ${registration.team.name}`)
  })


  // Regisztráció visszavonása

  console.log("\n--- Regisztráció visszavonása ---")

  try {
    registrationService.withdrawRegistration(
      "reg_1"
    )

    console.log("A reg_1 regisztráció visszavonása sikeres.")
  }
  catch (error) {printError(error)}


  // Aszinkron (demo)

  console.log("\n--- Aszinkron regisztráció ---")

  try {
    const asyncRegistration =
      await registrationService.registerTeamAsync(
        "team_4",
        "adv_3"
      )

    console.log(
      `${asyncRegistration.team.name} aszinkron módon jelentkezett: ` +
      `${asyncRegistration.adventure.title}`
    )
  } catch (error) {
    printError(error)
  }


  // Végső állapot

  console.log("\n--- Minden regisztráció ---")

  registrationService.getRegistrations().forEach(registration => {
    console.log(
      `${registration.id}: ` +
      `${registration.team.name} → ` +
      `${registration.adventure.title} | ` +
      `${registration.status}`
    )
  })


  // Kaland eltávolítása és visszahelyezése

  console.log("\n--- Kaland eltávolítása ---")

  const adventureToRemove = adventures[3]

  if (adventureToRemove) {
    const removed =
      eventDay.removeAdventure(adventureToRemove.id)

    console.log(
      removed
        ? `${adventureToRemove.title} eltávolítva.`
        : "A kaland nem található."
    )

    eventDay.addAdventure(adventureToRemove)

    console.log(
      `${adventureToRemove.title} visszahelyezve az eseménynapra.`
    )
  }

// Végjáték

  console.log("Ennyi.")
}


function printError(error: unknown): void {
  if (error instanceof Error) {
    console.error(`Hiba: ${error.message}`)
    return
  }

  console.error("Ismeretlen hiba történt.")
}


main().catch(error => {
  printError(error)
})
