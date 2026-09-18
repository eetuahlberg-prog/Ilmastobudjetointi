# Pohjois-Karjalan kuntien ilmastobudjetti

Valmis selainpohjainen työkalu 13 kunnalle: toteutuneet päästöt, lineaarinen päästöbudjetti, sektorikohtaiset tavoitteet ja tulostettava raportti. Kaikkien kuntien päästötiedot ovat mukana. Työkalu toimii GitHub Pagesissa ilman palvelinta, tietokantaa, kirjautumista tai maksullista palvelua.

## Päivitä nykyinen GitHub-sivusto

Päivitys 18.9.2026 lisää maakuntanäkymän, liikennevalot, Excel- ja PNG-viennit, nykyisen näkymän PDF-tulostuksen sekä kiinteät sektorivärit. Kuntien laskenta ja aineiston rakenne säilyvät.

1. Pura ZIP-tiedosto.
2. Korvaa repositoriossa **ilmastobudjetti-kansion sisältö** vastaavilla tiedostoilla ja kansioilla. Älä lataa ZIP-tiedostoa sellaisenaan. `index.html` pysyy repositorion juuressa.
3. Jos olet päivittänyt omaa aineistoasi, säilytä nykyinen **data/dataset.json**. Paketin tiedosto sisältää alkuperäisen 13 kunnan aineiston; sen rakenne ei ole muuttunut.
4. Lisää myös uudet tiedostot **src/additions.js** ja **src/exports.js**. Päivitys tarvitsee lisäksi muuttuneet **src/app.js**, **assets/styles.css** ja **index.html**. Pelkkä app.js:n korvaaminen ei riitä.
5. Tallenna muutokset ja odota nykyisen Pages-julkaisun valmistumista. Päivitä sivu selaimessa tarvittaessa Ctrl+F5:llä.

## Uudet näkymät ja lataukset

Aloitusvalinta on **Pohjois-Karjala · maakunta**. Valitse kunta samasta valikosta. Maakunnan vuosittaiset kokonais- ja sektoripäästöt ovat 13 kunnan summa. Maakunnan tavoiteura on kuntien nykyisten tavoiteurien summa, myös silloin kun kuntien tavoitteet eroavat toisistaan. Kuntien asetuksia ei korvata maakunnan asetuksilla eikä maakuntatietoja tallenneta kuntadataan.

Tavoiteura esitetään kuntien tavoitejaksojen yhteisiltä vuosilta. Puuttuvia kuntavuosia ei tulkita nollaksi: maakunnan toteuma näytetään vain vuosilta, joilta kaikki kuntatiedot löytyvät. Aineiston tai kuntatavoitteiden päivitys päivittyy automaattisesti maakuntanäkymään.

Liikennevalot vertaavat aina toteumaa saman vuoden tavoiteuraan. Yksi yhteinen selite kertoo merkitykset; yksittäisissä valoissa on ruudunlukijan nimi ja hiiren osoittimella näkyvä otsake. Vihreä kattaa tavoiteuran ja sen alituksen sekä enintään 0,05 kt CO₂e:n ylityksen. Keltainen tarkoittaa tätä suurempaa, mutta enintään 5 %:n ylitystä. Punainen tarkoittaa suurempaa ylitystä. Nollatavoitteella yli 0,05 kt ylitys on punainen. Puuttuva vertailu on harmaa. Nämä ovat työkalun teknisiä luokittelurajoja, eivät kunnan päätettyjä tavoitteita. Raja-arvot ovat yhdessä paikassa: **src/additions.js → TRAFFIC_LIMITS**.

Lataa vain tarvitsemasi aineisto näkymän painikkeista:

- **Lataa päästötaulukko Excel**: näkymän sektoritaulukko ja lähdetiedot oikeana `.xlsx`-tiedostona. Luvut ovat numeerisia, eivät tekstiksi muutettuja tai näyttötarkkuuteen pyöristettyjä.
- **Lataa vuositaulukko Excel**: diagrammin vuosittaiset toteumat, tavoiteura ja erotukset.
- **Lataa diagrammi PNG**: nykyinen kokonaisdiagrammi, sektorivärit, selite, yksikkö ja lähde 3240 × 1800 pikselin kuvana. Yksittäisen sektorin diagrammin ja vuositaulukon voi ladata avaamalla sektorin nimen taulukosta.
- **Tulosta / tallenna näkymä PDF**: avoin näkymä selaimen tulostustoiminnolla. Valitse tulostuskohteeksi **Tallenna PDF-tiedostona**. Koko diagrammin ja sektoritaulukon sisältävä kokonaisuus löytyy **Raportti**-näkymästä. PDF:n tuottaminen ei edellytä ulkoista palvelua.

