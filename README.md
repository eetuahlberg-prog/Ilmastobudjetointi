# Ilmastobudjetti

Ilmastobudjetti on Pohjois-Karjalan maakuntaliiton selainpohjainen työkalu kuntien päästökehityksen seurantaan ja talousarvion valmisteluun. Se muodostaa lineaarisen päästöbudjetin, sektorikohtaisen tarkastelun ja tulostettavan raportin. Korjausversio 1.1.

Mukana ovat Pohjois-Karjalan 13 kunnan päästötiedot ja niistä laskettu maakuntanäkymä. **Muu kunta** mahdollistaa käytön muualla Suomessa käyttäjän omilla lähtötiedoilla. Työkalu tukee Hinku-laskentaa ilman päästöhyvityksiä. Se ei ole päästöennuste eikä virallinen hyväksymismenettely.

## Näkymät ja ominaisuudet

Kolme varsinaista näkymää ovat:

1. **Yhteenveto:** päästökehitys, tavoiteura, tunnusluvut ja viimeisimmän toteuman tilanne.
2. **Päästöbudjetti:** sektorikohtaiset toteumat, muutokset ja päästöbudjetit. Sektorin nimestä avautuu oma diagrammi.
3. **Raportti:** valitun alueen ja talousarviovuoden tulostettava kokonaisuus.

**Asetukset ja aineisto** sisältää tavoiteasetukset, päästötietojen päivittämisen ja varmuuskopioinnin. Tavoitteet voidaan määritellä yhteisellä vähennysprosentilla tai sektoreittain. Taulukot voi ladata Excel- ja CSV-tiedostoina, diagrammit PNG-kuvina ja näkymät tulostaa selaimesta PDF-tiedostoksi.

Tässä toteutuksessa ei ole toimenpiteiden, vastuutahojen tai kustannusten kirjauslomaketta. Vanhojen varmuuskopioiden `actions`-kenttä säilytetään yhteensopivuuden vuoksi.

## Ilmastobudjetin laatiminen

1. Valitse **maakunta tai kunta** ja **talousarviovuosi** työkalun alusta.
2. Valitse kunnan **Asetukset ja aineisto**. Tarkista lähtövuosi, tavoitevuosi, vähennysprosentti ja tarvittaessa sektorikohtaiset tavoitteet. Pohjois-Karjalan kuntien tekninen aloitusasetus on 2007–2030 ja 65 %. Se ei ole väite kunnan päätetystä tavoitteesta.
3. Tarkista päästöaineisto. Pohjois-Karjalan kuntien tiedot ovat mukana. Niitä voi päivittää Syken ALas-Excelistä. Muun kunnan tiedot annetaan erikseen jäljempänä kuvatulla tavalla.
4. Merkitse tavoitteet tarkistetuiksi asetuksissa. Merkintä poistaa tarkistamattomista asetuksista kertovan huomautuksen, mutta ei tarkoita poliittista hyväksyntää.
5. Tarkista **Yhteenveto** ja **Päästöbudjetti**. Liikennevalot vertaavat viimeisimmän toteumavuoden lukuja saman vuoden tavoiteuraan. Valittu talousarviovuosi ohjaa budjettisarakketta, raportin otsikointia ja vientien vuosimerkintää.
6. Avaa **Raportti** ja valitse **Tulosta / tallenna PDF**. Valitse selaimessa PDF-tallennus, A4 vaaka ja taustagrafiikat. Poista selaimen omat ylä- ja alatunnisteet. Tarkista esikatselun sivutus ennen tallentamista.
7. Valitse asetuksissa **Lataa päivitetty data**. JSON-varmuuskopio sisältää kaikkien kuntien päästötiedot, tavoitteet ja mahdollisen oman kunnan tiedot.

Muutokset tallentuvat vain tämän selaimen paikalliseen tallennukseen. Ne eivät päivity julkiselle sivustolle. Kuntien tavoitteet säilyvät toisistaan erillisinä. Talousarviovuoden vaihtaminen ei muuta toteumavuotta eikä tee tulevien vuosien budjetista toteumaa.

## Muu kunta

Valitse aluevalikon viimeinen vaihtoehto **Muu kunta** ja anna kunnan nimi. Ennen laskelmien näyttämistä tarvitaan:

- tietojen lähde;
- lähtövuosi ja sitä myöhempi toteumavuosi;
- molemmilta vuosilta kaikki 13 päästösektoria sekä lähteen kokonaispäästöt;
- kunnan oma tavoitevuosi ja päästövähennysprosentti.

