import React, { 
  useState,
  useEffect,
  useRef } from "react";
import Link from "next/link";
import { 
  Wrapper,
  PlayerTurn,
  ResetButton } from "./header.styled"
import { useDispatch } from "@/store/tracked";
import { SrOnly } from "@/styled/shared/helpers";
import { GameRestartModal } from "../modal";
import { AnimatePresence } from "framer-motion";
import { useCurrentGame } from "@/lib/hooks";


const Header = () =>{
  const dispatch = useDispatch();
  const [ showModal, setShowModal ] = useState(false);
  const { gameMode, currentGame } = useCurrentGame();
  const liveRegion = useRef<HTMLParagraphElement | null>(null);

  const handleRestartBoard = () =>{
    dispatch({ type: "RESTART_BOARD" });
    setShowModal(false);

    if ( liveRegion.current ) {
      liveRegion.current.textContent = "Board resetted."
    }
  }

  useEffect(() =>{
    const timeout = setTimeout(() =>{
      if ( !showModal && liveRegion.current?.textContent==="Board resetted." ) {
        liveRegion.current.textContent = "";
      }
    }, 1000)

    return () => clearTimeout(timeout);
  }, [ showModal ])
  
  return (
    <Wrapper>
      <Link href="/">
        <a>
          <SrOnly>Homepage</SrOnly>
          <img src="/assets/logo.svg" alt="tic tac toe" />
        </a>
      </Link>
      <PlayerTurn>
        {currentGame?.currentPlayer==="X"?
        <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fillRule="evenodd"/></svg>:
        <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>}
        <p> 
          <SrOnly>{currentGame?.currentPlayer && currentGame?.currentPlayer}</SrOnly>
          turn
        </p>
        </PlayerTurn>
      { gameMode!=="online" && <>
        <ResetButton 
          type="button"
          onClick={() => setShowModal(true)}>
          <SrOnly>reset board</SrOnly>
        </ResetButton>
        <AnimatePresence exitBeforeEnter>
          { showModal && <GameRestartModal setShowModal={setShowModal} handleRestartBoard={handleRestartBoard} />}
        </AnimatePresence>
        <SrOnly 
          as="p"
          aria-live="polite"
          ref={liveRegion} />
      </> }
      
    </Wrapper>
  );
}


export default Header;