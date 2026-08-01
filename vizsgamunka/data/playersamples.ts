import { ExperienceLevel } from "../enums/enums";
import { Player } from "../models/player";
import { Team } from "../models/team";

// Játékosok

export const anna = new Player(
  "player_1",
  "Név Anna",
  ExperienceLevel.Beginner
);

export const bela = new Player(
  "player_2",
  "Minta Béla",
  ExperienceLevel.Intermediate
);

export const csilla = new Player(
  "player_3",
  "Teszt Csilla",
  ExperienceLevel.Experienced,
  "Cica"
);

export const david = new Player(
  "player_4",
  "Próba Dávid",
  ExperienceLevel.Beginner
);

export const emese = new Player(
  "player_5",
  "Kiss Emese",
  ExperienceLevel.Intermediate
);

export const ferenc = new Player(
  "player_6",
  "Nagy Ferenc",
  ExperienceLevel.Experienced
);

export const gabriella = new Player(
  "player_7",
  "Molnár Gabriella",
  ExperienceLevel.Beginner
);

export const henrik = new Player(
  "player_8",
  "Fekete Henrik",
  ExperienceLevel.Intermediate,
  "Heni"
);

export const players: Player[] = [
  anna,
  bela,
  csilla,
  david,
  emese,
  ferenc,
  gabriella,
  henrik
];

// Csapatok


export const ravens = new Team(
  "team_1",
  "Ravens",
  "Név Anna",
  "anna@example.com"
);

ravens.addPlayer(anna);
ravens.addPlayer(bela);
ravens.addPlayer(csilla);

export const owls = new Team(
  "team_2",
  "Owls",
  "Kiss Emese",
  "emese@example.com"
);

owls.addPlayer(emese);
owls.addPlayer(david);

export const wolves = new Team(
  "team_3",
  "Wolves",
  "Nagy Ferenc",
  "ferenc@example.com"
);

wolves.addPlayer(ferenc);
wolves.addPlayer(gabriella);
wolves.addPlayer(henrik);

export const dragons = new Team(
  "team_4",
  "Dragons",
  "Teszt Csilla",
  "csilla@example.com"
);

dragons.addPlayer(csilla);
dragons.addPlayer(bela);
dragons.addPlayer(david);
dragons.addPlayer(emese);
dragons.addPlayer(gabriella);

export const teams: Team[] = [
  ravens,
  owls,
  wolves,
  dragons
];
