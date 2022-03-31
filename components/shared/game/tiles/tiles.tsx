import { 
  useState,
  useEffect,
  useRef } from "react";
import { 
  useDispatch,
  useTrackedState } from "@/store/tracked";
import { 
  Wrapper,
  Row,
  CollumnCell } from "./tiles.styled";
import { SrOnly } from "@/styled/shared/helpers";
import { Nux } from "./nux";
import { 
  useArrowKeys, 
  useCurrentGame } from "@/lib/hooks";
import { EVENTS } from "@/store/tracked/socket/events";


interface TilesProps {
  cpuMove: number | null
}

const Tiles = ({ cpuMove }: TilesProps) =>{
  const [ showNux, setShowNux ] = useState(false);
  const [ showNuxOnce, setShowNuxOne ] = useState(false);
  const moveLiveRegion = useRef<HTMLParagraphElement | null>(null);
  const mouseDown = useRef(false);
  const { tutorial, cpu, online } = useTrackedState();
  const dispatch = useDispatch();
  const { gameMode, currentGame } = useCurrentGame();
  const { components, currentIndex, registerArrow} = useArrowKeys<HTMLDivElement>(3);

  const handleAddMove = ( index: number) =>{
    currentIndex.current = index;

    if ( !currentGame ) return;
  
    switch(gameMode) {
      case "cpu":
        if ( currentGame.globalPlayer!==currentGame.currentPlayer || currentGame.winner.player || currentGame.board[index]) return;
        
        dispatch({ type: "ADD_MOVE", index, player: currentGame.globalPlayer});
        
        if ( moveLiveRegion.current ) {
          moveLiveRegion.current.textContent = `Placed ${currentGame.globalPlayer} at row ${Math.floor(index/3+1)} collumn ${index%3+1}.`;
        }

        break;
      case "local":
        if ( currentGame.winner.player || currentGame.board[index]) return;

        dispatch({ type: "ADD_MOVE", index, player: currentGame.currentPlayer });

        if ( moveLiveRegion.current ) {
          const player = `Player ${currentGame.globalPlayer===currentGame.currentPlayer? 1 : 2}`;
          moveLiveRegion.current.textContent = `${player} placed ${currentGame.currentPlayer} at row ${Math.floor(index/3+1)} collumn ${index%3+1}.`;
        }

        break;
      case "online":
        if ( currentGame.globalPlayer!==currentGame?.currentPlayer || currentGame.board[index] ) return;

        dispatch({ type: "ADD_MOVE", index, player: currentGame.globalPlayer });

        if ( moveLiveRegion.current ) {
          moveLiveRegion.current.textContent = `Placed ${currentGame.globalPlayer} at row ${Math.floor(index/3+1)} collumn ${index%3+1}.`;
        }
        
        const onlineMove = {
          move: index,
          player: currentGame.globalPlayer,
          roomId: online?.onGoingGame?.roomId
        }

        online?.socket.emit(EVENTS.CLIENT.GAME_ADD_MOVE, onlineMove);

        break;
    }
  }

  const handleGridCellKeydown = ( event: React.KeyboardEvent<HTMLDivElement>, itemIndex: number) =>{
    if ( event.code==="Space" || event.code==="Enter") {
      event.preventDefault();
      handleAddMove(itemIndex);
    }
  }

  const renderTiles = () =>{
    if ( !currentGame ) return;

    const boardMatrix = [0, 3, 6].map((tile, _) => currentGame.board.slice(tile, tile+3));
    const tiles = boardMatrix.map(( row, rowIndex ) =>(
      <Row 
        key={rowIndex} 
        id="index" 
        role="row">
        {row.map(( tile, tileIndex: number ) =>{
          const itemIndex = rowIndex*3 + tileIndex;

          return (
            <CollumnCell 
              key={tileIndex}
              role="gridcell"
              className={ currentGame.winner.indexes?.includes(itemIndex)? `win ${currentGame.currentPlayer}` : tile? "occupied" : ""}
              tabIndex={currentIndex.current===itemIndex? 0 : -1}
              onClick={() => handleAddMove(itemIndex)}
              onKeyDown={event => handleGridCellKeydown(event, itemIndex)}
              onMouseDown={() => mouseDown.current = true}
              onMouseUp={() => mouseDown.current = false}
              ref={ref => ref && components.current?.push(ref)}
              waveDelay={currentGame.winner.indexes?.includes(itemIndex)? .15*(tileIndex+1) : 0}
              gameStatus={{
                player: gameMode==="local"? currentGame.currentPlayer : currentGame.globalPlayer,
                winPlayer: currentGame.winner.player }}>
              { !tile? "" : tile==="X"? 
                <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fillRule="evenodd"/></svg>:
                <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>}
              { tile && (
                <SrOnly>Occupied by  
                  {gameMode==="cpu"? tile==="X"? ` X` : ` CPU`: null}
                  {gameMode==="local"? ` ${tile}`: null}
                </SrOnly>) }
            </CollumnCell>
          )
        })}
      </Row>
    ));

    return tiles;
  }

  const handleShowNux = () =>{
    if ( !mouseDown.current && tutorial ) {
      setShowNux(true);
      dispatch({ type: "TUTORIAL_OFF" });
    }
  }

  useEffect(() =>{
    if ( showNuxOnce ) {
      components.current[currentIndex.current].focus();
    }
  },[ showNuxOnce ])

  useEffect(() =>{
    if ( gameMode==="cpu" && typeof cpuMove==="number" && moveLiveRegion.current ) {
      moveLiveRegion.current.textContent = `CPU placed ${cpu.globalPlayer==="X"? "O": "X"} at row ${Math.floor(cpuMove/3+1)} column ${cpuMove%3+1}.`;
    }
  }, [ cpuMove ])

  useEffect(() =>{
    if ( !online?.onGoingGame || !moveLiveRegion.current ) return;

    const { opponentMove } = online.onGoingGame;
    const { globalPlayer } = online.onGoingGame.game;

    if ( opponentMove!==-1  ) {
      moveLiveRegion.current.textContent = `Opponent placed ${ globalPlayer==="X"? "O": "X" } at row ${Math.floor(opponentMove/3+1)} column ${opponentMove%3+1}.`;
    }
  }, [ online?.onGoingGame?.opponentMove ])

  return (
    <>
      <SrOnly
        as="h2"
        id="grid-moves" >tic tac toe grid moves
      </SrOnly>
      <p 
        className="sr-only"
        aria-live="polite"
        ref={moveLiveRegion}
        data-testid="move-region" />
      <Wrapper 
        role="grid"
        aria-labelledby="grid-moves"
        onFocus={handleShowNux}
        onKeyDown={registerArrow}>
        { renderTiles() }
        { showNux && <Nux setShowNux={ setShowNux } setShowNuxOnce={ setShowNuxOne } />}
      </Wrapper>
    </>
  );
}


export default Tiles;