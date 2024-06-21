import { ReactNode } from "react";
import { 
  GearPage,
  HeroPage,
  HomePage,
  PageNotFound,
} from "../pages";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { 
  faCalculator,
  faQuestion,
  faUser
} from "@fortawesome/free-solid-svg-icons";

export interface PageProps {
  pageName:string;
  pagePath:Location|undefined;
}
export interface AppRouteI {
  displayName:string;
  routePath:string;
  icon:IconDefinition;
  pageElement:ReactNode;
}
export const AppRoutes: AppRouteI[] = [
  {
    displayName:'Epic 7 Gear Calculator',
    routePath:'/',
    icon:faCalculator,
    pageElement:HomePage()
  },{
    displayName:'Heroes',
    routePath:'/Heroes',
    icon:faUser,
    pageElement:HeroPage()
  },
  {
    displayName:':HeroName',
    routePath:'/Heroes/:HeroName',
    icon:faQuestion,
    pageElement:GearPage()
  },
  {
    displayName:'Page Not Found',
    routePath:'*',
    icon:faQuestion,
    pageElement:PageNotFound()
  }
]