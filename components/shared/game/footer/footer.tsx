import { 
  Wrapper,
  Score } from "./footer.styled";
import { useCurrentGame } from "@/lib/hooks";


const Footer = () =>{
  const { gameMode, currentGame } = useCurrentGame();

  return (
    <Wrapper>
      <Score>
        <p>X
          { gameMode==="cpu"? currentGame?.globalPlayer==="X"? "(you)" : "(cpu)" : null }
          { gameMode==="local"? currentGame?.globalPlayer==="X"? "(P1)" : "(P2)" : null }
          { gameMode==="online"? currentGame?.globalPlayer==="X"? "(you)" : "(enemy)" : null }
        </p>
        {currentGame?.scores.x}
      </Score>
      <Score>
        <p>ties</p>
        {currentGame?.scores.ties}
      </Score>
      <Score>
        <p>O
          {gameMode==="cpu"? currentGame?.globalPlayer==="O"? "(you)" : "(cpu)" : null}
          {gameMode==="local"? currentGame?.globalPlayer==="O"? "(P1)" : "(P2)" : null}
          {gameMode==="online"? currentGame?.globalPlayer==="O"? "(you)" : "(enemy)" : null}
        </p>
        {currentGame?.scores.o}
      </Score>
    </Wrapper>
  );
}


export default Footer;
