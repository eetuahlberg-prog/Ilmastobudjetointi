# Korjausversion 1.1 tarkistus – 13.10.2026

## Automaattitestit

`npm test`: 25 testiä läpäisty.

- Alkuperäiset 14 laskenta-, validointi-, maakunta- ja liikennevalotestiä.
- Oman kunnan omat lähtötiedot ja tavoitteet, varmuuskopion validointi sekä erillisyys maakuntasummasta.
- Puuttuvien ja virheellisten lähtötietojen hylkääminen.
- Excel-tuonnin kumoaminen, muiden kuntien ja myöhemmin muutettujen tavoiteasetusten säilyttäminen.
- Oman kunnan ensimmäisen lisäyksen ja myöhemmän tietovuoden kumoaminen.
- Jokaisen 13 sektorin rajat 95, 100, 100,1, 103, 105, 105,1 ja 110 tavoitteen ollessa 100; myös sektorikohtaisesti muutetut tavoiteurat.
- 14 alueen kaikki neljä näkymää ja sektori-ikkunat muodostuvat DOM-korvikkeella.
- Sanalliset sektoriluokitukset sekä taulukossa, sektori-ikkunassa että Excelin vientiriveillä. Sektoritavoitteiden asetuksissa keltainen tila käyttää samaa luokittelua.
- Oman kunnan Excel-esikatselun ja hyväksynnän tapahtumankäsittely, tavoiteasetusten pakollisuus, talousarviovuoden vaihto, raportin nimi ja paikallinen tallennus.
- Tampereen, Lahden, Hämeenlinnan ja Pedersören kunnan tunnistus ALas-rakenteisista testiriveistä. Väärän menetelmän, puuttuvien arvojen, hyvitysten, puuttuvien sektorien ja ristiriitaisten tietojen hylkäys.
- Saman kunnan Excel-päivityksen tavoiteasetusten säilyminen sekä eri kuntaan vaihtamisen ja kumoamisen toiminta.
- Tuonnin hyväksymisen ja kumoamisen käyttöliittymälogiikka.

## Säilytetyt tiedostot ja tunnukset

Alkuperäiseen ZIP-pakettiin verrattuna `data/dataset.json`, `data/source-audit.json`, `src/core.js`, `src/exports.js` ja vendor-kirjasto ovat tavutasolla muuttumattomat. Logot on kopioitu sopeutumistyökalujen käytössä olevista tiedostoista; niiden mittasuhteita tai värejä ei muokattu. Ilmastovisio-tiedostossa on aito alpha-läpinäkyvyys.

Excel-testit käyttävät ALas-rakenteisia testirivejä ja käyttöliittymätestit DOM-korviketta. Tässä päivityksessä ei ole tehty oikean selaimen tiedostovalitsimen testiä uudella kunta-Excelillä.

## Tulostus ja tarkistuksen rajaus

Tulostustyyleissä ovat punainen otsake, EU-tunnus, Ilmastovisio-logo, rahoituslauseke, versionumero ja valittu talousarviovuosi. Liikennevalojen värin rinnalla tulostuu sanallinen tulos. Ohjauspainikkeet ja syöttölomakkeet piilotetaan tulosteesta.

**Oikean selaimen visuaalista tarkistusta ja PDF:n sivutuksen varmistusta ei voitu tehdä:** Chromiumin lataus epäonnistui. DOM-korvike tarkistaa muodostuvan sisällön ja tapahtumien logiikan, mutta ei CSS-asettelua, selaimen lomakevalidointia, latausikkunoita tai PDF-renderöintiä. GitHub-julkaisua ei tehty.

Ennen julkista käyttöönottoa tarkista selaimessa työpöytä- ja mobiilinäkymä sekä yksi A4-vaakatuloste: tunnusten luettavuus, sektoritaulukon mahtuminen sivulle, kolmen värin ja sanallisten luokitusten näkyminen. Valitse taustagrafiikat ja poista selaimen omat ylä- ja alatunnisteet.
