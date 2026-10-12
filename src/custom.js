import {METHOD,clone,captureBaseline,validateConfig,validateDataset,validateMunicipality} from './core.js';
export const OTHER_ID='muu-kunta';
export function validateData(d,canonical){
 validateDataset(d,canonical);
 if(d.otherMunicipality!=null){
  const m=d.otherMunicipality;
  if(m.id!==OTHER_ID||typeof m.name!=='string'||!m.name.trim()||m.name.length>120||m.sectors.some(s=>!canonical[0].sectors.includes(s)))throw Error('Oman kunnan nimi tai sektorit ovat virheelliset.');
  validateMunicipality(m,[OTHER_ID]);validateConfig(d.otherConfig);
  if(m.sectors.some(s=>!Number.isFinite(d.otherConfig.baseline.sectors[s])))throw Error('Oman kunnan lähtötason sektoreita puuttuu.');
 }else if(d.otherConfig!=null)throw Error('Oman kunnan päästötiedot puuttuvat.');
}
export function makeCustom({name,source,baseYear,latestYear,targetYear,reduction,base,latest,sectors}){
 if(!name.trim()||name.trim().length>120||!source.trim())throw Error('Anna kunnan nimi ja tietojen lähde.');
 if(baseYear>=latestYear)throw Error('Viimeisimmän toteumavuoden pitää olla lähtövuotta myöhempi.');
 const m={id:OTHER_ID,name:name.trim(),sectors:[...sectors],years:[baseYear,latestYear],observations:{[baseYear]:{total:base.total,sectors:base.sectors,credits:0},[latestYear]:{total:latest.total,sectors:latest.sectors,credits:0}},metadata:{source:source.trim(),method:METHOD,unit:'kt CO₂e',fileName:'Käyttäjän syöttämät lähtötiedot',downloadDate:null,publicationDate:null,importedAt:new Date().toISOString().slice(0,10)}};
 validateMunicipality(m,[OTHER_ID]);
 const c={baseYear,targetYear,reduction,mode:'auto',sectorTargets:{},basis:'direct',confirmed:false,baseline:captureBaseline(m,baseYear)};
 validateConfig(c);return {municipality:m,config:c};
}
// Store only the replaced emissions records. Later goal edits and other municipalities survive undo.
export function importSnapshot(data,ids){return {kind:'import',label:'Päästöaineiston tuonti: '+ids.map(id=>data.municipalities.find(m=>m.id===id).name).join(', '),municipalities:clone(data.municipalities.filter(m=>ids.includes(m.id)))};}
export function customSnapshot(data){return {kind:'custom',label:'Oman kunnan päästötietojen lisäys',municipality:clone(data.otherMunicipality??null),config:clone(data.otherConfig??null)};}
export function undoAddition(data,entry){
 if(entry.kind==='import')for(const m of entry.municipalities){const i=data.municipalities.findIndex(x=>x.id===m.id);if(i<0)throw Error('Kumottavaa kuntaa ei löydy.');data.municipalities[i]=clone(m);}
 else if(entry.kind==='custom'){
  const name=data.otherMunicipality?.name;
  data.otherMunicipality=clone(entry.municipality);
  if(data.otherMunicipality&&name)data.otherMunicipality.name=name;
  if(!entry.municipality)data.otherConfig=null;
  // Existing target settings survive a subsequent data import and its undo.
 }else throw Error('Kumottavaa lisäystä ei tunnistettu.');
}
