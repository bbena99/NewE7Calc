import './App.css'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { GearPage, HeroPage, HomePage, PageLayout, PageNotFound } from './pages';
import { useState } from 'react';
import { Constants } from './constants';
import axios from 'axios';
import { Character, Gear, newChar, newGearSet } from './models';
import { AppRoutes } from './core';

function App() {
  const constants = Constants;
  const localTheme = localStorage.getItem('theme');
  const [theme,setTheme] = useState(localTheme??constants.THEMES[0]);
  const [charArr,setCharArr] = useState<Character[]>([]);
  const [char,setChar]=useState<Character>();
  let localGear:Gear[] = newGearSet();
  if(window.localStorage.getItem('gear'))localGear = JSON.parse(window.localStorage.getItem('gear')??"") as Gear[]
  const [gearArr,setGearArr]=useState<Gear[]>(localGear);
  if(charArr.length<1)axios.get('/api/v1/characters')
    .then(res=>{
      setCharArr(res.data);
      const charName = window.location.href.split('/')[4];
      if(charName)setChar(Constants.gearCalc({...newChar(),...res.data.find((c:Character)=>c.nameNoSpace===charName)},gearArr));
    })
    .catch(err=>console.error(err));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout routes={AppRoutes} theme={theme} setTheme={(t)=>setTheme(t)}/>}>
            <Route index element={<HomePage/>}/>
            <Route path='/Heroes' element={<HeroPage charArr={charArr}/>}/>
            <Route path='/Heroes/*' element={<GearPage
              char={char??newChar()}
              gearArr={gearArr}
              setBoth={(c:Character,g:Gear[])=>{
                window.localStorage.setItem('gear',JSON.stringify(g))
                setGearArr(g);
                setChar(Constants.gearCalc(c,g))
              }}
              setTheme={(t:string)=>window.localStorage.setItem('theme',t)}
            />}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
