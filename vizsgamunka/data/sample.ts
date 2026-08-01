import { GameSystem } from "../enums/enums"
import { GameMaster } from "../models/gamemaster"
import { Adventure } from "../models/adventure"
import { EventDay } from "../models/eventday"


// Mesélők

export const nemezis = new GameMaster(
  "gm_1",
  "Vasvári Péter",
  GameSystem.CohorsCthulhu,
  "Nemezis"
)

export const brazil = new GameMaster(
  "gm_2",
  "Bódi László",
  GameSystem.CallOfCthulhu,
  "Brazil"
)

export const koppany = new GameMaster(
  "gm_3",
  "Dr. Hegyi Koppány",
  GameSystem.D2O
)

export const kira = new GameMaster(
  "gm_4",
  "Szabó Kíra",
  GameSystem.CallOfCthulhu
)

export const gameMasters: GameMaster[] = [
  nemezis,
  brazil,
  koppany,
  kira
]


// Kalandok

export const harvest = new Adventure(
  "adv_1",
  "Az aratás",
  "Laurium városában titokzatos és halálos járvány pusztít. "
    + "A Róma által küldött önkéntesek feladata, hogy felderítsék "
    + "a betegség és a Batavia területéről érkező gyümölcs kapcsolatát.",
  GameSystem.CohorsCthulhu,
  nemezis,
  3,
  5
)

export const shadowsOfTheGrayZone = new Adventure(
  "adv_2",
  "A szürke zóna árnyai",
  "Silent Hollow kisvárosát sűrű és természetellenes köd borítja be. "
    + "A köd hatására emlékek tűnnek el, megváltozik a térérzékelés, "
    + "és néhány lakos nyomtalanul eltűnik.",
  GameSystem.CallOfCthulhu,
  brazil,
  3,
  5
)

export const interstellarCartographer = new Adventure(
  "adv_3",
  "A csillagközi kartográfus",
  "A Miskatonic Egyetem könyvtárában egy ismeretlen nyelven íródott "
    + "tekercs kerül elő. A tekercs csillagászati ábrái valójában "
    + "a valóságon túli helyekhez vezető térképet rejtenek.",
  GameSystem.D2O,
  koppany,
  3,
  5
)

export const blackWater = new Adventure(
  "adv_4",
  "A fekete víz",
  "Oakhaven tengerparti falujában különös események kezdődnek. "
    + "A halászok idegen lényeket fognak ki, éjszakánként hangok "
    + "érkeznek a mélyből, majd egy fiatal lány is eltűnik.",
  GameSystem.CallOfCthulhu,
  kira,
  3,
  5
)

export const adventures: Adventure[] = [
  harvest,
  shadowsOfTheGrayZone,
  interstellarCartographer,
  blackWater
]


// Eseménynap

export const eventDay = new EventDay(
  "event_1",
  "KülönöS Klub – szerepjátékos eseménynap",
  "Budapest",
  new Date("2026-08-15")
)

adventures.forEach(adventure => {
  eventDay.addAdventure(adventure)
})
