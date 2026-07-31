# Szerepjátékos klub eseménynap-kezelő rendszer

## 1. Projekt célja

A projekt célja egy konkrét szerepjátékos klubnap kalandjait, mesélőit, csapatait és jelentkezéseit kezeli.
Egy eseménynapon több különböző szerepjátékos kaland fut. Minden kalandhoz tartozik egy mesélő, egy meghatározott szerepjátékrendszer, műfaj és létszámkorlát.
A jelentkezés alapegysége a csapat. A csapat több játékosból áll, és egy kiválasztott kalandra jelentkezhet.

---

# 2. A rendszer fő felépítése

A rendszer központi objektuma az eseménynap.
Az eseménynap tartalmazza a meghirdetett kalandokat. A kalandokhoz mesélők tartoznak, a csapatok pedig regisztrációkon keresztül kapcsolódnak a választott kalandhoz.

A fő kapcsolat:

```text
EventDay
└── Adventure
    ├── GameMaster
    └── Registration
        └── Team
            └── Player
```
---

# 3. Fő entitások

## EventDay

Az `EventDay` egy konkrét szerepjátékos klubnapot reprezentál.

### Tulajdonságok

- egyedi azonosító;
- eseménynap neve;
- helyszín;
- dátum;
- kalandok listája.
    

### Felelőssége

- az eseménynap alapadatainak tárolása;
- kaland hozzáadása;
- kaland eltávolítása;
- a meghirdetett kalandok listázása.
    
Az eseménynaphoz nem szükséges külön státusz, mert a projekt egy konkrét eseménynapot kezel.


## Adventure

Az `Adventure` egy konkrét szerepjátékos kalandot / játékasztalt reprezentál.

### Tulajdonságok

- egyedi azonosító;
- cím;
- rövid leírás;
- műfaj;
- szerepjátékrendszer;
- mesélő;
- minimális csapatlétszám;
- maximális csapatlétszám;
    
    

### Felelőssége

- a kaland adatainak tárolása;
- a minimális és maximális létszám meghatározása;    
- annak ellenőrzése, hogy egy adott csapat létszáma megfelelő-e;
- a kalandhoz tartozó regisztrációk lekérdezése.
    

A kalandhoz nem szükséges külön `Open` vagy `Full` státusz. Az, hogy fogad-e még jelentkezést, a meglévő regisztrációk és a létszámkorlát alapján meghatározható.


## GameMaster

A `GameMaster` egy mesélőt reprezentál.

### Tulajdonságok

- egyedi azonosító;
- név;
- opcionális becenév;
- kedvelt szerepjátékrendszerek;
  
### Felelőssége

- a mesélő adatainak tárolása;    
- mesélő hozzárendelése egy kalandhoz.

Egy kalandhoz egy mesélő tartozik.


## Player

A `Player` egy csapattagot reprezentál.

### Tulajdonságok

- egyedi azonosító;
- név;
- opcionális becenév;
- tapasztalati szint.
    

### Felelőssége

- a játékos alapadatainak tárolása.
    
A játékos önállóan nem jelentkezik kalandra. A jelentkezési folyamatban a csapat vesz részt.

## Team

A `Team` a rendszer fő jelentkező egysége.

### Tulajdonságok

- egyedi azonosító;
- csapatnév;
- játékosok listája;
- kapcsolattartó neve;
- kapcsolattartó e-mail-címe.
    

### Felelőssége

- játékos hozzáadása;
- játékos eltávolítása;
- csapattagok listázása;
- aktuális létszám lekérdezése;
- csapat adatainak módosítása.
    

## Registration

A `Registration` köti össze a csapatot az eseménynap egyik kalandjával.

### Tulajdonságok

- egyedi azonosító;
- csapat;
- kaland;
- jelentkezés időpontja;
- jelentkezés státusza;
- opcionális megjegyzés.

### Felelőssége

- a csapat és a választott kaland kapcsolatának tárolása;
- a jelentkezés állapotának nyilvántartása;
- a jelentkezés visszavonásának kezelése.
    

A regisztráció nem kerül törlésre visszavonáskor, hanem a státusza változik meg.

---

# 4. Enumok

## RegistrationStatus

- `Accepted`    
- `Withdrawn`
    

## ExperienceLevel

A játékos tapasztalati szintje:

- `Beginner`
- `Intermediate`
- `Experienced`

## AdventureGenre

A kaland műfaja, ezen még gondolkozom kell-e.
  
---

# 5. Interface-ek

## Identifiable

Közös interface minden olyan entitáshoz, amely egyedi azonosítóval rendelkezik.

Használhatja:

- `EventDay`
- `Adventure`
- `GameMaster`
- `Player`
- `Team`
- `Registration`
    

## Repository

Generikus interface az objektumok tárolásához.

### Alapműveletek

- objektum hozzáadása;
- objektum lekérése azonosító alapján;
- összes objektum lekérése;
- objektum módosítása;
- objektum törlése.


---
    
# 6. Generikus repository

Külön repository-példány használható:

```text
InMemoryRepository<EventDay>
InMemoryRepository<Adventure>
InMemoryRepository<GameMaster>
InMemoryRepository<Player>
InMemoryRepository<Team>
InMemoryRepository<Registration>
```

A repository kizárólag az adatok tárolásáért felel.

Nem tartalmaz üzleti szabályokat, például nem ellenőrzi, hogy egy csapat jelentkezhet-e egy kalandra.

---

# 7. Service osztályok

A projektben csak azokhoz a területekhez készül külön service osztály, ahol valódi üzleti logika található.

## TeamService

A csapatok kezeléséért felel.

### Fő funkciók

