import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as core from '../src/core.js';
import * as additions from '../src/additions.js';
import * as custom from '../src/custom.js';
import {compareImport} from '../src/importer.js';

// Lightweight DOM substitute: verifies generated markup and event logic, not browser layout.
function harness(){
 const nodes=new Map(),events={};
 const element=id=>{if(!nodes.has(id))nodes.set(id,{id,innerHTML:'',value:'',textContent:'',dataset:{},hidden:false,disabled:false,classList:{add(){},remove(){},toggle(){}},insertAdjacentHTML(where,html){this.innerHTML=where==='afterbegin'?html+this.innerHTML:this.innerHTML+html;},setAttribute(){},removeAttribute(){},showModal(){},close(){},closest(){return this;}});return nodes.get(id);};
 const nav=['yhteenveto','paastobudjetti','raportti','asetukset'].map(page=>({...element('nav-'+page),dataset:{page}}));
 const ctx=vm.createContext({...core,...additions,...custom,compareImport,budget:additions.totalBudget,sectorBudget:additions.totalSectorBudget,roundingBudget:additions.totalRoundingBudget,console,Intl,Date,Number,JSON,Set,Map,FormData:class{constructor(form){this.values=form.values;}get(key){return this.values[key];}},setTimeout(){return 1;},clearTimeout(){},AbortController,localStorage:{setItem(k,v){this.value=v;},getItem(){return null;}},location:{hash:''},document:{querySelector:s=>element(s.slice(1)),querySelectorAll:()=>nav,addEventListener:(type,fn)=>(events[type]??=[]).push(fn)},window:{addEventListener(){},print(){}},parseExcel:async file=>file.municipality,workbook(){},saveBlob(){},chartPNG(){}});
 let src=fs.readFileSync(new URL('../src/app.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replace(/^registerAgentTools\(\);\ninit\(\);/m,'');
 vm.runInContext(src,ctx);
 const d=JSON.parse(fs.readFileSync(new URL('../data/dataset.json',import.meta.url)));ctx.fixture=d;
 vm.runInContext('published=clone(fixture);data=clone(fixture);ensureConfigs();render();',ctx);
 return {ctx,element,run:s=>vm.runInContext(s,ctx),emit(type,target){for(const fn of events[type]??[])fn({target,preventDefault(){}});}};
}
test('All municipality pages, dialogs and every sector boundary render with verbal status',()=>{
 const h=harness();h.run(`for(const id of [REGION_ID,...data.municipalities.map(m=>m.id)]){current=id;for(const hash of ['yhteenveto','paastobudjetti','raportti','asetukset']){location.hash='#'+hash;render();if(!$('#main').innerHTML)throw Error('Empty view');}for(const s of muni().sectors)openSector(s);}`);
 h.run(`current=data.municipalities[0].id;location.hash='#paastobudjetti';const c=config(),m=muni();c.mode='sectors';c.reduction=0;c.baseYear=2007;c.targetYear=2030;c.baseline.total=1300;for(const s of m.sectors){c.baseline.sectors[s]=100;c.sectorTargets[s]=0;}`);
 for(const [v,color] of [[95,'green'],[100,'green'],[100.1,'yellow'],[103,'yellow'],[105,'yellow'],[105.1,'red'],[110,'red']]){
  h.run(`for(const s of muni().sectors)muni().observations[latest()].sectors[s]=${v};render();`);
  const html=h.run('sectorTable()').split('<tbody>')[1].split('</tbody>')[0];assert.equal((html.match(new RegExp('traffic '+color,'g'))??[]).length,13);assert.match(html, /traffic-result/);
  for(const row of h.run('sectorRows().slice(1,-1)'))assert.equal(row.at(-1),additions.traffic(v,100).label);
  h.run('openSector(muni().sectors[0])');assert.ok(h.element('dialog-content').innerHTML.includes('traffic '+color));
 }
 h.run(`config().reduction=65;for(const s of muni().sectors)config().sectorTargets[s]=64;`);assert.match(h.run('settingsSummary()'),/traffic yellow/);
 h.run(`current=data.municipalities[0].id;config().reduction=0;for(const s of muni().sectors)config().sectorTargets[s]=0;config().baseline.sectors[muni().sectors[0]]=100;`);
});
test('Muu kunta input, validation, year addition, undo, and year switching follow UI handlers',()=>{
 const h=harness();h.emit('change',{id:'municipality',value:'muu-kunta'});assert.match(h.element('main').innerHTML,/Muun kunnan lähtötiedot/);assert.doesNotMatch(h.element('main').innerHTML,/traffic green/);assert.equal(h.element('undo-addition').disabled,true);
 const values={name:'Testikunta',source:'Testiaineisto','custom-base':'2007','custom-latest':'2024','custom-target':'2030','custom-reduction':'50'};
 for(let i=0;i<13;i++){values['base-'+i]='100';values['latest-'+i]='80';}values['base-13']='1300';values['latest-13']='1040';
 const missing={...values,'base-0':''};h.emit('submit',{id:'custom-create',values:missing});assert.match(h.element('custom-error').textContent,/Täytä/);assert.equal(h.run('data.otherMunicipality'),undefined);
 h.emit('submit',{id:'custom-create',values});assert.equal(h.run('muni().name'),'Testikunta');assert.equal(h.run('budget(config(),2030)'),650);assert.equal(h.element('undo-addition').disabled,false);
 h.emit('change',{id:'budget-year',value:'2029'});h.run("location.hash='#raportti';render()");assert.match(h.element('main').innerHTML,/Testikunta/);assert.match(h.element('main').innerHTML,/2029/);assert.doesNotMatch(h.element('main').innerHTML,/Testikunta · Pohjois-Karjala/);
 const added={source:'Testiaineisto 2025','observation-year':'2025','value-13':'910'};for(let i=0;i<13;i++)added['value-'+i]='70';h.emit('submit',{id:'custom-year-form',values:added});assert.deepEqual(Array.from(h.run('muni().years')),[2007,2024,2025]);
 h.run("undoAddition(data,undo);undo=null;save();render()");assert.deepEqual(Array.from(h.run('muni().years')),[2007,2024]);assert.equal(h.element('undo-addition').disabled,true);assert.equal(JSON.parse(h.ctx.localStorage.value).data.otherMunicipality.name,'Testikunta');
});
test('Import accept and undo restore emissions while retaining separately edited target settings',async()=>{
 const h=harness();h.run("location.hash='#asetukset';render()");const m=structuredClone(h.run('data.municipalities[0]'));m.metadata.source='Tuotu aineisto';h.ctx.file={name:'test.xlsx',municipality:m};await h.run('importFiles([file])');h.element('accept-import').onclick();assert.equal(h.run('data.municipalities[0].metadata.source'),'Tuotu aineisto');h.run('data.configs[data.municipalities[0].id].reduction=70');
 h.emit('click',{closest(){return {id:'undo-addition',dataset:{},hasAttribute(){return false;}};}});h.element('confirm-action').onclick();assert.notEqual(h.run('data.municipalities[0].metadata.source'),'Tuotu aineisto');assert.equal(h.run('data.configs[data.municipalities[0].id].reduction'),70);assert.equal(h.element('undo-addition').disabled,true);
});
