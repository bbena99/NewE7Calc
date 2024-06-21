import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "flowbite-react";
import { AppRouteI } from "../core";
import { Icon } from "./Icon";

interface NavBarPropsI{
  routes:AppRouteI[];
  theme:string;
  setTheme:(t:string)=>void;
}
export const NavBar = (props:NavBarPropsI) => {
  const {routes, theme, setTheme} = props;
  const displayRoutes = [...routes.slice(1,routes.length-2)];
  const home = routes[0];
  return (
    <Navbar className={`${theme} w-full fixed z-10 top-0 start-0 flex items-center py-3 bg-bg2`}>
      <Navbar.Brand href={home.routePath} className=" h-14">
        <span className="self-center whitespace-nowrap text-2xl font-semibold text-header hover:text-hover">
          <FontAwesomeIcon icon={home.icon} />
          {" "+home.displayName}
        </span>
      </Navbar.Brand>
      <div className="!flex items-center md:order-2 md:!hidden">
        <Navbar.Toggle className="h-full w-half"/>
        <Icon theme={theme} setTheme={setTheme}/>
      </div>
      <Navbar.Collapse className="[&_li]:flex [&_li]:items-center">
        {displayRoutes.map(r=>{
          return <Navbar.Link href={r.routePath} key={r.displayName+"_Nav_Btn"} className="text-base text-text hover:!text-hover w-full">
            <FontAwesomeIcon icon={r.icon} className="mr-1"/>
            {" "+r.displayName}
          </Navbar.Link>;
        })}
        <Icon theme={theme} setTheme={setTheme} className=" hidden md:inline"/>
      </Navbar.Collapse>
    </Navbar>
  );
}