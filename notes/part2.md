# Part 2 Muistiinpanot

## Yleistä
- React tarvitsee taulukoita renderöidessä <li>-elementin sisään key attribuutin, jolla erotella taulukon eri luvut.
- Usein yksittäiset komponentit määritellään omissa tiedostoissaan ES6-moduuleina. 

## Lomakkeiden käsittely
- Tapahtumankäsittelijä-funktioon voidaan lisätä event.preventDefault(), jonka avulla voidaan välttää esimerkiksi sivun uudelleenlatautuminen.

```console
<form onSubmit={addNote}>
    <input
        value={newNote}
        onChange={handleNoteChange}
    />
    <button type="submit">save</button>
</form> 
```

## JSON-server
- Mahdollistaa palvelinpuolen toiminnallisuuksien käyttämisen kehitysvaiheessa.
```console
npx json-server --port=PORT --watch FILENAME
```

## Datan hakeminen palvelimelta
- JavaScript suoritinympäristöt noudattavat asynkronista mallia, eli kaikki IO-operaatiot suoritetaan siten, että operaatioiden tulosta ei jäädä odottamaan vaan koodin suoritus jatkuu eteenpäin. 
- Datan hakemiseen palvelimelta voidaan käyttää promiseihin perustuvaa funktiota fetch
- npm (node package manager) -komennot tulee antaa vain projektin juurihakemistossa (sama missä package.json sijaitsee)

### Promiset
- Promise edustaa asynkronista operaatiota, joka voi olla kolmessa tilassa:
1. Pending: Promisea vastaavaa operaatiota ei ole vielä tapahtunut
2. Fulfilled: Promisen operaatio onnistui
3. Rejected: Operaatio epäonnistui 
- Operaatiota vastaava tulos saadaan selville tapahtumankuuntelijan avulla.
```console
promise.then(response => {
  console.log(response)
})
```

### Effect-hookit
useEffect()-funktio suoritetaan renderöinnin jälkeen. Tilan päivittävän funktion kutsu aiheuttaa komponentin uudelleen renderöitymisen. Jos funktion useEffect toisena parametrina on vain tyhjä taulukko, suoritetaan efekti ainoastaan komponentin ensimmäisen renderöinnin jälkeen.
```console
useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}, [])
```
