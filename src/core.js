export const METHOD = 'Hinku-laskenta ilman päästöhyvityksiä';
export const STATUSES = ['Suunnitteilla', 'Käynnissä', 'Toteutettu', 'Siirtynyt', 'Peruttu'];
export const THEMES = ['Energia ja rakennukset', 'Liikenne ja liikkuminen', 'Kiertotalous ja kestävä kulutus', 'Maankäyttö ja luonto', 'Ilmastojohtaminen', 'Ilmastonmuutokseen sopeutuminen'];
export const finite = v => typeof v === 'number' && Number.isFinite(v);
export const clone = x => JSON.parse(JSON.stringify(x));
export function defaultConfig(m) {
  const baseYear = m.years.includes(2007) ? 2007 : m.years[0];
  return {baseYear, targetYear: 2030, reduction: 65, mode: 'auto', sectorTargets: {}, basis: 'direct', confirmed: false, baseline: captureBaseline(m, baseYear)};
}
export function captureBaseline(m, year) {
  if (!m.observations[year]) throw Error('Lähtövuoden päästötietoja ei ole.');
  return {...clone(m.observations[year]), year: Number(year), sourceFile: m.metadata.fileName, capturedAt: new Date().toISOString().slice(0,10)};
}
export function validateConfig(c) {
  if (!Number.isInteger(c.baseYear) || !Number.isInteger(c.targetYear) || c.targetYear <= c.baseYear || c.targetYear > 2100) throw Error('Tavoitevuoden pitää olla lähtövuotta myöhempi ja enintään 2100.');
  if (!finite(c.reduction) || c.reduction < 0 || c.reduction > 100) throw Error('Vähennystavoitteen pitää olla 0–100 %.');
  if (!['auto','sectors'].includes(c.mode) || c.basis !== 'direct') throw Error('Laskenta-asetusta ei tueta.');
  if (!c.baseline || c.baseline.year !== c.baseYear || !finite(c.baseline.total) || c.baseline.total < 0) throw Error('Tavoiteuran lähtötaso puuttuu tai on virheellinen.');
  if (!c.baseline.sectors || !Object.keys(c.baseline.sectors).length || Object.values(c.baseline.sectors).some(v => !finite(v) || v < 0)) throw Error('Lähtövuoden sektorit ovat virheelliset.');
  if (!c.sectorTargets || Object.values(c.sectorTargets).some(v=>!finite(v)||v<0||v>100)) throw Error('Sektorin tavoitteen pitää olla 0–100 %.');
}
export function linear(base, reduction, from, to, year) {
  if (year < from || year > to) return null;
  return base * (1 - reduction / 100 * (year - from) / (to - from));
}
export function sectorBudget(c, sector, year) {
  const base = c.baseline.sectors[sector];
  if (!finite(base)) return null;
  return linear(base, c.mode === 'sectors' ? (c.sectorTargets[sector] ?? c.reduction) : c.reduction, c.baseYear, c.targetYear, year);
}
export function roundingBudget(c, year) {
  return linear(c.baseline.total - Object.values(c.baseline.sectors).reduce((a,b)=>a+b,0), c.reduction, c.baseYear, c.targetYear, year);
}
export function budget(c, year) {
  if (year < c.baseYear || year > c.targetYear) return null;
  if (c.mode === 'auto') return linear(c.baseline.total, c.reduction, c.baseYear, c.targetYear, year);
  return Object.keys(c.baseline.sectors).reduce((sum,s)=>sum+sectorBudget(c,s,year),0)+roundingBudget(c,year);
}
export const change = (latest, base) => !finite(latest)||!finite(base)||base===0 ? null : (latest/base-1)*100;
export const difference = (value, target) => finite(value)&&finite(target) ? value-target : null;
export const stateLabel = diff => !finite(diff) ? 'Vertailua ei saatavilla' : Math.abs(diff) < 0.05 ? 'Tavoiteuralla' : diff > 0 ? 'Tavoiteuran yläpuolella' : 'Tavoiteuran alapuolella';
export function sumKnown(rows, field) {
  const known = rows.filter(r=>finite(r[field]));
  return {value: known.length ? known.reduce((s,r)=>s+r[field],0) : null, known: known.length, missing: rows.length-known.length};
}
export function validateMunicipality(m, allowed) {
  if (!m || !allowed.includes(m.id) || typeof m.name !== 'string') throw Error('Kuntaa ei tunnistettu.');
  if (m.metadata?.method !== METHOD || m.metadata?.unit !== 'kt CO₂e') throw Error('Tarvitaan Hinku-laskenta ilman päästöhyvityksiä, yksikkönä kt CO₂e.');
  if (!Array.isArray(m.years) || m.years.length<2 || new Set(m.years).size!==m.years.length || m.years.some((y,i)=>!Number.isInteger(y)||y<1990||y>new Date().getFullYear()||(i>0&&y<=m.years[i-1]))) throw Error('Vuosissa on puuttuvia, päällekkäisiä tai virheellisiä tietoja.');
  if (!Array.isArray(m.sectors)||m.sectors.length!==13||new Set(m.sectors).size!==13||m.sectors.some(s=>typeof s!=='string'||!s.trim()||s==='__proto__')) throw Error('Aineistosta pitää löytyä 13 yksilöllistä päästösektoria.');
  for (const y of m.years) {
    const o=m.observations?.[y];
    if (!o || !finite(o.total)||o.total<0||!finite(o.credits)||m.sectors.some(s=>!finite(o.sectors?.[s])||o.sectors[s]<0)) throw Error(`Vuoden ${y} päästötiedoissa on puuttuvia tai virheellisiä lukuja.`);
    if (o.credits !== 0) throw Error('Hyvityksettömässä aineistossa on päästöhyvityksiä. Tarkista laskentavalinta lähdepalvelussa.');
    if (Math.abs(o.total - m.sectors.reduce((sum,s)=>sum+o.sectors[s],0)) > 0.75) throw Error(`Vuoden ${y} sektorit eivät täsmää kokonaispäästöihin (ero yli pyöristystarkkuuden).`);
  }
}
export function validateDataset(d, canonical) {
  if (d?.schemaVersion !== 1 || !Array.isArray(d.municipalities)||d.municipalities.length!==canonical.length||!Array.isArray(d.actions)||!d.configs||typeof d.configs!=='object') throw Error('Tiedosto ei ole tämän työkalun täydellinen varmuuskopio.');
  const allowed=canonical.map(m=>m.id);
  if (new Set(d.municipalities.map(m=>m.id)).size!==allowed.length) throw Error('Kunta esiintyy kahdesti.');
  for (const m of d.municipalities) {
    validateMunicipality(m,allowed);
    const ref=canonical.find(x=>x.id===m.id);
    if(m.name!==ref.name||m.sectors.some(s=>!ref.sectors.includes(s))) throw Error('Kunnan nimi tai sektorit eivät vastaa tuettua aineistoa.');
  }
  for(const [id,c] of Object.entries(d.configs)) {
    if(!allowed.includes(id))throw Error('Tuntematon kunta asetuksissa.');
    validateConfig(c);
    if(canonical.find(m=>m.id===id).sectors.some(s=>!finite(c.baseline.sectors[s])))throw Error('Tavoiteuran sektoreita puuttuu.');
  }
  const ids=new Set();
  for (const a of d.actions) {
    if (!allowed.includes(a.municipalityId)||typeof a.id!=='string'||ids.has(a.id)) throw Error('Toimenpiteen tunniste tai kunta on virheellinen.');
    ids.add(a.id); validateAction(a);
  }
}
export function validateAction(a) {
  for (const key of ['theme','goal','action','owner','impact']) if(typeof a[key]!=='string'||!a[key].trim()||a[key].length>10000) throw Error('Täytä teema, tavoite, toimenpide, vastuualue ja vaikutus.');
  if (!Number.isInteger(a.year)||a.year<2000||a.year>2100||!STATUSES.includes(a.status)) throw Error('Tarkista talousarviovuosi ja tila.');
  for(const key of ['investment','operating','savings','emissionImpact']) if(a[key]!==null&&(!finite(a[key])||a[key]<0)) throw Error('Rahamäärien ja vähentävän päästövaikutuksen pitää olla vähintään nolla tai tyhjiä.');
  for(const key of ['schedule','notes']) if(typeof a[key]!=='string'||a[key].length>10000)throw Error('Lisätieto on virheellinen.');
}
export function csv(rows) {
  return '\uFEFF'+rows.map(row=>row.map(value=>{
    let s=value==null?'':typeof value==='number'?String(value).replace('.',','):String(value);
    if(typeof value==='string'&&/^[\s]*[=+@-]/.test(s))s="'"+s;
    return '"'+s.replaceAll('"','""')+'"';
  }).join(';')).join('\r\n');
}
