import { useTrackedState } from "@/store/tracked";
import React, { 
  useRef,
  useState,
  useEffect,
  MutableRefObject
} from "react";

interface RegisterTrap {
  (event : React.KeyboardEvent<HTMLElement>, width: number) : void
}

export type Control<Type> =  MutableRefObject<Type | null>;

export function useTrapFocus<F extends HTMLElement, L extends HTMLElement>(): [Control<F>, Control<L>, RegisterTrap]  {
  const firstControl = useRef<F | null>(null);
  const lastControl = useRef<L | null>(null);
  const [ controlTrapWidth, setControlTrapWidth ] = useState(0);
  const [ shouldTrap, setShouldTrap ] = useState(false);

  const registerTrap = ( event: React.KeyboardEvent<HTMLElement>, width: number = 0) =>{

    if ( width ) {
      setControlTrapWidth(width);
    }
    
    if ( !shouldTrap && controlTrapWidth ) {
      return;
    }

    if ( !firstControl.current || !lastControl.current ) {
      return;
    }

    if ( document.activeElement===firstControl.current && event.shiftKey && event.key==="Tab") {
      event.preventDefault();
      lastControl.current.focus();
    }

    else if ( document.activeElement===lastControl.current && !event.shiftKey && event.key==="Tab") {
      event.preventDefault();
      firstControl.current.focus();
    }
  }

  const handleChangeWidth = () =>{
    if ( window.innerWidth < controlTrapWidth ) {
      setShouldTrap(true);
    }

    else if ( window.innerWidth >= controlTrapWidth ) {
      setShouldTrap(false)
    }
  }
  
  useEffect(() =>{
    if ( controlTrapWidth ) {
      const handleWidthResize = () =>{
        handleChangeWidth();
      }
      handleChangeWidth();
      window.addEventListener("resize", handleWidthResize);
    }

  }, [ controlTrapWidth ])

  useEffect(() =>{
    
    const widthTimeout = setTimeout( () =>{
      if ( controlTrapWidth ) {
        handleChangeWidth();
      }
    }, 100)

    return () => clearTimeout(widthTimeout);
  }, [])


  return [ firstControl, lastControl, registerTrap ];
}

export function useArrowKeys<E extends HTMLElement>( boundary: number ) {
  const components = useRef<E[]>([]);
  const currentIndex = useRef(0);

  const registerArrow = ( event: React.KeyboardEvent<HTMLElement>) =>{
    const { key } = event;
    const index = currentIndex.current;

    switch(key) {
      case "ArrowUp":
        event.preventDefault();
        currentIndex.current = index-3 >= 0? index-3 : index;
        break;
      case "ArrowRight":
        currentIndex.current = ![2, 5, 8].includes(index) && index+1 <= 9? index+1 : index;
        break;
      case "ArrowDown":
        event.preventDefault();
        currentIndex.current = index+3 <= 8? index+3 : index;
        break;
      case "ArrowLeft":
        currentIndex.current = ![0, 3, 6].includes(index) && index-1 >= 0? index-1 : index;
        break;
      case "Home":
        currentIndex.current = 0;
        break;
      case "End":
        currentIndex.current = 8;
        break;
      default:
        break;
    }
    
    if ( index !== currentIndex.current ) {
      components.current[currentIndex.current].focus();
    }
  }

  return {
    components,
    currentIndex,
    registerArrow
  }
} 

export const useCurrentGame = () =>{
  const { gameMode, cpu, local, online } = useTrackedState();
  const currentGame = gameMode==="cpu"? cpu : gameMode==="local"? local : online?.onGoingGame?.game;

  return { 
    gameMode, 
    currentGame,
    cpu,
    local,
    online };
}