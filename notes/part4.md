# Part 4 Muistiinpanot

## Yksikkötestaus
Asenna testikirjasto Jest:
```console
npm install --save-dev jest
```

Testauksen tavallinen kulku:
```console
test('function with variable', () => {
  const result = function('variable')
  expect(result).toBe('something')
})
```
Jest odottaa, että testitiedoston nimessä on merkkijono .test.

Describe-lohkon avulla yksittäisessä tiedostossa olevat testit voidaan jaotella kokonaisuuksiin.
```console
describe('theme', () => {
  // tests
})
```