- csapat létrehozása;
- csapat módosítása;
- csapat törlése;
- játékos hozzáadása;
- játékos eltávolítása;
- csapatok listázása;
- csapat létszámának lekérdezése.
    

### Validációk

- ugyanaz a játékos ne szerepeljen kétszer ugyanabban a csapatban;
- nem létező játékost ne lehessen eltávolítani;
- egy csapatnak legyen legalább egy tagja;
- azonos nevű vagy azonos azonosítójú csapat ne jöjjön létre kétszer.
    

## RegistrationService

A rendszer fő üzleti logikáját tartalmazza.

### Fő funkciók

- csapat jelentkeztetése egy kalandra;
- jelentkezés visszavonása;
- jelentkezések listázása;
- egy csapat jelentkezésének lekérdezése;
- egy kalandhoz tartozó regisztrációk lekérdezése

### Validációk

A jelentkezés előtt a rendszer ellenőrzi:

- létezik-e a csapat;
- létezik-e a kaland;
- a kaland az adott eseménynaphoz tartozik-e;
- a csapat létszáma eléri-e a kaland minimális létszámát;
- a csapat létszáma nem haladja-e meg a kaland maximális létszámát;
- a csapat nem jelentkezett-e már ugyanarra a kalandra;
- a csapat nem jelentkezett-e már másik kalandra ugyanazon az eseménynapon;
- nincs-e már visszavont, de tévesen aktívként kezelt regisztráció.

---
    
# 8. Fő üzleti szabályok

## Egy csapat egy kalandra jelentkezhet

Egy csapat az adott eseménynapon csak egy kalandhoz tartozhat.

## Csapatlétszám ellenőrzése

A csapat létszámának a kaland minimum- és maximumlétszáma közé kell esnie.

Példa:

```text
Kaland létszáma: 3–5 fő
Csapat létszáma: 4 fő
Eredmény: jelentkezhet
```

```text
Kaland létszáma: 3–5 fő
Csapat létszáma: 6 fő
Eredmény: nem jelentkezhet
```

## Duplikált jelentkezés tiltása

Ugyanaz a csapat nem jelentkezhet többször ugyanarra a kalandra.

## Visszavont jelentkezés kezelése

A visszavont jelentkezés megmarad a rendszerben, de nem számít aktív jelentkezésnek. Ezt még kitalálom, lehet csak törlődik. PTSD-m van a remove-tól.

## Egyedi azonosítók

Nem lehet két külön objektum azonos azonosítóval, ezt validálni.

---

# 9. Keresési és lekérdezési funkciók

- kalandok keresését műfaj szerint;
- kalandok keresését szerepjátékrendszer szerint;
- kalandok keresését mesélő szerint;
- csapat keresését név alapján;
- egy kalandhoz tartozó csapatok listázását;
- egy csapat választott kalandjának lekérdezését;    
- az összes aktív jelentkezés listázását.

---

# 10. Dekorátorok

Naplózáshoz, lehet lesz neki egy külön fájl, még kitalálom.

---

# 11. Aszinkronitás (ezekből 0-1-2 maximum)

- csapat jelentkeztetése;
- jelentkezés visszavonása;
- visszaigazolás szimulált elküldése;
- adatok szimulált mentése.
    
---

# 12. Tervezett  mappaszerkezet

```text
rpg-event-manager/
├── src/
│   ├── models/
│   │   ├── event-day.ts
│   │   ├── adventure.ts
│   │   ├── game-master.ts
│   │   ├── player.ts
│   │   ├── team.ts
│   │   └── registration.ts
│   │
│   ├── enums/
│   │   ├── registration-status.ts
│   │   ├── experience-level.ts
│   │   ├── adventure-genre.ts
│   │   └── game-system.ts
│   │
│   ├── interfaces/
│   │   ├── identifiable.ts
│   │   └── repository.ts
│   │
│   ├── repositories/
│   │   └── in-memory-repository.ts
│   │
│   ├── services/
│   │   ├── team-service.ts
│   │   └── registration-service.ts
│   │
│   ├── decorators/
│   │   └── log-action.ts
│   │
│   ├── data/
│   │   └── sample-data.ts
│   │
│   ├── utils/
│   │   └── id-generator.ts
│   │
│   └── main.ts
│
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```


# Lehetséges folyamat:

1. egy eseménynap létrehozása;
2. több mesélő létrehozása;
3. több kaland létrehozása;
4. a kalandok hozzáadása az eseménynaphoz;
5. játékosok létrehozása;
6. 3–5 csapat létrehozása;
7. játékosok hozzáadása a csapatokhoz;
8. csapatok jelentkeztetése különböző kalandokra;
9. sikeres jelentkezések megjelenítése;
10. túl kis csapat jelentkeztetésének megkísérlése;
11. túl nagy csapat jelentkeztetésének megkísérlése;
12. ugyanazon csapat második jelentkezésének megkísérlése;
13. jelentkezés visszavonása;
14. kalandok és hozzájuk tartozó csapatok listázása;
15. keresés műfaj, mesélő vagy szerepjátékrendszer szerint.
    

# 14. Az alapverzió tartalma:

- egy eseménynap kezelését;
- több kaland kezelését;
- mesélők kezelését;
- játékosok kezelését;
- csapatok kezelését;
- csapatalapú jelentkezést;
- csapatlétszám ellenőrzését;
- duplikált jelentkezések tiltását;
- egy csapat egy kaland szabályt;
- regisztráció visszavonását;
- keresési és listázási funkciókat;
- enumokat;
- interface-eket;
- generikus repository-t;
- hibakezelést;
- legalább egy dekorátort;    
- legalább egy aszinkron metódust.
    
