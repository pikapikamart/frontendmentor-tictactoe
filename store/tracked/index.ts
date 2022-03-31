import { Dispatch, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { createContainer } from "react-tracked";
import { CheckWinner } from "@/components/shared/game/AiLogic";
import { fullBoard } from "@/components/utils/functions";
import { EVENTS } from "./socket/events";
import io, { Socket } from "socket.io-client";


export const storageKey = "femtactoe";

export type Player = "X" | "O";

export type GameMode = "cpu" | "local" | "online" | null;

export type ModeState = {
  board: string[],
  globalPlayer: Player,
  currentPlayer: Player,
  scores: {
    [key: string]: number,
    x: number,
    ties: number,
    o: number
  },
  winner: {
    player: Player | null,
    indexes: number[] | null
  }
}

export type JoinRequest = {
  success: boolean,
  message: string,
  exited?: boolean
}

export type Room = {
  roomId: number,
  roomTitle: string,
  isPrivate: boolean,
  isActive: boolean,
  password?: string
}

type Online = {
  socket: Socket,
  rooms: Room[],
  joinRequest: JoinRequest,
  createdRoom?: Room,
  onGoingGame?: {
    game: ModeState,
    roomId: number,
    opponentMove: number
  }
}

type Game = {
  [key: string] : any,
  gameMode: GameMode | null,
  cpu: ModeState,
  local: ModeState,
  tutorial: boolean
  online?: Online,
}

type Action = 
  | { type: "START_GAME", player: Player, mode: GameMode }
  | { type: "ADD_MOVE", player: Player, index: number}
  | { type: "QUIT_GAME" }
  | { type: "RESTART_BOARD" }
  | { type: "QUIT_RESTART"}
  | { type: "NEXT_ROUND" }
  | { type: "TUTORIAL_OFF" }
  | { type: "START_ONLINE_MODE", socket_uri: string }
  | { type: "ONLINE_AVAILABLE_ROOMS", rooms: Room[] }
  | { type: "ONLINE_CREATE_ROOM", room: Room }
  | { type: "ONLINE_CANCEL_ROOM" }
  | { type: "ONLINE_JOIN_REQUEST", success: boolean, message: string }
  | { type: "ONLINE_GAME_START", joiner: Player, owner: Player, roomId: number }
  | { type: "ONLINE_EXIT_ONGOING_GAME" }
  | { type: "ONLINE_EXIT" }

const emptyBoard = () => Array(9).fill("");
const emptyWinner = () => ({ player: null, indexes: null});

const defaultScores = {
  x: 0,
  ties: 0,
  o: 0
}

const defaultModeState: ModeState = {
  board: emptyBoard(),
  globalPlayer: "X",
  currentPlayer: "X",
  scores: defaultScores,
  winner: emptyWinner()
}

export const gameState: Game = {
  gameMode: null,
  cpu: defaultModeState,
  local: defaultModeState,
  tutorial: true
} 

const init = () =>{
  let preloadedState;
  
  try {
    preloadedState = JSON.parse(window.localStorage.getItem(storageKey) || "");
    
  } catch( e ){
    // maybe do something?
    preloadedState = "";
  }

  return preloadedState || gameState;
}

const reducer = ( draft: Game, action: Action ) =>{
  let currentMode: ModeState | undefined;

  switch(action.type) {
    case "START_GAME":

      if ( !action.mode ) return;

      currentMode = action.mode==="cpu"? draft.cpu : draft.local;
      draft.gameMode = action.mode;

      // just resume the game
      if ( !fullBoard(currentMode.board) && action.player===currentMode.globalPlayer ) return;

      if ( action.mode==="cpu" && action.player!==draft.cpu.globalPlayer ) {
        [draft.cpu.scores.x, draft.cpu.scores.o] = [draft.cpu.scores.o, draft.cpu.scores.x];
      }

      else if ( action.mode==="local" && action.player!==draft.local.globalPlayer ) {
        draft.local.scores = defaultScores;
      }

      currentMode.board = emptyBoard();
      currentMode.globalPlayer = action.player;
      currentMode.currentPlayer = "X";

      return;
    case "ADD_MOVE":
      currentMode = draft.gameMode==="cpu"? draft.cpu : draft.gameMode==="local"? draft.local : draft.online?.onGoingGame?.game;

      if ( !currentMode ) return;

      if ( draft.gameMode==="online" && draft.online?.onGoingGame && currentMode.globalPlayer!==currentMode.currentPlayer ) {
        draft.online.onGoingGame.opponentMove = action.index;
      }

      const board = Array.from(currentMode.board);
      board[action.index] = action.player;
      const gameResult = CheckWinner(board, action.index);

      if ( gameResult.win ) {
        currentMode.winner = {
          player: action.player,
          indexes: gameResult.indexes
        }
        currentMode.scores[action.player.toLowerCase()]++;
      }

      if ( fullBoard(board) && !gameResult.win ) {
        currentMode.scores.ties++;
      }

      currentMode.board = board;
      currentMode.currentPlayer = currentMode.currentPlayer==="X"? "O" : "X";

      return;
    case "QUIT_GAME":
    case "NEXT_ROUND":
      currentMode = draft.gameMode==="cpu"? draft.cpu : draft.gameMode==="local"? draft.local : draft.online?.onGoingGame?.game;

      if ( !currentMode ) return;

      currentMode.winner = emptyWinner();
    case "RESTART_BOARD": 
      currentMode = draft.gameMode==="cpu"? draft.cpu : draft.gameMode==="local"? draft.local : draft.online?.onGoingGame?.game;

      if ( !currentMode ) return;

      currentMode.currentPlayer = "X";
      currentMode.board = emptyBoard();

      return;
    case "TUTORIAL_OFF":
      draft.tutorial = false;

      return;
    case "START_ONLINE_MODE":
      let socket = draft.online?.socket;
      
      if( !socket ) {
        socket = io(action.socket_uri);

      }
      const initialOnlineState: Online = {
        socket,
        rooms: [],
        joinRequest: {
          success: false,
          message: ""
        }
      }
      draft.gameMode = "online";
      draft.online = initialOnlineState;

      return;
    case "ONLINE_AVAILABLE_ROOMS":
      if ( !draft.online ) return;

      if ( draft.online.createdRoom ) {
        const { roomId } = draft.online.createdRoom;
        draft.online.rooms = action.rooms.filter(room => room.roomId!==roomId);
      } 
      
      else {
        draft.online.rooms = action.rooms;
      }

      return;
    case "ONLINE_CREATE_ROOM":
      if ( !draft.online ) return;

      draft.online.createdRoom = action.room;
      draft.online.socket.emit(EVENTS.CLIENT.CREATE_ROOM, action.room);
      
      return;
    case "ONLINE_CANCEL_ROOM": {
      if ( !draft.online ) return;

      const { createdRoom, ...rest } = draft.online;
      draft.online = rest;
      draft.online.socket.emit(EVENTS.CLIENT.CANCEL_ROOM, createdRoom?.roomId);
    }

      return;
    case "ONLINE_JOIN_REQUEST":
      if ( !draft.online ) return;
        draft.online.joinRequest = {
          success: action.success,
          message: action.message
        }

      return;
    case "ONLINE_GAME_START": 
      if ( !draft.online ) return;

      const player = draft.online.createdRoom?.roomId===action.roomId? action.owner : action.joiner;
      draft.online.onGoingGame = {
        game: {
          ...defaultModeState,
          globalPlayer: player
        },
        roomId: action.roomId,
        opponentMove: -1
      };

      return;
    case "ONLINE_EXIT_ONGOING_GAME" :{
      if ( !draft.online ) return;

      const { onGoingGame, ...rest } = draft.online;
      draft.online = rest;
    }

      return;
    case "ONLINE_EXIT": 
      draft.online?.socket.emit(EVENTS.CLIENT.EXIT_ONLINE, draft.online.createdRoom?.roomId?? draft.online.onGoingGame?.roomId);
    
      draft.online?.socket.off();
      return;
    default:
      return draft;  
  }
}

const useValue = (): [ Game, Dispatch<Action> ] => {

  const [ state, dispatch ] = useImmerReducer(reducer, null, init);
  
  useEffect(() => {
    const { online, ...rest } = state as Game;
    window.localStorage.setItem(storageKey, JSON.stringify(rest));
  }, [ state ]);

  return [ state, dispatch ];
};


export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch
} = createContainer(useValue);