interface PageBGI{
  children?:JSX.Element;
}
export function PageBG(props:PageBGI):JSX.Element{
  const {children} = props;
  return <div className="h-screen w-full bg-gradient-to-t from-bg2 to-bg1" style={{'height':'calc(100vh - 5rem)','overflow':'auto'}}>
    {children}
  </div>
}