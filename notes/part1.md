# Part 1 Muistiinpanot


## React
Helpoin tapa päästä alkuun Reactin käytössä on create-react-app -työkalun käyttö. 
```console
npx create-react-app part1 && cd part1
npm start
```

### React-komponentit
Reactilla ohjelmoitaessa yleensä kaikki renderöitävä sisältö määritellään Reactin komponenttien avulla. React-komponenttien ulkoasu kirjoitetaan yleensä hyödyntäen JSX:ää, joka on tapa kirjoittaa JavaScriptiä. JSX:ssä täytyy muistaa sulkea jokainen tagi.

Reactissa ideana on koostaa sovellus useasta pienestä komponentista, joita voi käyttää uudelleen. Yleensä juurikomponentti nimetään nimellä App. React komponenttien nimien täytyy alkaa isolla kirjaimella.

React-komponentin sisällön tulee sisältää yksi juurielementti (esim. div tai tyhjä elementti <>...</>) tai sisältö täytyy olla esimerkiksi taulukkona (hakasulkeet).

Komponentin voi saada renderöitymään uudelleen sivulle kutsumalla funtkiota ReactDOM.render. Tämä ei kuitenkaan ole paras tapa päivittää komponentteja. 

### Tiedonvälitys komponenttien välillä
Tiedonvälitys komponenttien välillä onnistuu hyödyntämällä niin sanottuja propseja. Propsit voidaan asettaa komponentin parametriksi normaaliin JavaScript tapaan. Tämä parametri saa arvokseen olion, jonka kenttinä ovat kaikki käyttäjän määrittelemät muuttujat.

### Komponenttien tilat
Komponenttien tiloja voi muuttaa useState-funktiolla. Alla esimerkki laskurista:
```console
const [ counter, setCounter ] = useState(0)
```
Tilaa muuttavan funktion kutsuminen aiheuttaa komponentin uudelleenrenderöitymisen.

Jos halutaan luoda sovellukselle useita erillisiä tiloja, voidaan useState-funktiota kutsua moneen eri kertaan. Toinen vaihtoehto on luoda tilan paikalle oma olio. Tässä tapauksessa tilaa voi muokata esimerkiksi seuraavanlaisesti:
```console
const handleLeftClick = () => {
  const newClicks = { 
    ...clicks, 
    left: clicks.left + 1 
  }
  setClicks(newClicks)
}
```
Reactissa ei ole sallittua muuttaa tilaa suoraan, vaan aina täytyy tehdö vanhasta tilasta kopio ja muuttaa sitä, minkä jälkeen voi asettaa tämän uuden kopion vanhan tilalle. Funktiota useState ei saa kutsua loopissa tai ehtolausekkeiden sisällä.

### Reactin debuggaus
Koodin suorituksen voi pysäyttää Chromen developer-konsolin debuggeriin kirjoittamalla koodiin komennon "debugger". Debuggerissa on mahdollista suorittaa koodia rivi kerrallaan Sources-välilehden oikealla laidalla.

## JavaScript
- Aaltosulkeiden sisällä oleva koodi evaluoidaan ja tulos upotetaan määriteltyyn kohtaan komponentin HTML-koodia.

Javascript suoritetaaan komennolla:
```console
node tiedosto.js 
```

Muuttujan määrittely: let
Vakion määrittely: const
Muuttujan tallettaman tiedon tyyppi voi muuttua. 

Taulukon läpikäynti:
```console
const t = [1,2,3]
t.push(4)
t.forEach(value => {
    console.log(value)
})
```

React-koodissa kannattaa pushaamisen sijaan käyttäää concat-metodia uusien arvojen lisäämiseksi.

Olioiden kenttiin voi viitata pistenotaatiolla tai hakasulkeilla. Olion määrittely: 
```console
const object = {
    kenttä1: 'arvo',
    kenttä2: 123,
}
```
