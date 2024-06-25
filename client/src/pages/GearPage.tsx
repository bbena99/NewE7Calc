import { Card } from "flowbite-react";
import { GearCard, PageBG } from "../components";
import { Constants } from "../constants";
import { Character, Gear } from "../models";

interface GearPagePropsI{
  char:Character;
  gearArr:Gear[];
  setGearArr:(g:Gear[])=>void
}
export function GearPage(props:GearPagePropsI):JSX.Element{
  const {char, gearArr, setGearArr} = props;
  if(!gearArr||!char.nameNoSpace)return <></>
  return <PageBG>
    <div className="w-full h-full sm:px-24 py-6 flex">
      {/* Hero Column */}
      <div className="w-full h-full md:w-1/2 2xl:w-1/3">
        <Card className="w-full h-full bg-bg2 border-bg1 border-4 [&_div]:justify-start">
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
              return <div className="w-full flex rounded border-2 border-text mt-2 text-text text-xl" key={index+"_row"}>
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
        </Card >
      </div>
      {/* Gear Column */}
      <div className="w-0 md:w-1/2 2xl:w-2/3 h-full flex flex-col 2xl:flex-wrap" style={{overflow:'auto'}}>
        {gearArr.map((gear)=>{
          return <div className="w-full 2xl:w-1/2 min-h-96 h-1/3 p-6" key={gear.id+"_gear"}>
            <GearCard
              gear={gear}
              setGear={(g:Gear)=>{
                const newArr = [...gearArr];
                newArr[gear.id]={...g};
                setGearArr(newArr);
              }}
            />
          </div>
        })}
      </div>
    </div>
  </PageBG>
}