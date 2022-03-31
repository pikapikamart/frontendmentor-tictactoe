import { 
  useState,
  useEffect } from "react";
import { Game } from "@/components/shared/game";
import { PlayerMarkModal } from "@/components/shared/game/modal";


const OnlineGame = () =>{
  const [ showMark, setShowMark ] = useState(true);

  useEffect(() =>{
    const timeOut = setTimeout(() => setShowMark(false), 3000);

    return () => clearTimeout(timeOut);
  }, [])

  return (
    <>
      { showMark && <PlayerMarkModal /> }
      <Game />
    </>
  );
}


export default OnlineGame;