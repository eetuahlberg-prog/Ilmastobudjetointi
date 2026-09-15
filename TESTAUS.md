# Testausmuistio

Tarkastettu 15.9.2026. Toimitusaineistossa ei ole testitoimenpiteitä tai keksittyjä päästövuosia.

## Automaattiset testit

Komento `npm test`: 9 testiä, kaikki hyväksytty. Testit sisältävät kaikkien 13 kunnan lähdeaineiston tarkistuksen, jokaisen tavoitevuoden sektorisumman ja kokonaisbudjetin täsmäytyksen, 65/70 prosentin tavoitteet, sektorikohtaiset tavoitteet, muuttumattoman tavoiteuran aineistopäivityksessä, puuttuvat/nolla-arvot, virheellisen aineiston hylkäämisen, varmuuskopion validoinnin ja CSV-muotoilun.

Kontiolahti 2007 / 2030 / 65 %: lähtötaso 94,2 kt, tavoite 32,97 kt. Vuoden 2024 budjetti 48,943478… kt, toteuma 56,5 kt ja erotus +7,556522… kt. Näytössä luvut pyöristyvät yhteen desimaaliin.

## Selaimessa tarkastettu

| Käyttötapaus | Havainto |
| --- | --- |
| A. Kontiolahden tavoite | Oikea lähtötaso, tavoite, toteuma ja poikkeama näkyvät. |
| B. Kunnan vaihtaminen | Kaikki 13 kuntaa avattu. Kuntakohtaiset toimenpiteet säilyvät erillisinä. |
| C. Tavoitteen muuttaminen 70 prosenttiin | Tavoitetaso muuttui 28,3 kt:iin, palautus 65 prosenttiin 33,0 kt:iin. |
| D. Toimenpiteet | Lisäys, kopiointi, muokkaus sekä Tallenna + lisää seuraava tarkastettu. 50 000 euron investointi näkyi yhteenvedoissa. Toisen rivin tyhjä investointi jäi puuttuvaksi eikä nollaksi. |
| E. Yhden Excelin tuonti | Kontiolahti tunnistui ja nykyinen aineisto täsmäsi. Erillisellä testitiedostolla tunnistettiin lisätty 2025-sarake. Hyväksymisen jälkeen tavoiteura säilyi. |
| F. Usean Excelin tuonti | Kaikki 13 alkuperäistä Exceliä tuotiin yhdellä valinnalla. Kaikissa 0 muuttunutta aiempaa vuotta suhteessa valmiiseen dataan. Hyväksyminen onnistui. |
| G. Raportti | Raporttinäkymä, sisältö ja tulostuspainike tarkastettu. Tulostustyylit toteutettu A4-vaakamuotoon ja niiden visuaalinen asettelu tarkastettu erillisessä HTML-esikatselussa. Lopullista PDF-tiedoston sivutusta ei voitu tarkistaa selainympäristön tulostusrajoituksen vuoksi. |
| H. CSV-vienti | Toimenpiteiden CSV latautui. Sisältö, suomalainen sarake-erotin, otsikot ja rivit luettiin latauksesta. CSV-muotoilu testattu myös automaattisesti. |
| Varmuuskopio | Koko dataset.json ladattu, palautuksen esikatselu tunnisti 13 kuntaa ja 2 testitoimenpidettä; palautus vahvistuksella onnistui. |
| Julkaistuun aineistoon palaaminen | Paikallinen testiaineisto korvattiin alkuperäisellä aineistolla. |
| Mobiili | 390 × 844 -kokoisen näkymän ulkoasu tarkastettu selaimessa. Navigaatio vierittyy vaakasuunnassa ja tunnusluvut asettuvat kahteen sarakkeeseen. |

Testitiedoston vuoden 2025 luvut olivat tarkoituksella kopioituja arvoja, jotta tuontipolku voitiin tarkistaa. Tiedosto ei sisälly toimitukseen. Sovelluksen varsinainen aineisto päättyy vuoteen 2024.

## Tekninen tarkistus ja rajat

JavaScript-moduulien syntaksi tarkastettu. Excelin lukija on mukana paikallisena tiedostona. Sovellus avautui staattisella palvelimella ilman build-vaihetta. GitHub Pages -asetukset tehdään repositoriossa README-ohjeen mukaan; sivustoa ei ole julkaistu käyttäjän GitHub-tilille tästä ympäristöstä.

Saavutettavuudessa on lomakkeiden nimet, näppäimistöllä käytettävät painikkeet ja dialogit, näkyvä kohdistus, diagrammien taulukkovastineet ja tekstimuotoiset tilat. Tämä ei ole täydellinen WCAG-auditointi.

Selaimen tukemissa ympäristöissä sivu rekisteröi vapaaehtoisen, vain lukevan `read_climate_budget`-rajapinnan. Testiselaimessa WebMCP ei ollut käytettävissä, joten sen ajonaikaista rekisteröintiä ei voitu varmistaa. Tämä ei vaikuta tavalliseen käyttöön.

Ennen ensimmäisen talousarvioliitteen käyttämistä tarkista oman selaimen tulostusesikatselusta sivutus, A4-vaakasuunta, taustagrafiikat ja ylä-/alatunnisteet. Pitkät käyttäjän kirjoittamat toimenpiteet voivat kasvattaa raportin sivumäärää.
