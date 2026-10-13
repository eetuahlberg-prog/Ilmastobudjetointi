# Sopeutumisen työkalut

**Sopeutumisen työkalut** on Pohjois-Karjalan maakuntaliiton Ilmastovisio-hankkeessa toteutettu verkkosivusto kuntien ja yritysten ilmastonmuutokseen sopeutumisen tueksi. Yhteiseltä aloitussivulta pääsee kahteen itsenäiseen arviointi- ja suunnittelutyökaluun.

> Työkalut auttavat kuntia ja yrityksiä tunnistamaan omaan toimintaansa vaikuttavia ilmastoriskejä ja löytämään käytännön toimenpiteitä niihin varautumiseksi.

## Sisältö

| Työkalu | Käyttötarkoitus | Osoite sivustolla |
| --- | --- | --- |
| **Kunnille** | Kunnan sopeutumistarpeiden kartoittaminen ja tilanteeseen sopivien toimenpiteiden kokoaminen suunnitelmaksi. Toimenpidepohja perustuu Pohjois-Karjalan ilmastonmuutokseen sopeutumisen tiekarttaan ja seutukuntaliitteeseen (2025). | [`/kunta/`](kunta/) |
| **Yrityksille** | Yrityksen sää- ja ilmastoriippuvuuksien, liiketoimintaan vaikuttavien riskien ja nykyisen varautumisen arviointi sekä ensitoimien kokoaminen toimintalistaksi. | [`/yritys/`](yritys/) |

Kuntien työkalusta voi viedä suunnitelman teksti- tai CSV-tiedostona ja tulostaa sen PDF:ksi. Yritystyökalusta voi tallentaa toimintalistan Excel-, teksti- tai PDF-muodossa. Molemmissa työkaluissa on esimerkkitilanne kokeilua varten. Yritystyökalun versio on **1.2**, ja sen toimialavalinnan ehdotukset voidaan päivittää vaihtamalla toimialaa tai palauttamalla oletusehdotukset.

## Käyttö ja tietojen käsittely

Sivusto toimii selaimessa ilman kirjautumista. Käyttäjän vastauksia ei lähetetä palvelimelle tai tallenneta tietokantaan. Arvion tiedot säilyvät vain kyseisen työkalun avoimessa selainistunnossa: sivun sulkeminen, päivittäminen tai paluu aloitussivulle hävittää keskeneräiset tiedot. Suunnitelma tai toimintalista kannattaa siis tallentaa ennen poistumista.

Työkalut tukevat alustavaa arviointia ja toimenpiteiden valmistelua. Ne eivät korvaa yksityiskohtaista, kohdekohtaista ilmastoriskien selvitystä tai asiantuntija-arviota.

## Tekninen rakenne

Sivusto on toteutettu tavallisilla HTML-, CSS- ja JavaScript-tiedostoilla. Erillistä sovelluspalvelinta, tietokantaa, kirjautumispalvelua tai ohjelmiston käännösvaihetta ei tarvita. Molemmat työkalut toimivat saman verkkotunnuksen alihakemistoissa ja käyttävät omia ohjelma- ja aineistotiedostojaan.

```text
index.html                    Yhteinen aloitussivu
style.css                     Aloitussivun ulkoasu
assets/                       Aloitussivun kuvat ja logot
kunta/                        Kuntien työkalu (HTML, CSS, JS, aineisto)
yritys/                       Yritysten työkalu (HTML, CSS, JS, aineisto, Excel-vienti)
shared/tool-header.css         Molempien työkalujen yhteinen ylätunniste ja huomautustyylit
shared/typography.css          Molempien työkalujen yhteiset fonttikoot
yritys/theme.css               Yritysten vihreä väriteema
yritys/research/              Yritystyökalun lähdeaineisto ja testit
GITHUB-JULKAISUOHJE.md        GitHub Pages -julkaisuohje
TESTAUS.txt                   Julkaisun jälkeinen tarkistuslista
.nojekyll                     GitHub Pages -asetustiedosto
```

