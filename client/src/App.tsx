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
  const [gearArr,setGearArr]=useState<Gear[]>(newGearSet());
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
          <Route path="/" element={<PageLayout routes={AppRoutes} theme={theme} setTheme={setTheme}/>}>
            <Route index element={<HomePage/>}/>
            <Route path='/Heroes' element={<HeroPage charArr={charArr}/>}/>
            <Route path='/Heroes/*' element={<GearPage char={char??newChar()} gearArr={gearArr} setGearArr={setGearArr}/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