Sektorivärit määritellään nimien perusteella keskitetysti **src/additions.js → SECTOR_COLORS**. Samat värit kulkevat näytön SVG-kaaviosta PNG-kuvaan ja PDF-tulosteeseen.

Selaimeen tallennetut tavoiteasetukset säilyvät. Vanhojen varmuuskopioiden `actions`-kenttä säilytetään yhteensopivuuden vuoksi, mutta sitä ei näytetä tai muokata käyttöliittymässä. Jos vanhassa aineistossa on toimenpiteitä, ne säilyvät myös koko aineiston JSON-varmuuskopiossa.

## Julkaise GitHub Pagesissa

1. Pura ZIP-tiedosto tietokoneellesi.
2. Luo GitHubiin uusi repository, esimerkiksi `ilmastobudjetti`. Käytä organisaatiosi julkaisukäytäntöä.
3. Valitse repositoriossa **Add file → Upload files**.
4. Vedä **ilmastobudjetti-kansion sisältö** GitHubiin: `index.html`, `assets`, `src`, `vendor`, `data` ja muut mukana tulevat tiedostot. Älä lataa pelkkää ZIP-tiedostoa tai jätä kaikkea ylimääräisen ilmastobudjetti-kansion sisään. `index.html` pitää näkyä repositorion etusivulla.
5. Tallenna valitsemalla **Commit changes**. Oletushaaran nimi on tavallisesti `main`.
6. Avaa repositorion **Settings → Pages**. Jos Settings ei näy, tarvitset repositorion ylläpito-oikeuden.
7. Valitse **Source: Deploy from a branch**, **Branch: main**, kansioksi **/(root)** ja **Save**.
8. Odota julkaisun valmistumista. Pages-asetuksiin ilmestyy sivuston osoite. Avaa se **Visit site** -painikkeella.

Erillistä build-komentoa tai npm-asennusta ei tarvita. Kaikki sivuston tiedostopolut ovat suhteellisia, joten työkalu toimii myös repositorion nimisessä alihakemistossa. Mukana on `.nojekyll`. GitHubin selainlatauksessa piilotiedosto voi jäädä pois; tämä tavallisista kansioista koostuva sivusto toimii myös silloin.

Jos näkyy **There isn't a GitHub Pages site here**, tarkista nämä:

- Avaa julkaistu Pages-osoite, älä repositorion tiedostosivua.
- Varmista, että `index.html` on juuri valitussa `main`-haaran juurikansiossa.
- Varmista Pages-asetusten `main` ja `/(root)`.
- Katso **Actions**-välilehdeltä, onko Pages-julkaisu valmistunut onnistuneesti.

