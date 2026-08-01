
A feladat témájának egy szerepjátékos eseményt választottam. 2025-ben a frontend alapozó projektmunkám az alábbi weboldal: https://klub-osszevissza.statichost.eu/

Ez egy fiktív lovecrafti szerepjátékos klub oldala, amihez kitaláltam állandó mesélőket, aktuális kalandokat. 
A jelenlegi beadandómban első lépésben kialakítottam az akciótervet és felépítettem az alábbi mappaszerkezetet:
```text
TypeScript/
├── vizsgamunka/
│   ├── models/
│   │   ├── eventday.ts
│   │   ├── adventure.ts
│   │   ├── gamemaster.ts
│   │   ├── player.ts
│   │   ├── team.ts
│   │   └── registration.ts
│   │
│   ├── enums/
│   │   ├── enums.ts
│   │
│   ├── interfaces/
│   │   ├── interfaces.ts
│   │
│   ├── repositories/
│   │   └── inmemory.ts
│   │
│   ├── services/
│   │   ├── teamservice.ts
│   │   └── registrationservice.ts
│   │
│   ├── decorators/
│   │   └── logactions.ts
│   │
│   ├── data/
│   │   ├── sample.ts
│   │   └── teamsample.ts
│   │
│   └── main.ts
│
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

Alapfeladatokon túl egy log dekorátor használatát és az aszinkronitást választottam a tesztelés ellenében. Ez a két téma közelebb áll hozzám Pythonban is, ezért oda tettem a téteket.

A projekt felépítése **egymásra épülő rétegekből** áll.

Az alapot az **interface**-ek adják. Az `Entity` interface biztosítja, hogy minden tárolható objektumnak legyen egyedi azonosítója. Erre épül a generikus `Repository<T>` interface, amely meghatározza az adattárolás közös műveleteit, például az objektumok hozzáadását, lekérését, módosítását és törlését.

A `Repository<T>` interface-t az `InMemoryRepository<T>` osztály valósítja meg. A generikus típus használatával ugyanaz a **repository** képes különböző entitások, például játékosok, csapatok, kalandok és regisztrációk tárolására. Az objektumokat egy `Map<string, T>` tárolja, amelyben az egyedi azonosító a kulcs.

A repository rétegre épülnek a **modellek**. A `Player`, `Team`, `GameMaster`, `Adventure`, `EventDay` és `Registration` osztályok a rendszer fő entitásait reprezentálják, és mindegyik megvalósítja az `Entity` interface-t. A modellek tárolják az adatokat, illetve a saját működésükhöz szorosan kapcsolódó egyszerűbb műveleteket, például játékos hozzáadását egy csapathoz vagy a csapat létszámának lekérdezését.

A modellek és repositoryk fölött helyezkednek el a **service osztályok**. A service-ek nem közvetlenül tárolják az adatokat, hanem a repositorykon keresztül érik el őket. Itt található az üzleti logika és a validáció, például annak ellenőrzése, hogy létezik-e egy csapat vagy kaland, megfelelő-e a csapat létszáma, illetve jelentkezett-e már ugyanaz a csapat egy másik kalandra.

A `main.ts` a kész rétegeket használja: létrehozza a repositorykat és service-eket, betölti a mintaadatokat, majd bemutatja a rendszer működését. Így az adattárolás, az adatmodellek, az üzleti logika és a program futtatása elkülönül egymástól.

### Főbb funkciók

- Eseménynap létrehozása és kezelése
- Kalandok nyilvántartása
- Mesélők kezelése
- Játékosok és csapatok kezelése
- Csapatok regisztrálása kalandokra
- Létszám- és duplikációellenőrzés
- Kalandok szűrése játékrendszer szerint
- Naplózás dekorátor segítségével
- Async/await példa hibakezeléssel

Összességében a hangsúlyt a réteges felépítésre, a generikus adattárolásra, az üzleti logika elkülönítésére, valamint a rugalmas szerkezet kialakítására helyeztem. A projekten önállóan dolgoztam, a szerkezet átgondolásában és az időről időre felmerülő szintaxis akadályok leküzdésében illetve a sample adatok monoton generálásában LLM segítségét vettem igénybe. A projekt felépítésével, az architekturális döntésekkel és a megvalósítással kapcsolatos döntéseket saját magam hoztam meg. 

Igyekeztem olyan megoldásokat választani, amelyek nemcsak a feladat követelményeinek felelnek meg, hanem számomra is érdekesek voltak.