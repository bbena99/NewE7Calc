import { Card } from "flowbite-react";
import { GearCard, PageBG } from "../components";
import { Constants } from "../constants";
import { Character, Gear } from "../models";

interface GearPagePropsI{
  char:Character;
  gearArr:Gear[];
  setBoth:(c:Character,g:Gear[])=>void;
  setTheme:(t:string)=>void;
}
export function GearPage(props:GearPagePropsI):JSX.Element{
  const {char, gearArr, setBoth,setTheme} = props;
  if(!gearArr||!char.nameNoSpace)return <></>
  setTheme(Constants.ELEMENT_ENUM[char.element])
  return <PageBG>
    <div className="w-full h-full lg:px-24 py-6 flex">
      {/* Hero Column */}
      <div className="w-full h-full md:w-1/2 2xl:w-1/3">
        <Card className="w-full h-full bg-bg2 border-bg1 border-4 [&_div]:justify-start rounded-2xl">
          <div className="flex">
            <img
              className="w-24 h-24 rounded-full border-bg1 border-4"
              src={"/api/v1/images/characters/?name="+char.nameNoSpace}
              alt={char.nameNoSpace+".png"}
              />
            <img
              className="w-10 h-10 -ml-24 mt-16 rounded-full bg-black border-bg1 border-4"
              src={"/api/v1/images/icons/class?name="+Constants.CLASS_ENUM[char.class]}
              alt={Constants.CLASS_ENUM[char.class]+".png"}
              />
            <img
              className="w-10 h-10 ml-4 mt-16 rounded-full bg-black border-bg1 border-4"
              src={"/api/v1/images/icons/element?name="+Constants.ELEMENT_ENUM[char.element]}
              alt={Constants.CLASS_ENUM[char.element]+".png"}
              />
            <h2 className="text-header text-2xl underline flex items-center justify-center" style={{'width':'calc(100% - 6rem)'}}>
              {char.name}
            </h2>
          </div>
          <div className="w-full">
            <h3 className="w-full text-header text-2xl underline">
              Stats after Gear:
            </h3>
            {Object.values(char.gear_stats).map((stat,index)=>{
              return <div className="w-full p-2 flex rounded-lg border-2 border-text mt-2 text-text text-xl bg-bg1" key={index+"_row"}>
                <img
                  className="w-8 h-8"
                  src={'/api/v1/images/icons/stats?name='+Constants.STAT_ENUM[(index>2)?(index+3):(index)].name}
                  alt={Constants.STAT_ENUM[(index>2)?(index+3):(index)].name+".png"}
                />
                <p className="w-3/4">
                  {Constants.STAT_ENUM[(index>2)?(index+3):(index)].name+":"}
                </p>
                <p className="w-1/4 text-right">
                  {stat}{(index>3)?('% '):(' ')}
                </p>
              </div>
            })}
          </div>
          <div className="w-1/2">
            <h4 className="p-1 text-header text-xl underline">
              Artifact:
            </h4>
            <div
              className="rounded-lg border border-text flex flex-wrap bg-bg1"
              role="group"
            >
              <label className="flex p-1 w-1/2 text-text border-e border-text" htmlFor="Artifact_Attack">Attack:</label>
              <label className="flex p-1 w-1/2 text-text" htmlFor="Artifact_Health">Health:</label>
              <input 
                className="w-1/2 bg-transparent border-0 pt-0 text-header focus:ring-0 border-e border-text" 
                type="number" 
                value={char.artifact.Attack} 
                placeholder="Attack" 
                id="Artifact_Attack" 
                name="Artifact_Attack" 
                onChange={(e)=>{
                  window.localStorage.setItem('artifact',JSON.stringify({Attack:+e.target.value,Health:char.artifact.Health}))
                  setBoth({...char,artifact:{Attack:+e.target.value,Health:char.artifact.Health}},gearArr)
                }} 
                />
              <input
                className="w-1/2 bg-transparent border-0 pt-0 text-header focus:ring-0" 
                type="number" 
                value={char.artifact.Health} 
                placeholder="Health" 
                id="Artifact_Health" 
                name="Artifact_Health" 
                onChange={(e)=>{
                  window.localStorage.setItem('artifact',JSON.stringify({Attack:char.artifact.Attack,Health:+e.target.value}))
                  setBoth({...char,artifact:{Attack:char.artifact.Attack,Health:+e.target.value}},gearArr)
                }}
              />
            </div>
          </div>
          <div className="rounded-lg w-1/2">
            <h4 className="p-1 text-header text-xl underline">
              Engrave:
            </h4>
            <select
              className="rounded-lg border-2 border-text bg-bg1 text-header hover:cursor-pointer"
              name="engrave_select"
              id="engrave_select"
              value={char.engraveValue}
              onChange={(e)=>{
                setBoth({...char,engraveValue:+e.target.value},gearArr)
              }}
            >
              {char.engrave.map((eng,index)=>{
                return <option key={"engrave_"+index} value={index}>{eng}</option>
              })}
            </select>
          </div>
        </Card>
      </div>
      {/* Gear Column */}
      <div className="w-0 md:w-1/2 2xl:w-2/3 h-full flex flex-col 2xl:flex-wrap justify-between" style={{overflow:'auto'}}>
        {gearArr.map((gear)=>{
          return <div className="w-full 2xl:w-1/2 min-h-96 lg:px-6" key={gear.id+"_gear"}>
            <GearCard
              gear={gear}
              setGear={(g:Gear)=>{
                const newArr = [...gearArr];
                newArr[gear.id]={...g};
                setBoth(char,newArr);
              }}
            />
          </div>
        })}
      </div>
    </div>
  </PageBG>
}