Ohje perustuu [GitHubin Pages-julkaisulähteen ohjeeseen](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Aloita kunnan ilmastobudjetti

1. Aloitusnäkymä näyttää maakunnan. Valitse tarvittaessa kunta vasemmalta ja talousarviovuosi yläreunasta. Aloitusvuosi on 2027.
2. Avaa **Asetukset ja aineisto**. Tarkista lähtövuosi, tavoitevuosi ja päästövähennysprosentti.
3. Kaikkien kuntien tekninen aloitusasetus on 2007 → 2030, vähennys 65 %. Tämä ei tarkoita, että sama tavoite olisi päätetty kaikissa kunnissa. Tarkista kunnan oma tavoite ja hyvitysten käsittely.
4. Valitse oletuksena automaattinen lineaarinen päästöbudjetti. Tarvittaessa anna sektorikohtaiset vähennysprosentit.
5. Kun asetukset on tarkistettu, rastita **Olen tarkistanut tavoiteasetukset kunnan ilmastobudjettia varten**. Tämä poistaa raportista tarkistamattomia asetuksia koskevan huomautuksen. Se ei itsessään ole poliittinen hyväksyntä.
6. Tarkista **Yhteenveto**, **Päästöbudjetti** ja **Raportti**.
7. Lataa aineistosta varmuuskopio.

Kuntavaihdossa jokaisen kunnan päästötiedot ja asetukset säilyvät erillisinä.

## Päästöaineiston vuosipäivitys

1. Avaa [Syken kuntien ja alueiden päästöpalvelu](https://paastot.hiilineutraalisuomi.fi/).
2. Valitse haluttu kunta ja laskentamenetelmä **Hinku-laskenta ilman hyvityksiä**. Lataa Excel. Toista tarvittaville kunnille.
3. Avaa työkalussa **Asetukset ja aineisto → Päivitä päästötiedot**.
4. Pudota yksi tai kaikki 13 `.xlsx`-tiedostoa alueelle tai valitse ne tiedostonvalinnasta samalla kertaa.
5. Tarkista esikatselusta kunnat, havaintovuodet, viimeisimmät vuodet, sektorit ja tarkentuneiden aiempien vuosien määrä.
6. Valitse **Päivitä aineisto**. Koko aikasarja korvautuu uusilla tiedoilla. Jos joukossa on virheellinen tiedosto, mitään ei päivitetä ennen korjausta. Vanhojen havaintovuosien poistaminen ei ole sallittua vahingossa.
7. Valitse **Lataa päivitetty data**. Saat `dataset.json`-tiedoston. Säilytä päivämäärällä nimetty varmuuskopio myös omalla tietokoneellasi.
8. Jos aineisto halutaan yhteiseen käyttöön, avaa GitHubissa repositorion **data**-kansio. Valitse **Add file → Upload files**, lisää ladattu tiedosto nimellä **dataset.json** ja tallenna **Commit changes**. Korvaa olemassa oleva samanniminen tiedosto.
9. Odota Pages-julkaisun valmistumista. Sivuston seuraava uusi käyttäjä saa päivitetyn aineiston.

Jos selain nimeää latauksen `dataset (1).json`, nimeä se takaisin `dataset.json` ennen GitHubiin lisäämistä. Aiemmin avannut käyttäjä saattaa käyttää omaa selaimeen tallennettua versiota. Työkalu huomauttaa uudesta julkaisusta; oman version voi varmuuskopioida ja korvata julkaistulla aineistolla asetuksissa.

**Uusi Excel ei muuta tallennettua tavoiteuraa.** Jos myös lähtövuoden luvut tarkentuvat, siitä kerrotaan esikatselussa. Tavoiteuran voi tietoisesti laskea uudelleen valinnalla **Päivitä tavoiteuran lähtötaso nykyisestä aineistosta**. Varmuuskopioi vanha versio ensin, jos sen säilyttäminen on tarpeen.

## Tallennus, varmuuskopiointi ja yhteistyö

Muutokset tallentuvat selaimen localStorageen. Ne eivät siirry GitHubiin tai toisten käyttäjien selaimiin automaattisesti. Yksityinen selaustila, selaintietojen poistaminen ja laitteen vaihtaminen voivat hävittää paikallisen tallenteen. Jos selaintallennus epäonnistuu, työkalun yläreuna ilmoittaa siitä.

**Lataa päivitetty data** sisältää kaikkien 13 kunnan päästötiedot ja asetukset sekä yhteensopivuuden vuoksi mahdolliset vanhan version toimenpidetiedot. **Palauta koko aineisto tiedostosta** tarkistaa saman JSON-tiedoston ja näyttää yhteenvedon ennen korvaamista. Palautus korvaa koko paikallisen aineiston, ei yhdistä kahden käyttäjän versioita.

Yhteistä aineistoa kannattaa ylläpitää yhdellä vastuuhenkilöllä. Älä muokkaa samaa aineistoa yhtä aikaa useassa välilehdessä. Avoin välilehti ilmoittaa, jos toinen välilehti muuttaa sen tallennetta. Julkaise vain yhteiseen aineistoon tarkoitettu sisältö; myös JSON-tiedoston sisältö on julkisesti luettavissa.

## Raportti PDF-tiedostoksi

1. Valitse kunta ja talousarviovuosi.
2. Avaa **Raportti**. Raportti sisältää päästöbudjetin diagrammin ja sektoritaulukon.
3. Paina **Tulosta / tallenna PDF**.
4. Valitse selaimen tulostuskohteeksi **Tallenna PDF-tiedostona**.
5. Käytä **A4 / vaaka** ja skaalausta **100 %**. Poista selaimen omat ylä- ja alatunnisteet. Salli taustagrafiikat, jotta diagrammin ja taulukoiden värit näkyvät.
6. Tarkista esikatselu ja tallenna tiedosto.

Raportissa on tavoite, päästökehitysdiagrammi, tunnusluvut, sektoritaulukko ja lähde-/menetelmätiedot.

## CSV-viennit ja Excel

- **Lataa päästöbudjetti CSV** vie valitun kunnan jokaisen vuoden ja sektorin tavoiteuran, toteuman, erotuksen ja lähtötiedot.
- **Lataa päästödata CSV** vie valitun kunnan kaikki aineiston vuodet, sektorit ja kokonaispäästöt.

CSV on UTF-8-muotoinen (BOM), erotin puolipiste ja desimaalierotin pilkku. Se avautuu suomalaisessa Excelissä. Jos Excel ei jaa sarakkeita, käytä **Tiedot → Tekstistä/CSV:stä**, valitse UTF-8 ja puolipiste. Tyhjät arvot säilyvät tyhjinä. Tekstien alussa olevat kaavamerkit suojataan, jotta Excel ei suorita tekstisisältöä kaavana. Varsinaista `.xlsx`-vientiä ei tarvita: selainpuolinen Excel-tuonti ja CSV-vienti on pidetty erillään.

## Laskennan periaate

Kokonaispäästöjen tavoitetaso:

```
tavoite = tallennettu lähtötaso × (1 − vähennysprosentti / 100)
budjetti(vuosi) = lähtötaso × [1 − (vähennysprosentti / 100)
                             × (vuosi − lähtövuosi) / (tavoitevuosi − lähtövuosi)]
```

Kaava koskee lähtövuoden ja tavoitevuoden välistä aikaa. Aikavälin ulkopuolelle ei keksitä tavoitearvoja. Toteuma ja tavoiteura ovat eri tietoja. Ero tavoiteuraan lasketaan aina **samalta vuodelta**, viimeisimmän toteuman ja vastaavan tavoitevuosiarvon väliltä. Positiivinen ero tarkoittaa ylitystä. Alle 0,05 kt:n poikkeama esitetään tavoiteuralla, koska lähteen tarkkuus on 0,1 kt. Väriä täydentää aina teksti.

Automaattisessa tilassa sama vähennysprosentti koskee kaikkia sektoreita. Sektorikohtaisessa tilassa käyttäjä voi muuttaa prosentit erikseen. Tällöin kokonaisbudjetti muodostuu sektoreista, ja työkalu näyttää eron yleiseen vähennystavoitteeseen: erisuuruisia prosentteja ei hiljaisesti pakoteta täsmäämään yleiseen tavoitteeseen.

**Lähteen pyöristykset:** Excelin kokonaispäästöjä ei korvata pyöristettyjen sektorien summalla. Tavoiteuran lähtötasossa säilytetään sekä lähteen kokonaispäästö että sektorit. Niiden erotus kulkee erillisenä pyöristyserona ja pienenee yleisellä vähennysprosentilla. Se ei ole uusi päästösektori. CSV-viennissä pyöristysero on omalla rivillään; taulukossa asiasta kerrotaan alaviitteessä. Välituloksia ei pyöristetä laskennassa.

**Kontiolahti:** mukana olevan Excelin kokonaispäästö on 94,2 kt vuonna 2007 ja 56,5 kt vuonna 2024. Näillä 65 % vähennys antaa 32,97 kt vuodelle 2030. Näyttötarkkuudella tavoite on 33,0 kt. Vuoden 2024 tavoiteura on 48,943… kt ja erotus +7,556… kt. Word-referenssin 94,0 kt ja sen 2024:stä alkava sektoripolku ovat eri lähtökohta. Työkalu noudattaa tehtävänannon lähtövuodesta alkavaa lineaarista laskentaa ja uusimpia annettuja Excel-lukuja.

**80 % ja hyvitykset:** tehtävän referenssin kokonaistavoitetta ei automaattisesti sovelleta hyvityksettömään aineistoon. Näissä tiedostoissa menetelmä on ”Hinku-laskenta ilman päästöhyvityksiä”. Päästöhyvitykset-rivi on nolla, eikä se todista, ettei kunnalla voisi olla hyvityksiä toisessa laskentatavassa. Tässä versiossa hyvitykset sisältävä valinta on siksi pois käytöstä. Muiden laskentamenetelmien Excelit hylätään selkeällä ohjeella. Työkalu ei arvioi hyvityksiä itse.

## Mukana oleva aineisto ja todellinen Excel-rakenne

Kunnat: Heinävesi, Ilomantsi, Joensuu, Juuka, Kitee, Kontiolahti, Lieksa, Liperi, Nurmes, Outokumpu, Polvijärvi, Rääkkylä ja Tohmajärvi.

Kaikki 13 tiedostoa tarkastettiin. Niissä on 21 havaintovuotta: 1990 sekä 2005–2024. Vuosien 1991–2004 puuttuvia lukuja ei täytetä. Päästötaulukko on kaikissa samassa muodossa. Lisäindikaattorien rivimäärät vaihtelevat kunnittain.

| Välilehti | Sisältö ja käyttö |
| --- | --- |
| yhteenveto | Vuodet 2007 ja 2024 sekä muutosprosentit. Ei käytetä aikasarjan lähteenä. |
| KHK-päästöt | Kunta A1, vuodet B1:V1; rivit 2–14 ovat 13 päästösektoria. Rivi 15 hyvitykset, 16 kokonaispäästöt, 17 päästöt/asukas, 18 asukasluku ja 20 menetelmä. |
| päästöt ja energia | Tarkempia energiankulutus- ja päästötietoja; ei summata pääsektorien päälle. |
| muut indikaattorit | Taustamuuttujia. Niitä ei tulkita päästöiksi. |

Tiedostoissa ei ole kaavoja tai yhdistettyjä soluja. Varsinaista taulukkoa edeltävää metadatalohkoa ei ole. Vuosiluvut ovat tekstisoluja ja päästöt Excelin numeerisia soluja. XML-tasolla numeroissa on desimaalipiste; käyttöliittymä käyttää pilkkua. Importteri hyväksyy myös numeerisen desimaalipilkun. Se etsii rivit nimillä ja vuosirivin kuntanimen perusteella eikä lukitse rivinumeroita. Tuetun menetelmän pitää löytyä tiedostosta.

`data/source-audit.json` sisältää kaikkien alkuperäisten Excelien tarkisteet, välilehtien mitat, kaavojen ja yhdistettyjen solujen määrät sekä pyöristyserot. Se on alkuperäisaineiston tarkastusraportti eikä muutu selaimen vuosipäivityksessä.

Lähde on [Suomen ympäristökeskuksen kuntien päästöpalvelu](https://paastot.hiilineutraalisuomi.fi/), käyttäjän toimittamat ALas-Excelit. Latauspäivä 15.9.2026 on tiedostonimestä; sitä ei väitetä päästöaineiston julkaisupäiväksi. Julkaisupäivää ei ilmoiteta Exceleissä. Hinku-menetelmä on kuntien päästöseurantaa varten rajattu laskentatapa, joten ”ilman hyvityksiä” ei tarkoita ”kaikki alueelliset päästöt”.

## Tiedostot ja tietomalli

| Tiedosto / kansio | Tarkoitus |
| --- | --- |
| index.html | Sivuston aloitussivu |
| assets/styles.css | Ulkoasu, saavutettavat kohdistustilat, mobiili- ja tulostustyylit |
| assets/pohjois-karjala.jpg | Käyttäjän toimittama maisemakuva |
| src/app.js | Käyttöliittymä, paikallinen tallennus, raportti, viennit |
| src/core.js | Alkuperäinen kuntalaskenta ja aineistojen validointi, ennallaan |
| src/additions.js | Maakunnan summat, liikennevalorajat ja sektorivärit |
| src/exports.js | Excel-työkirja ja korkean resoluution PNG-vienti |
| src/importer.js | Selainpuolinen ALas-Excelin lukija ja päivitysvertailu |
| vendor/jszip.min.js | Paikallinen ZIP-lukija XLSX-tiedostojen avaamiseen |
| vendor/JSZip-LICENSE.md | ZIP-kirjaston lisenssi |
| data/dataset.json | Koko julkaistava aineisto yhdessä tiedostossa |
| data/source-audit.json | Alkuperäisten Excelien tarkastus |
| scripts/serve.mjs | Vapaaehtoinen paikallinen esikatselupalvelin |
| scripts/convert_sources.py | Alkuperäisen aineistomuunnoksen toistaminen ylläpidossa |
| tests/core.test.js | Laskennan ja validointien automaattitestit |
| TESTAUS.md | Testauksen tulokset ja rajaukset |

`dataset.json` sisältää:

- `schemaVersion`: 1, tietomallin versionumero.
- `publishedRevision`: julkaistun aineiston tunniste; tiedostovienti muodostaa uuden tunnisteen.
- `municipalities`: kuntien nimet, tunnisteet, aidot sektorit, vuodet, havainnot ja metadata.
- `observations[vuosi]`: sektoripäästöt, lähteen kokonaispäästö, hyvitysrivi, päästöt/asukas ja asukasluku.
- `configs[kuntatunniste]`: tavoiteasetukset ja erikseen talletettu `baseline`. Tyhjä asetuskokoelma alustetaan ensimmäisellä käyttökerralla.
- `actions`: vanhan version yhteensopivuuskenttä. Mukana olevassa aineistossa tyhjä; käyttöliittymä ei käytä sitä.

Yksi tiedosto tekee vuosipäivityksestä yksinkertaisen ja ehkäisee tilanteen, jossa päästöaineisto ja tavoiteasetukset tulevat eri versioista. Alkuperäisiin Excel-tiedostoihin ei tehdä muutoksia. Niitä tai Word-referenssiä ei tarvitse julkaista sivuston mukana.

## Paikallinen käynnistys

Tuotantokäyttö GitHub Pagesissa ei tarvitse Nodea tai Pythonia. Jos haluat kokeilla tiedostoja omalla tietokoneellasi ennen julkaisua, käytä jompaakumpaa:

**Python asennettuna:** avaa komentorivi ilmastobudjetti-kansioon ja suorita:

```sh
python -m http.server 8000
```

Avaa selaimessa `http://localhost:8000`. Windowsissa vaihtoehto on `py -m http.server 8000`.

**Node asennettuna:**

```sh
npm run dev
```

Avaa selaimessa `http://localhost:4173`. Npm-pakettien asennusta ei tarvita. Lopeta paikallinen palvelin Ctrl+C:llä. Pelkkä index.html:n kaksoisnapsautus ei toimi, koska selain rajoittaa paikallisia JSON- ja moduulitiedostoja.

Automaattitestit:

```sh
npm test
```

Alkuperäisen muunnoksen toistaminen kehittäjälle (Python ja openpyxl):

```sh
python scripts/convert_sources.py POLKU_ALKUPERAISIIN_EXCELEIHIN
```

Tämä komento on alkuperäisen toimitusaineiston muuntamiseen. Se korvaa dataset.json:n tyhjillä toimenpiteillä ja oletusasetuksilla, joten normaali vuosipäivitys tehdään selaimessa, ei tällä komennolla.

## Ulkoasu ja rajaukset

Pääväri on tehtävänannossa annettu `#E4003A`; pohja on valkoinen ja teksti tumma. Ubuntu haetaan Google Fontsista, jos verkkoyhteys ja organisaation asetukset sallivat sen. Varakirjasin on Arial. Maksullisia fonttitiedostoja ei sisälly toimitukseen. Sovelluksen toiminnallisuus ja Excel-lukija eivät vaadi ulkoisia CDN-tiedostoja.

Erillistä brändiohjetiedostoa tai virallista logoa ei ollut liitteissä. Lisävärien sävyt ja PK-tekstimerkki ovat tämän käyttöliittymän ratkaisuja, eivät väite virallisen brändiohjeen tarkoista sävyistä tai tunnuksesta. Maisemakuva on käyttäjän toimittama. Muut neljä liitekuvaa tarkastettiin; niitä ei tarvita tämän datatyökalun toimintaan.

Työkalu on paikallisesti tallentava yhden käyttäjän työväline. Siinä ei ole käyttäjätunnuksia, käyttöoikeushallintaa tai samanaikaisten muokkausten yhdistämistä. Tiedostotuonti tukee tarkastettua ALas-rakennetta ja 13 tunnettua sektoria; jos Syke muuttaa tiedostorakennetta, parseri voidaan päivittää ilman käyttöliittymän uudelleenrakentamista.
