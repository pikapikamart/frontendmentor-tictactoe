import { 
  useEffect,
  useRef } from "react";
  import { useDispatch } from "@/store/tracked";
import { Wrapper } from "./game.styled";
import { PlayGame } from "./AiLogic";
import { GameHeader } from "./header";
import { GameTiles } from "./tiles";
import { GameResultModal } from "./modal";
import { GameFooter } from "./footer";
import { SrOnly } from "@/styled/shared/helpers";
import { exitDown } from "motion/variants";
import { AnimatePresence } from "framer-motion";
import { fullBoard } from "@/components/utils/functions";
import { useCurrentGame } from "@/lib/hooks";


const Game = () =>{
  const dispatch = useDispatch();
  const { gameMode, currentGame, cpu } = useCurrentGame();
  const mainRef = useRef<HTMLElement | null>(null);
  const cpuMove = useRef<number | null>(null);

  // Make CPU move
  useEffect(() =>{
    if ( gameMode==="cpu" && cpu.globalPlayer !== cpu.currentPlayer ) {
      const CPUMove = setTimeout(() =>{
        const AIResult = PlayGame(Array.from(cpu.board), cpu.currentPlayer);
  
        if ( AIResult && AIResult.move!==null ) {
          cpuMove.current = AIResult.move;
          dispatch({ type: "ADD_MOVE", index: AIResult.move, player: cpu.currentPlayer});
        }
      }, 1500);

      return () => clearTimeout(CPUMove);
    }
  }, [ cpu.currentPlayer, dispatch, cpu.board, cpu.globalPlayer, gameMode ])

  return (
    <Wrapper 
      tabIndex={-1}
      ref={mainRef}
      variants={exitDown}
      initial="hidden"
      animate="visible"
      exit="hidden">
      <SrOnly as="h1">Frontend mentor tic tac toe game</SrOnly>
      <GameHeader />
      <AnimatePresence exitBeforeEnter>
        { gameMode==="cpu" && (fullBoard(currentGame?.board) || currentGame?.winner.player) && <GameResultModal />}
        { gameMode==="local" && (fullBoard(currentGame?.board) || currentGame?.winner.player) && <GameResultModal />}
        { gameMode==="online" && (fullBoard(currentGame?.board) || currentGame?.winner.player) && <GameResultModal />}
      </AnimatePresence>
      <GameTiles cpuMove={cpuMove.current} />
      <GameFooter />
    </Wrapper>
  );  
}


export default Game;