Yksikkö on **kt CO₂e**: 1 kt = 1 000 tonnia. Käytä molempina vuosina samaa Hinku-laskentaa ilman päästöhyvityksiä. Tyhjää kenttää ei tulkita nollaksi. Anna 0 vain todellisen nollapäästön kohdalle. Kokonaispäästöjen ja sektorisumman sallittu ero on enintään 0,75 kt, kuten alkuperäisessä aineistovalidoinnissa; sillä huomioidaan lähteen pyöristys.

Tiedot ja tavoite tarkistetaan ennen tallennusta. Puutteellisista lähtötiedoista ei muodosteta laskelmaa tai liikennevaloa. Kunnan nimeä voi muuttaa yläosan kentässä, ja se päivittyy raporttiin ja vienteihin.

Tallennuksen jälkeen tavoitteita muokataan samoista asetuksista kuin muidenkin kuntien tavoitteita. **Lisää tai päivitä tietovuosi** -painikkeella voi syöttää uuden vuoden tai korjata aiempaa vuotta. Nykyisen vuoden valitseminen täyttää sen päästöluvut lomakkeelle. Tallennus säilyttää muut vuodet ja tavoiteuran lähtötason. Tarvittaessa lähtötaso päivitetään erikseen asetuksista.

Työkalussa on yksi oman kunnan tietopaikka. Sen tiedot tallentuvat selaimeen ja koko aineiston varmuuskopioon. Niitä ei liitetä Pohjois-Karjalan maakunnan summaan. Muun kunnan tiedot syötetään tässä versiossa käsin; ALas-Excelin tuonti tukee mukana olevia 13 Pohjois-Karjalan kuntaa.

## Kumoa viimeisin lisäys

Painike peruu viimeisimmän hyväksytyn päästötietojen lisäyksen:

- Pohjois-Karjalan kunnan tai usean kunnan Excel-tuonnin;
- oman kunnan ensimmäisen tietolisäyksen;
- oman kunnan tietovuoden lisäämisen tai päivittämisen.

Painikkeen vieressä kerrotaan, mitä on kumottavissa. Vahvistuksen jälkeen aiemmat päästötiedot palautuvat ja laskelmat päivittyvät. Excel-erän kumoaminen koskee vain kyseisessä erässä tuotuja kuntia. Erikseen tehdyt tavoiteasetusten muutokset säilyvät. Oman kunnan ensimmäisen lisäyksen kumoaminen poistaa kyseisen oman kunnan tiedot ja niihin sidotut tavoitteet.

Muistissa on yksi kumottava lisäys. Sen tiedot säilyvät tässä selaimessa myös sivun latauksen yli. Kumoamisen jälkeen painike poistuu käytöstä. Varmuuskopion palauttaminen ja julkaistun aineiston käyttöönotto tyhjentävät kumoamismuistin; ne ovat koko aineiston vaihtoja, eivät tämän painikkeen kumottavia lisäyksiä. JSON-varmuuskopio ei sisällä kumoamishistoriaa.

## Laskentaperiaatteet

Automaattisessa tilassa päästöbudjetti lähtövuoden ja tavoitevuoden välillä on:

```text
budjetti(vuosi) = lähtötaso × [1 − (vähennysprosentti / 100)
                             × (vuosi − lähtövuosi) / (tavoitevuosi − lähtövuosi)]
```

Tavoitejakson ulkopuolelle ei ekstrapoloida arvoja. Lähtötaso tallennetaan erikseen, joten uusi päästöaineisto ei itsestään siirrä aiemmin määriteltyä tavoiteuraa. Asetuksista voi päivittää lähtötason tietoisesti.

Automaattisessa tilassa kaikilla sektoreilla on sama suhteellinen vähennys. Sektorikohtaisessa tilassa jokainen sektori käyttää omaa vähennystavoitettaan; puuttuva sektorikohtainen prosentti käyttää yleistä tavoitetta. Kokonaistulos summataan sektoreista. Sektorien yhteenlaskettua tavoitetta ei pakoteta vastaamaan yleistä tavoitetta: niiden ero näytetään asetuksissa.

Lähteen kokonaispäästöt säilytetään. Kokonaispäästöjen ja sektorisumman pyöristysero kulkee laskennassa erillisenä erotuksena ja pienenee yleisellä vähennysprosentilla. Se ei ole päästösektori. Laskennan välituloksia ei pyöristetä.

Maakunnan toteumat ovat 13 kunnan summa. Mukaan otetaan vain vuodet, joilta kaikilla kunnilla on tiedot. Maakunnan tavoiteura on kuntien omien tavoiteurien summa niiden yhteiseltä tavoitejaksolta. Oman kunnan tietopaikka ei vaikuta maakuntaan.

