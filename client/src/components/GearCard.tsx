import { Card, Tooltip, Progress } from "flowbite-react";
import { Gear } from "../models";
import { Constants } from "../constants";

interface GearCardPropsI{
  gear:Gear;
  setGear:(g:Gear)=>void;
}
export function GearCard(props:GearCardPropsI){
  const {gear,setGear} = props;
  return <Card className="w-full h-full bg-bg2 border-bg1 border-4 rounded-2xl">
    <h4 className="text-header text-xl underline w-full">
      {Constants.GEAR_TYPE[gear.id]}
    </h4>
    <div className="w-100 h-10 flex justify-between text-base text-text bg-bg1 rounded-lg p-1 border-text border-2">
      <div className="flex h-full">
        <p className="w-20 h-full align-middle">Gear Set:</p>
        <img
          className="h-full"
          src={"/api/v1/images/icons/gearSets?name="+Constants.GEAR_ENUM[gear.type]}
          alt={Constants.GEAR_ENUM[gear.type]+".png"}
          />
        <select
          className="bg-bg1 text-header p-0 border-0 hover:cursor-pointer"
          name={"GearSet_"+gear.id}
          id={"GearSet_"+gear.id}
          value={gear.type}
          onChange={(e)=>{
            setGear({...gear,type:+e.target.value})
          }}
        >
          {Constants.GEAR_ENUM.map((set,index)=>{
            return <option value={index} key={set}>
              {set}
            </option>
          })}
        </select>
      </div>
      <div className="flex h-full">
        <p className="h-full align-middle">Level:</p>
        <select
          className="bg-bg1 !pt-0 !p-1 h-full align-middle border-0 text-header hover:cursor-pointer"
          name={"Level_"+gear.id}
          id={"Level_"+gear.id}
          value={gear.level}
          onChange={(e)=>{
            setGear({...gear,level:+e.target.value})
          }}
          >
          {Constants.LEVEL_ENUM.map((level,index)=>{
            return <option value={index} key={"Level_"+index}>{level}</option>
          })}
        </select>
      </div>
    </div>
    <div className="w-100 h-10 pr-2 flex justify-between text-base text-text bg-bg1 rounded-lg p-1 border-2 border-text">
      <div className="flex">
        <p className="w-20">Main Stat:</p>
        <select
          className="bg-bg1 text-header p-0 border-0 hover:cursor-pointer"
          name={"Main_"+gear.id}
          id={"Main_"+gear.id}
          disabled={gear.possibleMain.length<2}
          value={gear.main}
          onChange={(e)=>{
            setGear({...gear,main:+e.target.value})
          }}
          >
          {gear.possibleMain.map(stat=>{
            return <option value={stat} key={"Main_"+stat} disabled={gear.subs.findIndex(sub=>sub.stat===stat)>-1}>{Constants.STAT_ENUM[stat].name}{}</option>
          })}
        </select>
      </div>
      <div className="flex">
        <img
          className="w-6 h-6"
          src={"/api/v1/images/icons/stats?name="+Constants.STAT_ENUM[gear.main].name}
          alt={Constants.STAT_ENUM[gear.main].name+".png"}
        />
        <p className="text-header">
          {Constants.STAT_ENUM[gear.main].main[gear.level]}
          {[3,4,5,7,8,9,10].includes(gear.main)?('%'):('')}
        </p>
      </div>
    </div>
    <div className="w-full h-40 flex flex-wrap flex-col justify-between">
      {gear.hits.map((h,i)=>{
        return <div
          className="w-10 h-full bg-bg1 rounded-lg border-text border-2"
          key={gear.id+"_hits_"+i}
          role="group"
        >
          {[0,1,2,3].map(val=>{
            return <button 
              key={h+i+val}
              type="button"
              disabled={val===h}
              className=" w-full h-1/4 text-header disabled:bg-text disabled:text-bg1"
              onClick={()=>{
                const newGear = {...gear}
                newGear.hits[i]=val;
                setGear(newGear)
              }}
            >
              +{(i+1)*3}
            </button>
          })}
        </div>
      })}
      {gear.subs.map((sub,index)=>{
        let mult = 1;
        gear.hits.forEach(h=>{
          if(h===index)mult++;
        })
        const minVal = Constants.STAT_ENUM[sub.stat].minSub[gear.level]*mult;
        if(sub.value&&sub.value<minVal)sub.value=minVal
        const maxVal = Constants.STAT_ENUM[sub.stat].maxSub[gear.level]*mult;
        if(sub.value&&sub.value>maxVal)sub.value=maxVal
        const prog = Math.floor((sub.value-minVal)/(maxVal-minVal)*100)
        return <div
          key={"sub_"+index}
          className="h-10 grid grid-cols-3 rounded-lg border-2 border-text bg-bg1 overflow-hidden"
          style={{width:"calc( 100% - 13rem )"}}
        >
          <select
            name={"gear_"+gear.id+"_sub_"+index}
            id={"gear_"+gear.id+"_sub_"+index}
            className="col-span-2 !p-1 bg-transparent border-0 text-header hover:cursor-pointer focus:ring-0"
            value={sub.stat}
            onChange={(e)=>{
              const newGear = {...gear};
              newGear.subs[index]={stat:+e.target.value,value:Constants.STAT_ENUM[+e.target.value].minSub[gear.level]*mult}
              setGear(newGear)
            }}
          >
            {gear.possibleSubs.map(psub=>{
              return <option key={"sub"+psub} value={psub} disabled={gear.subs.findIndex(stat=>stat.stat===psub)>-1||gear.main===psub} className="bg-bg1">
                {Constants.STAT_ENUM[psub].name}
              </option>
            })}
          </select>
          <div className="h-full w-full col-span-1 flex items-center justify-end relative left-0">
            <img
              src={"/api/v1/images/icons/stats?name="+Constants.STAT_ENUM[sub.stat].name}
              alt={Constants.STAT_ENUM[sub.stat].name+".png"}
              className="h-6 w-6"
            />
            <Tooltip
              content={""+minVal+'-'+maxVal}
              trigger="click"
              className="w-16 text-center text-text bg-bg1 [&_div]:bg-bg1"
            >
              <input
                type="number"
                className="h-full w-10 z-10 !p-1 bg-transparent border-0 focus:ring-0 text-header text-right"
                value={sub.value??minVal}
                min={minVal}
                max={maxVal}
                placeholder={""+minVal+"-"+maxVal}
                onChange={(e)=>{
                  const newGear = {...gear};
                  newGear.subs[index].value = +e.target.value;
                  setGear(newGear);
                }}
              />
            </Tooltip>
            {[3,4,5,7,8,9,10,11].includes(sub.stat)
              ?(<p className="z-0 -ml-3 mr-2">%</p>)
              :(<p className="z-0 -ml-3 mr-2">{` `}</p>)}
          </div>
          <div className="w-full h-3 col-span-3 relative overflow-hidden [&_div]:h-3">
            <Progress
              progress={prog}
              className="w-full h-full bg-bg-2 [&_div]:bg-text rounded-none [&_div]:rounded-none"
              />
          </div>
        </div>
      })}
    </div>
  </Card>
}