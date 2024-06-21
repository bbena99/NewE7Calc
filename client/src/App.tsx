import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AppRoutes } from './core';
import { PageLayout } from './pages';
import { useState } from 'react';
import { Constants } from './constants';

function App() {
  const constants = Constants;
  const localTheme = localStorage.getItem('theme');
  const [theme,setTheme] = useState(localTheme??constants.THEMES[0]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout routes={AppRoutes} theme={theme} setTheme={setTheme}/>}>
            <Route index element={AppRoutes[0].pageElement}/>
            {AppRoutes.slice(1).map(r=>{
              return (
                <Route key={r.displayName+"_Route"} path={r.routePath} element={r.pageElement}/>
              )
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
