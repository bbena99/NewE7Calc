import { ReactNode, useEffect } from "react";
import { PageBG } from "../components";
import { socket } from "../core";

export function HeroPage():ReactNode{
  //const [heroMap,setHeroMap] = useState<Map<string,Character>>();

  useEffect(()=>{
    socket.on('connect',()=>{
      console.log('connected')
    })
  },[]);

  return <PageBG>
    <div className="h-screen">
      HeroPage.tsx Works
    </div>
  </PageBG>
}