Aloitussivun ulkoasussa käytetään Pohjois-Karjalan, Ilmastovision ja Euroopan unionin tunnuksia sekä metsätaustakuvaa. Työkalujen yläpalkit jakavat saman HTML-rakenteen ja `shared/tool-header.css`-tyylitiedoston. Sivuston käyttöliittymä on suomenkielinen.

## Julkaisu ja ylläpito

Sivusto julkaistaan **yhtenä GitHub Pages -sivustona**. Julkaisun vaiheet on kuvattu tiedostossa **[GITHUB-JULKAISUOHJE.md](GITHUB-JULKAISUOHJE.md)**. Julkaisun toimivuuden tarkistamiseen on erillinen **[TESTAUS.txt](TESTAUS.txt)**.

Aloitussivun sisältöä muokataan juurihakemiston `index.html`- ja `style.css`-tiedostoissa. Kuntien ja yritysten työkaluja päivitetään niiden omissa `kunta/`- ja `yritys/`-hakemistoissa. Tiedostonimet ovat osin samoja, mutta työkalujen ohjelmakoodi ja aineistot eivät ole keskenään vaihdettavia. Päivityksissä on säilytettävä myös työkalujen paluulinkit yhteiselle aloitussivulle. Yhteisen ylätunnisteen tyyliä muokataan `shared/tool-header.css`-tiedostossa.

Yritystyökalun arviointimenetelmää, tietolähteitä ja rajauksia käsitellään tarkemmin dokumentissa **[Lähteet ja rakenne](yritys/research/LAHTEET-JA-RAKENNE.md)**.

## Toteutus ja rahoitus

Sivusto on toteutettu Pohjois-Karjalan maakuntaliiton **Ilmastovisio – Uutta kasvua ilmastotyöllä Pohjois-Karjalaan** -hankkeessa. Hanketta rahoitetaan Euroopan unionin oikeudenmukaisen siirtymän rahastosta (JTF).

## Vastuunrajaus

Työkalu on tarkoitettu alustavan arvioinnin ja suunnittelun tueksi. Sisältö ja toimenpide-ehdotukset voivat sisältää virheitä tai puutteita, eivätkä ne korvaa asiantuntija-arviota. Käyttäjän tulee tarkistaa tietojen ajantasaisuus ja ehdotusten soveltuvuus ennen päätöksentekoa. Pohjois-Karjalan maakuntaliitto ei vastaa työkalun käyttöön perustuvien päätösten seurauksista lain sallimissa rajoissa.

## Ulkoasu ja typografia

Kaikilla kolmella sivulla on ensisijaisena fonttina **Corbel**. Sitä käytetään
käyttäjän laitteelta; Corbel-fonttitiedostoja ei jaella sivuston mukana. Jos
fonttia ei ole asennettu, selain käyttää Segoe UI-, Arial- tai muuta
järjestelmäfonttia. Kuntien ja yritysten työkalut käyttävät samaa
`shared/typography.css`-tiedostossa määriteltyä typografista asteikkoa
(leipäteksti, pääotsikot, väliotsikot, kysymystekstit ja valikot).

- Kuntien työkalun pääväri: Pohjois-Karjalan punainen `#E4003A`.
- Yritysten työkalun pääväri: vihreä `#ADB150`, RGB 173, 177, 80;
  annettu painovärimääritys CMYK 40/20/80/0 ja PMS 618 C. Näyttökäytössä
  käytetään nimenomaan annettua RGB/HEX-arvoa.
- Yritystyökalun pienissä teksteissä ja aktiivisissa valinnoissa käytetään
  tummempaa vihreää, jotta tekstin ja käyttöliittymäelementtien kontrasti
  säilyy. Yläpalkkien mitat ovat samat molemmissa työkaluissa.

Yhteiset fonttikoot määritellään tiedostossa `shared/typography.css` ja
yläpalkkien rakenne `shared/tool-header.css`-tiedostossa. Yritystyökalun
väriteema on erillisessä `yritys/theme.css`-tiedostossa. Näihin tiedostoihin
tehdyt muutokset heijastuvat työkaluun sivuston uudelleenjulkaisun jälkeen.
