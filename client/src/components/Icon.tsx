import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Constants } from "../constants";

interface IconI{
  theme:string;
  setTheme:(t:string)=>void;
  className?:string;
}
export const Icon =(props:IconI)=>{
  const {theme,setTheme,className} = props;
  const constants = Constants
  const themeIndex:number = constants.THEMES.indexOf(theme);
  const numOfThemes:number = constants.THEMES.length;
  
  let ico;
  switch(theme){
    case 'White':
      ico = <FontAwesomeIcon icon={faSun} className="text-base"/>
      break;
    case 'Black':
      ico = <FontAwesomeIcon icon={faMoon} className="text-base"/>;
      break;
    default:
      ico = <img src={'/api/v1/images/icons/element?name='+theme} alt={theme}/>
  }
  return <button
    type="button"
    className={"h-9 w-9 text-text text-base hover:text-hover hover:bg-text focus:ring-text rounded-lg"+className}
    onClick={()=>{
      const newTheme = constants.THEMES[(themeIndex+1)%numOfThemes];
      setTheme(newTheme);
      localStorage.setItem('theme',newTheme);
    }}
  >
    {ico}
  </button>
}
{/* <button
  type="button"
  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
  Default
</button> */}