### Liikennevalot

Kaikki päästöjen ja tavoiteurien vertailut käyttävät funktiota `traffic()` tiedostossa `src/additions.js`. Positiiviselle tavoitearvolle suhteellinen ylitys on `(toteuma − tavoiteura) / tavoiteura × 100`.

| Tila | Ehto |
| --- | --- |
| Vihreä – Tavoiteuralla | Toteuma on tavoiteuralla tai sen alapuolella. |
| Keltainen – Lähellä tavoiteuraa | Toteuma ylittää tavoiteuran enintään 5 %. |
| Punainen – Tavoiteuran yläpuolella | Ylitys on yli 5 %. |
| Harmaa – Vertailua ei saatavilla | Vertailutieto puuttuu tai on kelpaamaton. |

Kun tavoite on nolla, nollatoteuma on vihreä ja positiivinen toteuma punainen. Nollalla ei jaeta. Tasan 5 % on keltainen. Värin määritys käyttää tarkkoja lukuja, ei pyöristettyä näyttötekstiä. Sektoritaulukko, sektori-ikkuna, raportti, yleinen yhteenveto ja sektoritavoitteiden arviointi käyttävät samaa luokittelua. Palloissa on valkoinen reuna ja tuloksen yhteydessä sanallinen tila. Excelin sektoritaulukkoon viedään sanallinen luokitus.

## Lähtöaineisto

Mukana ovat Heinävesi, Ilomantsi, Joensuu, Juuka, Kitee, Kontiolahti, Lieksa, Liperi, Nurmes, Outokumpu, Polvijärvi, Rääkkylä ja Tohmajärvi. Toimitusaineistossa on 21 havaintovuotta: 1990 ja 2005–2024. Puuttuvia vuosia ei täytetä laskennallisesti.

