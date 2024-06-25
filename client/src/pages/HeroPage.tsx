import { PageBG } from "../components";
import { Constants } from "../constants";
import { Character } from "../models";
import { Card } from "flowbite-react";

interface HeroPagePropsI{
  charArr:Character[];
}

export function HeroPage(props:HeroPagePropsI):JSX.Element{
  const {charArr} = props;
  charArr.sort((a,b)=>a.name.localeCompare(b.name))
  return <PageBG>
    <div className="grid grid-cols-12 gap-4 lg:m-24" style={{overflow:'auto'}}>

      {charArr.map((char:Character)=>{
        return <Card
          key={char.nameNoSpace+"_card"}
          className="bg-bg2 border-bg1 hover:border-hover flex rounded-xl drop-shadow hover:drop-shadow-2xl [&_div]:flex-row [&_div]:justify-start min-w-60 col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
          onClick={()=>{history.pushState({},"","/Heroes/"+char.nameNoSpace);location.reload();}}
        >
          <div className="w-full flex">
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
            <div className="w-full flex flex-wrap">
              <h5 className="w-full text-header text-center text-lg underline">
                {char.name}
              </h5>
              <div className="w-full flex !justify-around text-text">
                <div className="flex w-14">
                  <img src="/api/v1/images/icons/stats?name=attack" alt="attack.png" className="w-6 h-6" />
                  {char.base_stats.Attack}
                </div>
                <div className="flex w-14">
                  <img src="/api/v1/images/icons/stats?name=health" alt="health.png" className="w-6 h-6"/>
                  {char.base_stats.Health}
                </div>
              </div>
              <div className="w-full flex !justify-around text-text">
                <div className="flex w-14">
                  <img src="/api/v1/images/icons/stats?name=speed" alt="speed.png" className="w-6 h-6" />
                  {char.base_stats.Speed}
                </div>
                <div className="flex w-14">
                  <img src="/api/v1/images/icons/stats?name=defense" alt="defense.png" className="w-6 h-6"/>
                  {char.base_stats.Defense}
                </div>
              </div>
            </div>
          </div>
        </Card>
      })}
    </div>
  </PageBG>
}