import {METHOD, validateMunicipality} from './core.js';
const elements=(node,name)=>Array.from(node.getElementsByTagNameNS('*',name));
function xml(text) {
  const doc=new DOMParser().parseFromString(text,'application/xml');
  if(doc.getElementsByTagName('parsererror').length)throw Error('Excelin sisäinen rakenne on virheellinen.');
  return doc;
}
async function part(zip,path,optional=false) {
  const f=zip.file(path);if(!f){if(optional)return null;throw Error('Excelistä puuttuu tarvittava taulukko.');}
  const text=await f.async('string');if(text.length>15000000)throw Error('Excelin taulukko on liian suuri.');return xml(text);
}
function column(ref) {let n=0;for(const c of ref.match(/^[A-Z]+/)[0]) n=n*26+c.charCodeAt(0)-64;return n-1;}
export async function parseExcel(file,canonical) {
  if(!/\.xlsx$/i.test(file.name))throw Error('Valitse Excel-tiedosto (.xlsx).');
  if(file.size>10000000)throw Error('Tiedosto on liian suuri (enintään 10 Mt).');
  if(!window.JSZip)throw Error('Excelin lukija puuttuu. Tarkista sovelluksen tiedostot.');
  let zip;try{zip=await window.JSZip.loadAsync(await file.arrayBuffer());}catch{throw Error('Tiedostoa ei voitu avata Excelinä. Se voi olla vioittunut tai salattu.');}
  const wb=await part(zip,'xl/workbook.xml');
  const rels=await part(zip,'xl/_rels/workbook.xml.rels');
  const shared=await part(zip,'xl/sharedStrings.xml',true);
  const strings=shared?elements(shared,'si').map(si=>elements(si,'t').map(t=>t.textContent).join('')):[];
  const sheet=elements(wb,'sheet').find(s=>s.getAttribute('name').trim().toLocaleLowerCase('fi')==='khk-päästöt');
  if(!sheet)throw Error('KHK-päästöt-välilehteä ei löytynyt. Lataa tiedosto Syken päästöpalvelusta.');
  const rel=elements(rels,'Relationship').find(r=>r.getAttribute('Id')===sheet.getAttribute('r:id'));
  if(!rel||rel.getAttribute('TargetMode')==='External')throw Error('Excelin taulukkoviite on virheellinen.');
  const target=rel.getAttribute('Target');
  const path=target.startsWith('/')?target.slice(1):'xl/'+target.replace(/^\.\//,'');
  const doc=await part(zip,path);
  const rows=elements(doc,'row').map(row=>{
    const values=[];
    for(const c of elements(row,'c')){
      if(elements(c,'f').length)throw Error('Päästötaulukossa on laskentakaavoja. Käytä Syken alkuperäistä arvoaineistoa.');
      const t=c.getAttribute('t'),v=elements(c,'v')[0]?.textContent;
      const value=t==='s'?strings[Number(v)]:t==='inlineStr'?elements(c,'t').map(t=>t.textContent).join(''):t==='e'?'VIRHE':v??'';
      values[column(c.getAttribute('r'))]=value;
    }return values;
  });
  const header=rows.find(r=>canonical.some(m=>m.name.toLocaleLowerCase('fi')===String(r[0]??'').trim().toLocaleLowerCase('fi'))&&r.slice(1).some(x=>/^\d{4}$/.test(String(x))));
  if(!header)throw Error('Pohjois-Karjalan kuntaa ja vuosiriviä ei tunnistettu.');
  const ref=canonical.find(m=>m.name.toLocaleLowerCase('fi')===header[0].trim().toLocaleLowerCase('fi'));
  const cols=header.map((v,i)=>({year:Number(v),col:i})).filter(x=>x.col>0&&header[x.col]!==''&&header[x.col]!=null);
  const methodRows=rows.map(r=>String(r[0]??'').trim()).filter(t=>t.startsWith('Hinku-laskenta'));
  if(methodRows.length!==1||methodRows[0]!==METHOD)throw Error('Valitse lähdepalvelussa ”Hinku-laskenta ilman hyvityksiä”. Muiden menetelmien aineistoa ei yhdistetä tähän aikasarjaan.');
  const labels=new Map();
  for(const r of rows){const label=String(r[0]??'').trim();if(!label)continue;if(labels.has(label))throw Error(`Rivi ”${label}” esiintyy kahdesti.`);labels.set(label,r);}
  const number=(label,col,required=true)=>{
    const v=labels.get(label)?.[col];
    if(v==null||String(v).trim()===''){if(!required)return null;throw Error(`Riviltä ”${label}” puuttuu päästöluku.`);}
    const n=Number(String(v).replace(/[\s\u00a0]/g,'').replace(',','.'));
    if(!Number.isFinite(n))throw Error(`Rivillä ”${label}” on virheellinen numero.`);return n;
  };
  const observations={};
  for(const {year,col} of cols){
    observations[year]={sectors:Object.fromEntries(ref.sectors.map(s=>[s,number(s,col)])),total:number('kokonaispäästöt, ktCO2e',col),credits:number('Päästöhyvitykset',col),perCapita:number('per asukas, tCO2e',col,false),population:number('asukasluku',col,false)};
  }
  const date=file.name.match(/(\d{4}-\d{2}-\d{2})/);
  const m={id:ref.id,name:ref.name,sectors:[...ref.sectors],years:cols.map(x=>x.year),observations,metadata:{source:ref.metadata.source,url:ref.metadata.url,method:METHOD,unit:'kt CO₂e',fileName:file.name,downloadDate:date?.[1]??null,publicationDate:null,importedAt:new Date().toISOString().slice(0,10)}};
  validateMunicipality(m,canonical.map(m=>m.id));return m;
}
export function compareImport(old,next,c) {
  const overlap=next.years.filter(y=>old.observations[y]);
  const changed=overlap.filter(y=>JSON.stringify(old.observations[y])!==JSON.stringify(next.observations[y]));
  const missing=old.years.filter(y=>!next.years.includes(y));
  const warnings=[];
  if(missing.length)warnings.push(`Uudesta aineistosta puuttuvat aiemmat vuodet: ${missing.join(', ')}. Tuontia ei hyväksytä.`);
  if(c&&JSON.stringify(c.baseline.sectors)!==JSON.stringify(next.observations[c.baseYear]?.sectors))warnings.push('Lähtövuoden luvut ovat tarkentuneet. Tallennettu tavoiteura säilytetään. Sen voi päivittää erikseen asetuksissa.');
  return {changed,missing,warnings};
}
