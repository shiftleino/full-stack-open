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