Lähde on Suomen ympäristökeskuksen [kuntien ja alueiden päästöpalvelu](https://paastot.hiilineutraalisuomi.fi/), käyttäjän toimittamat ALas-Excelit. Tiedostonimien latauspäivä on 15.9.2026, eikä sitä tulkita aineiston julkaisupäiväksi. Menetelmä on **Hinku-laskenta ilman päästöhyvityksiä**. Hyvitysrivin nolla ei tarkoita, ettei toisessa laskentamenetelmässä voisi olla hyvityksiä. Hyvityksiä sisältävää laskentaa ei tueta tässä versiossa.

Excel-tuonti lukee `KHK-päästöt`-välilehden: kunnan, vuodet, 13 päästösektoria, kokonaispäästöt, hyvitysrivin sekä mahdolliset asukas- ja asukaskohtaiset tiedot. Se tunnistaa rivit nimillä. Väärä laskentamenetelmä, puuttuvat arvot, päästötaulukon kaavat, ristiriitaiset summat ja puuttuvat vanhat vuodet estävät tuonnin hyväksymisen. Tuonti näyttää vertailun ennen tallennusta.

`data/source-audit.json` on alkuperäisten Excelien tarkastusraportti. Se ei päivity selaimen tietotuonnissa. Oman kunnan tiedoista vastaa niiden syöttäjä.

## Tekninen toteutus

Sovellus käyttää HTML:ää, CSS:ää ja JavaScript-moduuleja. Erillistä palvelinlogiikkaa, tietokantaa, kirjautumista tai käännösvaihetta ei tarvita. JSON-aineiston ja moduulien lataaminen edellyttää HTTP-palvelinta; `index.html`-tiedoston kaksoisnapsautus ei riitä.

| Tiedosto tai kansio | Tehtävä |
| --- | --- |
| `index.html` | Aloitussivu, tunnukset, alue- ja vuosivalinta, ohje, navigointi ja alatunniste |
| `assets/styles.css` | Ulkoasu, mobiili- ja tulostustyylit |
| `assets/*.png` | Pohjois-Karjalan, Ilmastovision ja EU:n tunnukset |
| `src/app.js` | Käyttöliittymä, raportti, syöttölomakkeet, selaintallennus ja tapahtumat |
| `src/core.js` | Alkuperäiset kuntalaskennat, perusvalidointi ja CSV |
| `src/additions.js` | Maakunnan summat, yhteinen liikennevaloluokittelu ja sektorivärit |
| `src/custom.js` | Oman kunnan lähtötiedot, laajennettu validointi ja yhden lisäyksen kumoaminen |
| `src/importer.js` | ALas-Excelin lukeminen ja tuontivertailu |
| `src/exports.js` | Excel- ja PNG-viennit |
| `vendor/` | Paikallinen JSZip-kirjasto ja sen lisenssi |
| `data/dataset.json` | Julkaistut päästötiedot, tavoitteet ja yhteensopivuuskentät |
| `data/source-audit.json` | Alkuperäisen lähdeaineiston tarkastus |
| `scripts/serve.mjs` | Paikallinen esikatselupalvelin |
| `scripts/convert_sources.py` | Alkuperäisten Excelien muunnos ylläpitoa varten |
| `tests/` | Laskennan, validoinnin ja käyttöliittymälogiikan testit |
| `TESTAUS.md` | Testauksen tulokset ja rajaukset |

`dataset.json` käyttää alkuperäistä `schemaVersion: 1` -rakennetta: `municipalities`, `configs`, `actions` ja `publishedRevision`. Valinnaiset `otherMunicipality` ja `otherConfig` tallentavat oman kunnan erillään alkuperäisistä kunnista. Vanhan version varmuuskopio ilman näitä kenttiä hyväksytään. Oman kunnan sisältävä varmuuskopio kannattaa avata tällä korjausversiolla.

Paikallisen tallennuksen avain säilyy muodossa `pk-ilmastobudjetti-v1`, joten olemassa olevat selaintiedot voidaan lukea. Tallennus sisältää myös valitun talousarviovuoden ja viimeisimmän kumottavan lisäyksen. Avaus näyttää maakuntanäkymän.

Ulkoasussa käytetään brändikirjan punaista `#E4003A`, alkuperäisiä kuvamuotoisia tunnuksia sekä Ubuntu-kirjasinperhettä. Ubuntu haetaan Google Fontsista, jos yhteys sallii sen; varalla on Arial. Maksullisia otsikkofontteja ei sisälly pakettiin. Ilmastovisio-logo on läpinäkyvä PNG samasta tunnusaineistosta kuin sopeutumistyökalujen sivustolla. EU-tunnus on valkoinen versio punaisella taustalla. Molemmat hankkeen ja rahoittajan tunnukset näkyvät tulostuksessa.

## Julkaiseminen ja ylläpito

Pura ZIP ja korvaa GitHub-repositorion tiedostot **ilmastobudjetti-kansion sisällöllä**. `index.html` kuuluu repositorion juureen, ja `assets`, `src`, `data` ja `vendor` sen rinnalle. Älä lataa pelkkää ZIP-tiedostoa. Tässä toimituksessa on mukana koko alkuperäinen päästöaineisto, joten myös `data/dataset.json` voidaan korvata, jos omaa päivitettyä aineistoa ei tarvitse säilyttää.

Jo toimivan GitHub Pages -sivuston julkaisuasetukset säilyvät. Odota julkaisun valmistumista ja päivitä sivu tarvittaessa Ctrl+F5:llä. Jos selaimessa on oma aiempi aineisto, se säilyy päivityksestä huolimatta; tarvittaessa valitse asetuksista **Ota julkaistu aineisto käyttöön**.

Normaali päästöaineiston päivitys tehdään selaimen Excel-tuonnilla, tarkistetaan ja viedään **Lataa päivitetty data** -painikkeella. Julkinen aineisto päivitetään korvaamalla `data/dataset.json`. Koko tiedoston sisältö tulee julkisesti luettavaksi.

Laskennan muutokset tehdään `core.js`- ja `additions.js`-moduuleihin, oman kunnan ja kumoamisen muutokset `custom.js`-moduuliin. Aja testit muutosten jälkeen. Alkuperäisaineiston Python-muunnos vaatii openpyxl-kirjaston ja korvaa toimitusaineiston: se ei ole tavallinen vuosipäivitys.

Paikallinen esikatselu projektikansiossa:

```sh
npm run dev
```

Avaa `http://localhost:4173`. Vaihtoehto on `python -m http.server 8000`, jolloin osoite on `http://localhost:8000`. Npm-paketteja ei tarvitse asentaa.

Automaattitestit:

```sh
npm test
```

Työkalu ei yhdistä usean käyttäjän muokkauksia. Älä muokkaa samaa aineistoa yhtä aikaa eri välilehdissä. Selaintiedot voivat kadota selaimen tyhjennyksessä; säilytä JSON-varmuuskopio erikseen.

## Tekijä ja rahoitus

Pohjois-Karjalan maakuntaliitto · Ilmastovisio – Uutta kasvua ilmastotyöllä Pohjois-Karjalaan.

Työkalun kehittämistä on rahoitettu Euroopan unionin oikeudenmukaisen siirtymän rahastosta (JTF) osana Ilmastovisio – Uutta kasvua ilmastotyöllä Pohjois-Karjalaan -hanketta.
