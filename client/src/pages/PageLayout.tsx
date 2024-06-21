import { ReactNode } from "react";
import { NavBar } from "../components";
import { Outlet } from "react-router-dom";
import { AppRouteI } from "../core";

interface PageLayoutPropsI{
  routes:AppRouteI[];
  theme:string;
  setTheme:(t:string)=>void;
}
export function PageLayout(props:PageLayoutPropsI):ReactNode{
  const {routes, theme, setTheme}={...props}
  return (
    <>
      <NavBar routes={routes} theme={theme} setTheme={setTheme}/>
      <div className=" h-20"/>
      <div className={`${theme}`}>
        <Outlet/>
      </div>
    </>
  );
}