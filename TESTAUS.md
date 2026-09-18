# Päivityksen tarkistus 18.9.2026

- `npm test`: 14/14 testiä hyväksytty. Alkuperäiset 9 testiä sekä 5 uutta testiä maakuntasummille, eri tavoitejaksoille, puuttuville vuosille, liikennevalorajoille ja sektoriväreille.
- src/core.js, src/importer.js, data/dataset.json ja data/source-audit.json ovat tavutasolla ennallaan verrattuna edelliseen toimitukseen.
- Kevyt renderöintitarkistus DOM-korvikkeella: 56 näkymää (maakunta ja 13 kuntaa, neljä sivua kullekin) ja 14 sektorin tarkasteluikkunaa muodostuivat ilman puuttuvia viittauksia tai NaN/undefined-arvoja.
- Maakunnan ja Kontiolahden Excel-viennit avattiin openpyxlillä. Solujen arvot vastaavat vientiaineistoa, ja luvut ovat numeerisia soluja. Kummassakin tiedostossa on päästötaulukko ja lähdevälilehti.
- JavaScriptin syntaksitarkistukset hyväksytty.

Täyttä visuaalista selaintestausta ei voitu suorittaa: ympäristössä ei ollut selainta ja Chromiumin lataus aikakatkaistiin. PNG-latausta ja PDF:n sivutusta ei näin ollen ole varmennettu oikeassa selaimessa. PNG-viennin toteutettu resoluutio on 3240 × 1800 pikseliä. PDF käyttää selaimen Tulosta / Tallenna PDF -toimintoa ja nykyisiä tulostustyylejä.

GitHubiin ei tehty julkaisua. Valmis staattinen paketti ei tarvitse uusia npm-riippuvuuksia tai build-vaihetta.
