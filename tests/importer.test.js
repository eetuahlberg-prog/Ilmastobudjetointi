import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {municipalityFromRows} from '../src/importer.js';
import {acceptCustomExcel,undoAddition,validateData} from '../src/custom.js';
import {METHOD,defaultConfig,clone} from '../src/core.js';
import {regionView} from '../src/additions.js';
const fixture=()=>{const d=JSON.parse(fs.readFileSync(new URL('../data/dataset.json',import.meta.url)));for(const m of d.municipalities)d.configs[m.id]=defaultConfig(m);return d;};
const sectors=fixture().municipalities[0].sectors;
function rows(name='Tampere'){return [[name,'2007','2024'],...sectors.map(s=>[s,'100','80']),['Päästöhyvitykset','0','0'],['kokonaispäästöt, ktCO2e','1300','1040'],['per asukas, tCO2e','10','8'],['asukasluku','130000','130000'],[METHOD]];}
test('ALas rows accept arbitrary Finnish municipality names only in Muu kunta mode',()=>{
 const d=fixture();for(const name of ['Tampere','Lahti','Hämeenlinna','Pedersören kunta']){
 const m=municipalityFromRows(rows(name),'ALas-2026-10-13.xlsx',d.municipalities,{allowOther:true});assert.equal(m.id,'muu-kunta');assert.equal(m.name,name);assert.equal(m.metadata.importedMunicipalityName,name);assert.equal(m.metadata.downloadDate,'2026-10-13');assert.deepEqual(m.years,[2007,2024]);assert.equal(m.observations[2024].total,1040);assert.equal(m.observations[2007].sectors.Tieliikenne,100);assert.throws(()=>municipalityFromRows(rows(name),'a.xlsx',d.municipalities));
 }const known=d.municipalities[0];assert.equal(municipalityFromRows(rows(known.name),'a.xlsx',d.municipalities).id,known.id);
});
test('Other Excel rows reject wrong method, missing sectors, blanks, credits, inconsistent totals and years',()=>{
 const d=fixture();for(const change of [r=>r.at(-1)[0]='Hinku-laskenta',r=>r.splice(1,1),r=>r[1][1]='',r=>r.find(x=>x[0]==='Päästöhyvitykset')[1]='5',r=>r.find(x=>x[0]==='kokonaispäästöt, ktCO2e')[1]='99',r=>r[0][2]='2007',r=>r.push(['Toinen kunta','2007','2024'])]){
 const r=rows();change(r);assert.throws(()=>municipalityFromRows(r,'a.xlsx',d.municipalities,{allowOther:true}));
 }const r=rows();r[1][1]='100,0';assert.equal(municipalityFromRows(r,'a.xlsx',d.municipalities,{allowOther:true}).observations[2007].sectors[sectors[0]],100);
});
test('Excel replacement undo restores previous municipality and goals, while same-town update preserves later goal edits',()=>{
 let d=fixture();const before=regionView(d),m=municipalityFromRows(rows(),'a.xlsx',d.municipalities,{allowOther:true}),c=defaultConfig(m);let result=acceptCustomExcel(d,m,c,d.municipalities);d=result.data;validateData(d,d.municipalities);assert.deepEqual(regionView(d),before);undoAddition(d,result.undo);assert.equal(d.otherMunicipality,null);
 d=acceptCustomExcel(d,m,c,d.municipalities).data;d.otherConfig.reduction=70;const update=clone(m);update.metadata.fileName='new.xlsx';result=acceptCustomExcel(d,update,null,d.municipalities);d=result.data;d.otherConfig.reduction=75;undoAddition(d,result.undo);assert.equal(d.otherConfig.reduction,75);
 const other=municipalityFromRows(rows('Lahti'),'Lahti.xlsx',d.municipalities,{allowOther:true});result=acceptCustomExcel(d,other,defaultConfig(other),d.municipalities);d=result.data;assert.equal(d.otherMunicipality.name,'Lahti');undoAddition(d,result.undo);assert.equal(d.otherMunicipality.name,'Tampere');assert.equal(d.otherConfig.reduction,75);validateData(d,d.municipalities);
});
