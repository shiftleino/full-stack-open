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

### Tiedonvälitys komponenttien välillä
Tiedonvälitys komponenttien välillä onnistuu hyödyntämällä niin sanottuja propseja. Propsit voidaan asettaa komponentin parametriksi normaaliin JavaScript tapaan. Tämä parametri saa arvokseen olion, jonka kenttinä ovat kaikki käyttäjän määrittelemät muuttujat.

## JavaScript
- Aaltosulkeiden sisällä oleva koodi evaluoidaan ja tulos upotetaan määriteltyyn kohtaan komponentin HTML-koodia.