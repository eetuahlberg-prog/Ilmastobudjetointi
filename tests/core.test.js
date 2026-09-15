import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {defaultConfig,budget,sectorBudget,roundingBudget,validateDataset,validateConfig,validateMunicipality,validateAction,change,sumKnown,csv,clone} from '../src/core.js';
import {compareImport} from '../src/importer.js';
const d=JSON.parse(readFileSync(new URL('../data/dataset.json',import.meta.url)));
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
test('13 municipalities: source validation, all years and sector budgets reconcile',()=>{
  assert.equal(d.municipalities.length,13);validateDataset(d,d.municipalities);
  for(const m of d.municipalities){const c=defaultConfig(m);validateConfig(c);assert.equal(m.years.length,21);assert.equal(Math.max(...m.years),2024);
    for(let y=2007;y<=2030;y++)near(budget(c,y),m.sectors.reduce((sum,s)=>sum+sectorBudget(c,s,y),0)+roundingBudget(c,y));
    near(budget(c,2007),m.observations[2007].total);near(budget(c,2030),m.observations[2007].total*.35);
  }
});
test('A: Kontiolahti 2007–2030 at 65% uses source total 94.2',()=>{
  const c=defaultConfig(d.municipalities.find(m=>m.id==='kontiolahti'));
  near(budget(c,2030),32.97);near(budget(c,2024),94.2*(1-.65*17/23));near(budget(c,2027),94.2*(1-.65*20/23));
  assert.equal(budget(c,2006),null);assert.equal(budget(c,2031),null);
});
test('B/C: each municipality and 70% reduction recalculate all sectors',()=>{
  for(const m of d.municipalities){const c=defaultConfig(m);c.reduction=70;near(budget(c,2030),m.observations[2007].total*.3);for(const s of m.sectors)near(sectorBudget(c,s,2030),m.observations[2007].sectors[s]*.3);}
});
test('Custom targets: aggregate follows sectors and rounding residual',()=>{
  const m=d.municipalities[0],c=defaultConfig(m);c.mode='sectors';c.sectorTargets['Maatalous']=20;
  near(sectorBudget(c,'Maatalous',2030),m.observations[2007].sectors['Maatalous']*.8);
  near(budget(c,2030),m.sectors.reduce((s,k)=>s+sectorBudget(c,k,2030),0)+roundingBudget(c,2030));
});
test('Data revisions do not move frozen target curve; regressions reported',()=>{
  const m=d.municipalities[0],c=defaultConfig(m),n=clone(m),before=budget(c,2027);n.observations[2007].total+=.1;n.observations[2007].sectors['Kulutussähkö']+=.1;
  n.years.push(2025);n.observations[2025]=clone(n.observations[2024]);validateMunicipality(n,d.municipalities.map(m=>m.id));
  near(budget(c,2027),before);const comparison=compareImport(m,n,c);assert.deepEqual(comparison.changed,[2007]);assert.equal(comparison.missing.length,0);assert.equal(comparison.warnings.length,1);
  n.years=n.years.filter(y=>y!==2006);assert.deepEqual(compareImport(m,n,c).missing,[2006]);
});
test('D: action amounts preserve unknown, zero, and actual sums',()=>{
  assert.deepEqual(sumKnown([{investment:null}], 'investment'),{value:null,known:0,missing:1});
  assert.deepEqual(sumKnown([{investment:0},{investment:50000},{investment:null}], 'investment'),{value:50000,known:2,missing:1});
  assert.equal(change(0,0),null);
  const a={theme:'Energia',goal:'Energiankulutus vähenee',action:'LED-valot',owner:'Tekniset palvelut',year:2027,investment:50000,impact:'Sähkönkulutus vähenee',operating:null,savings:0,emissionImpact:null,schedule:'',notes:'',status:'Suunnitteilla'};validateAction(a);
  assert.throws(()=>validateAction({...a,investment:-1}));assert.throws(()=>validateAction({...a,goal:''}));
});
test('Import rejects duplicates, missing values, wrong method and total mismatch',()=>{
  const allowed=d.municipalities.map(m=>m.id);for(const mutate of [m=>m.years.push(2024),m=>m.observations[2024].sectors['Maatalous']=null,m=>m.metadata.method='Kaikki päästöt',m=>m.observations[2024].total+=10,m=>m.observations[2024].credits=1]){const m=clone(d.municipalities[0]);mutate(m);assert.throws(()=>validateMunicipality(m,allowed));}
});
test('Backup validation rejects corrupted actions and duplicate municipalities',()=>{
  const bad=clone(d);bad.municipalities[1]=bad.municipalities[0];assert.throws(()=>validateDataset(bad,d.municipalities));
  const wrong=clone(d);wrong.actions=[{id:'1',municipalityId:wrong.municipalities[0].id}];assert.throws(()=>validateDataset(wrong,d.municipalities));
});
test('H: Finnish CSV includes BOM, quotes, decimal comma, missing cells and formula neutralization',()=>{
  const out=csv([['Toimenpide','Euroa'],['A; "B"',50.25],['=HYPERLINK("bad")',null],['Nolla',0]]);
  assert.ok(out.startsWith('\uFEFF'));assert.ok(out.includes('"50,25"'));assert.ok(out.includes('"A; ""B"""'));assert.ok(out.includes('"\'=HYPERLINK'));assert.ok(out.includes('"Nolla";"0"'));
});
