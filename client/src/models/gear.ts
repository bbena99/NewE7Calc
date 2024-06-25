import { Constants } from "../constants/"
export interface Gear {
  id:number,
  level : number, //index of level[] from constants
  type : number,  //enum for gear set type
  main : number,  //enum for constants.ts/STAT_ENUM
  hits : number[],//array of 0,1,2,3 for which sub got hit
  possibleMain:number[], //All possible main stats of this type of gear
  possibleSubs:number[], //All possible sub stats for this type of gear.
  subs : {
    stat:number,
    value:number|undefined
  }[],
}
export function newGear():Gear{
  return {
    id:0,
    level: Constants.LEVEL_ENUM.length-1,
    type: 0,
    possibleMain:[],
    main: 0,
    hits: [0,0,0,0,0],
    possibleSubs:[0,1,2,3,4,5,6,7,8,9,10],
    subs: [
      {stat:0,value:undefined},
      {stat:1,value:undefined},
      {stat:2,value:undefined},
      {stat:3,value:undefined},
    ]
  }
}
export function newGearSet():Gear[]{
  return [
    {//Weapon:
      ...newGear(),
      //id:0,
      possibleMain:[0],
      possibleSubs:[2,3,5,6,7,8,9,10],
      subs: [
        {stat:7,value:undefined},
        {stat:8,value:undefined},
        {stat:9,value:undefined},
        {stat:10,value:undefined},
      ]
    },{//Helmet
      ...newGear(),
      id:1,
      possibleMain:[2],
      possibleSubs:[0,1,3,4,5,6,7,8,9,10],
      subs: [
        {stat:7,value:undefined},
        {stat:8,value:undefined},
        {stat:9,value:undefined},
        {stat:10,value:undefined},
      ]
    },{//Armor
      ...newGear(),
      id:2,
      possibleMain:[1],
      possibleSubs:[2,4,5,6,7,8,9,10],
      subs: [
        {stat:7,value:undefined},
        {stat:8,value:undefined},
        {stat:9,value:undefined},
        {stat:10,value:undefined},
      ]
    },{//Necklace
      ...newGear(),
      id:3,
      possibleMain:[0,1,2,3,4,5,7,8],
      subs: [
        {stat:7,value:undefined},
        {stat:8,value:undefined},
        {stat:9,value:undefined},
        {stat:10,value:undefined},
      ]
    },{//Ring
      ...newGear(),
      id:4,
      possibleMain:[0,1,2,3,4,5,9,10],
      subs: [
        {stat:7,value:undefined},
        {stat:8,value:undefined},
        {stat:9,value:undefined},
        {stat:10,value:undefined},
      ]
    },{//Boots
      ...newGear(),
      id:5,
      possibleMain:[0,1,2,3,4,5,6],
      subs: [
        {stat:7,value:undefined},
        {stat:8,value:undefined},
        {stat:9,value:undefined},
        {stat:10,value:undefined},
      ]
    },
  ]
}