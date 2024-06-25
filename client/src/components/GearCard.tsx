import { Card } from "flowbite-react";
import { Gear } from "../models";
import { Constants } from "../constants";

interface GearCardPropsI{
  gear:Gear;
  setGear:(g:Gear)=>void;
}
export function GearCard(props:GearCardPropsI){
  const {gear,setGear} = props;
  return <Card className="w-full h-full bg-bg2 border-bg1 border-4">
    <h4 className="text-header text-xl underline w-full">
      {Constants.GEAR_TYPE[gear.id]}
    </h4>
    <div className="w-100 h-8 flex justify-between text-base text-text bg-bg1 rounded-lg p-1">
      <div className="flex">
        <p className="w-20">Gear Set:</p>
        <img
          className="w-8 h-8 -mt-1"
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
      <div className="flex">
        <p>Level:</p>
        <select
          className="bg-bg1 p-0 border-0 text-header hover:cursor-pointer"
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
    <div className="w-100 h-8 pr-2 flex justify-between text-base text-text bg-bg1 rounded-lg p-1">
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
            return <option value={stat} key={"Main_"+stat}>{Constants.STAT_ENUM[stat].name}{}</option>
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
    <div>
      
    </div>
  </Card>
}