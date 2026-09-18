import {budget,sectorBudget,roundingBudget,finite,METHOD} from './core.js';
export const REGION_ID='pohjois-karjala';
export const SECTOR_COLORS=Object.freeze({'Kulutussähkö':'#FFDF43','Sähkölämmitys':'#F48C24','Kaukolämpö':'#FF0505','Öljylämmitys':'#F7A979','Muu lämmitys':'#FFC000','Teollisuus':'#595959','Työkoneet':'#4951ED','Tieliikenne':'#8EDDFF','Raideliikenne':'#7F7F7F','Vesiliikenne':'#FFF2CC','Maatalous':'#548235','Jätteiden käsittely':'#C5E0B4','F-kaasut':'#9DC3E6'});
// Absolute tolerance follows the existing display precision. Yellow: at most 5% above target.
export const TRAFFIC_LIMITS=Object.freeze({absoluteToleranceKt:0.05,nearPercent:5});
export function traffic(actual,target){
 if(!finite(actual)||!finite(target))return {color:'unknown',label:'Vertailua ei saatavilla'};
 const gap=actual-target;
 if(gap<=TRAFFIC_LIMITS.absoluteToleranceKt)return {color:'green',label:'Tavoiteuralla'};
 if(target>0&&gap/target*100<=TRAFFIC_LIMITS.nearPercent)return {color:'yellow',label:'Lähellä tavoiteuraa'};
 return {color:'red',label:'Tavoiteuran yläpuolella'};
}
const completeSum=values=>values.every(finite)?values.reduce((a,b)=>a+b,0):null;
export const totalBudget=(c,y)=>c.members?completeSum(c.members.map(x=>budget(x,y))):budget(c,y);
export const totalSectorBudget=(c,s,y)=>c.members?completeSum(c.members.map(x=>sectorBudget(x,s,y))):sectorBudget(c,s,y);
export const totalRoundingBudget=(c,y)=>c.members?completeSum(c.members.map(x=>roundingBudget(x,y))):roundingBudget(c,y);
// Derived view only: never insert this object in the persisted municipality array.
export function regionView(data){
 const ms=data.municipalities,sectors=ms[0].sectors,years=ms[0].years.filter(y=>ms.every(m=>m.years.includes(y)));
 const observations=Object.fromEntries(years.map(y=>[y,{total:completeSum(ms.map(m=>m.observations[y].total)),credits:completeSum(ms.map(m=>m.observations[y].credits)),sectors:Object.fromEntries(sectors.map(s=>[s,completeSum(ms.map(m=>m.observations[y].sectors[s]))]))}]));
 const members=ms.map(m=>data.configs[m.id]),baseYear=Math.max(...members.map(c=>c.baseYear)),targetYear=Math.min(...members.map(c=>c.targetYear));
 const config={members,baseYear,targetYear,mode:'aggregate',confirmed:members.every(c=>c.confirmed),basis:'direct',sectorTargets:{}};
 const base=totalBudget(config,baseYear),target=totalBudget(config,targetYear);
 config.baseline={year:baseYear,total:base,sectors:Object.fromEntries(sectors.map(s=>[s,totalSectorBudget(config,s,baseYear)])),capturedAt:'Kuntien tallennettujen lähtötasojen mukaan',sourceFile:'13 kunnan tavoiteasetukset'};
 config.reduction=base>0&&finite(target)?(1-target/base)*100:0;
 const municipality={id:REGION_ID,name:'Pohjois-Karjala',sectors,years,observations,metadata:{source:'Suomen ympäristökeskus, 13 kunnan aineistojen summa',method:METHOD,unit:'kt CO₂e',fileName:'13 kunnan ALas-aineistot',downloadDate:'Kuntakohtaisissa lähdetiedoissa',importedAt:'Kuntakohtaisissa lähdetiedoissa',publicationDate:null}};
 return {municipality,config,missingYears:[...new Set(ms.flatMap(m=>m.years))].filter(y=>!years.includes(y)),hasCommonPeriod:baseYear<targetYear};
}
