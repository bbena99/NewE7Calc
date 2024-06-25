import { Character, Gear, Stat } from "../models"

export class Constants{
  public static API_VERSION : string = '/api/v1'//It's just because this will update all endpoints at the same time when a version is changed
  public static THEMES:string[]=[
    'White',
    'Black',
    'Fire',
    'Ice',
    'Earth',
    'Light',
    'Dark',
  ]
  public static GEAR_TYPE: string[]=[
    /*0*/'Weapon',
    /*1*/'Helmet',
    /*2*/'Armor',
    /*3*/'Necklace',
    /*4*/'Ring',
    /*5*/'Boots' 
  ]
  public static LEVEL_ENUM : number[] = [
    /*0*/67,
    /*1*/70,
    /*2*/75,
    /*3*/78,
    /*4*/85,
    /*5*/88,
    /*6*/90
  ]
  public static GEAR_ENUM : string[] = [
    /*00*/ 'Attack',
    /*01*/ 'Defense',
    /*02*/ 'Health',
    /*03*/ 'Speed',
    /*04*/ 'Critical',
    /*05*/ 'Destruction',
    /*06*/ 'Hit',
    /*07*/ 'Resist',
    /*08*/ 'Lifesteal',
    /*09*/ 'Counter',
    /*10*/ 'Unity',
    /*11*/ 'Immunity',
    /*12*/ 'Rage',
    /*13*/ 'Penetration',
    /*14*/ 'Revenge',
    /*15*/ 'Injury',
    /*16*/ 'Protection',
    /*17*/ 'Torrent'
  ]
  public static STAT_ENUM : Stat[] = [
    /*00*/ {
      name:'Attack',
      main:[425,440,465,475,500,515,525],
      minSub:[28,28,33,33,33,37,37],
      maxSub:[40,40,46,46,46,53,53],
    },
    /*01*/ {
      name:'Defense',
      main:[245,260,275,285,300,310,310],
      minSub:[24,24,28,28,28,28,28],
      maxSub:[30,30,35,35,35,40,40],
    },
    /*02*/ {
      name:'Health',
      main:[2295,2360,2495,2565,2700,2765,2835],
      minSub:[136,136,157,157,157,178,178],
      maxSub:[175,175,202,202,202,229,229]
    },
    /*03*/ {
      name:'Attack%',
      main:[50,50,60,60,60,65,65],
      minSub:[4,4,4,4,4,5,5],
      maxSub:[7,7,8,8,8,9,9]
    },
    /*04*/ {
      name:'Defense%',
      main:[50,50,60,60,60,65,65],
      minSub:[4,4,4,4,4,5,5],
      maxSub:[7,7,8,8,8,9,9]
    },
    /*05*/ {
      name:'Health%',
      main:[50,50,60,60,60,65,65],
      minSub:[4,4,4,4,4,5,5],
      maxSub:[7,7,8,8,8,9,9]
    },
    /*06*/ {
      name:'Speed',
      main:[35,35,40,40,40,45,45],
      minSub:[1,1,1,1,1,2,2],
      maxSub:[4,4,4,4,4,5,5]
    },
    /*07*/ {
      name:'Critical Hit Chance',
      main:[45,45,55,55,55,60,60],
      minSub:[2,2,3,3,3,4,4],
      maxSub:[4,4,5,5,5,6,6]
    },
    /*08*/ {
      name:'Critical Hit Damage',
      main:[55,55,65,65,65,70,70],
      minSub:[3,3,3,3,3,4,4],
      maxSub:[6,6,7,7,7,8,8]
    },
    /*09*/ {
      name:'Effectiveness',
      main:[50,50,60,60,60,65,65],
      minSub:[4,4,4,4,4,5,5],
      maxSub:[7,7,8,8,8,9,9]
    },
    /*10*/ {
      name:'Effect Resistance',
      main:[50,50,60,60,60,65,65],
      minSub:[4,4,4,4,4,5,5],
      maxSub:[7,7,8,8,8,9,9]
    },
    /*11*/ {
      name:'Dual Attack Chance',
      main:[],
      minSub:[],
      maxSub:[]
    }
  ]
  public static ELEMENT_ENUM : string[] = [
    /*0*/ 'Fire',
    /*1*/ 'Ice',
    /*2*/ 'Earth',
    /*3*/ 'Light',
    /*4*/ 'Dark'
  ]
  public static CLASS_ENUM : string[] = [
    /*0*/ 'Warrior',
    /*1*/ 'Knight',
    /*2*/ 'Thief',
    /*3*/ 'Ranger',
    /*4*/ 'Mage',
    /*5*/ 'Soul Weaver'
  ]
  public static SIGN_ENUM : string[] = [
    /*00*/ 'Aries',
    /*01*/ 'Taurus',
    /*02*/ 'Gemini',
    /*03*/ 'Cancer',
    /*04*/ 'Leo',
    /*05*/ 'Virgo',
    /*06*/ 'Libra',
    /*07*/ 'Scorpio',
    /*08*/ 'Sagittarius',
    /*09*/ 'Capricorn',
    /*10*/ 'Aquarius',
    /*11*/ 'Pisces'
  ]
  public static gearCalc=(char:Character,gearArr:Gear[]):Character=>{
    if(char.name==="")return char
    const stat:number[]=[
      char.base_stats.Attack+char.artifact.Attack,
      char.base_stats.Defense,
      char.base_stats.Health+char.artifact.Health,
      0,
      0,
      0,
      char.base_stats.Speed,
      char.base_stats["Critical Hit Chance"],
      char.base_stats["Critical Hit Damage"],
      char.base_stats.Effectiveness,
      char.base_stats["Effect Resistance"],
      char.base_stats["Dual Attack Chance"]
    ]
    if(char.engraveValue)stat[char.engraveStat]+=char.engrave[char.engraveValue];
    const gearSet:number[]=[]
    gearArr.forEach(g=>{
      gearSet[g.type] ?
        gearSet[g.type]++ :
        gearSet[g.type]=1;
      stat[g.main]+=this.STAT_ENUM[g.main].main[g.level]
      g.subs.forEach(sub=>{
        stat[sub.stat]+=sub.value??0
      })
    })
    gearSet.forEach((set,i)=>{
      switch(i){
        case 0:/*'Attack'*/
          if(set>=4)stat[3]+=45;
          break;
        case 1:/*'Defense'*/
          stat[4]+=(20*Math.floor(set/2));
          break;
        case 2:/*'Health'*/
          stat[5]+=(20*Math.floor(set/2));
          break;
        case 3:/*'Speed'*/
          if(set>=4)stat[6]+=Math.round(char.base_stats.Speed*0.25);
          break;
        case 4:/*'Critical'*/
          stat[7]+=(12*Math.floor(set/2));
          break;
        case 5:/*'Destruction'*/
          if(set>=4)stat[8]+=60;
          break;
        case 6:/*'Hit'*/
          stat[9]+=(20*Math.floor(set/2));
          break;
        case 7:/*'Resist'*/
          stat[10]+=(20*Math.floor(set/2));
          break;
        case 10:/*'Unity'*/
          char.gear_stats['Dual Attack Chance']+=(8*Math.floor(set/2));
          break;
        case 17:/*'Torrent'*/
          stat[5]-=(10*Math.floor(set/2));//Also increases dmg dealt by 10%...
          break;
      }//All other gear sets have unique battle effects that don't adjust main stats.
    })
    Object.keys(char.gear_stats).forEach((key,index)=>{
      switch(index){
        case 0:
        case 1:
        case 2:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          char.gear_stats[key]=Math.round(stat[index]+(stat[index]*stat[index+3]/100));
          break;
        default:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          char.gear_stats[key]=stat[index+3];
      }
    })
    return char;
  }
}