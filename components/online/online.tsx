import {  
  useState,
  useEffect } from "react";
import Link from "next/link";
import { 
  useTrackedState,
  useDispatch,
  JoinRequest,
  Player,
  Room } from "@/store/tracked";
import { EVENTS } from "@/store/tracked/socket/events";
import { 
  Wrapper,
  BackLink,
  Heading1,
  HeadingExtra } from "./online.styled";
import { Rooms } from "./rooms";
import { 
  FlexBetween, 
  SrOnly } from "@/styled/shared/helpers";
import { MainButton } from "@/styled/shared/buttons";
import { 
  CreateRoomForm, 
  RoomRequestForm } from "./form";
import { OnlineGame } from "./game";
import { FormHeading } from "./form/form.styled";
import { BaseModal } from "../shared/game/modal";
import { AnimatePresence } from "framer-motion";
import { exitDown } from "@/motion/variants";


interface InitialOnlineGameState {
  ownerMark: Player,
  joinerMark: Player,
  roomId: number
}

interface RoomRequest {
  requested: boolean,
  message: string
}

const Online = () =>{
  const [ showCreateRoom, setShowCreateRoom ] = useState(false);
  const [ showRoomRequest, setShowRoomRequest ] = useState<RoomRequest>({
    requested: false,
    message: ""
  });
  const [ showPlayerExit, setShowPlayerExit ] = useState(false);
  const { online } = useTrackedState();
  const dispatch = useDispatch();

  useEffect(() =>{
    if ( online ) {
      const requestCancellation = ( message: string ) =>{
        setShowRoomRequest({
          requested: false,
          message
        });
        setShowPlayerExit(true);
        dispatch({ type: "ONLINE_JOIN_REQUEST", success: false, message: "" });
      }

      online.socket.on(EVENTS.SERVER.AVAILABLE_ROOMS, ( rooms: Room[] ) => dispatch({ type: "ONLINE_AVAILABLE_ROOMS", rooms }))
      
      online.socket.on(EVENTS.SERVER.JOIN_REQUEST, ( { success, message, exited }: JoinRequest ) => (
        exited? requestCancellation("Room owner has removed the room.") : dispatch({ type: "ONLINE_JOIN_REQUEST", success, message })
      ))

      online.socket.on(EVENTS.SERVER.ROOM_REQUEST, ( requested: boolean, exited?: boolean ) => {
        exited? requestCancellation("Room joiner has left the server.") : setShowRoomRequest(prev => ({ ...prev, requested }))
      })

      online.socket.on(EVENTS.SERVER.GAME_START, ( initialState: InitialOnlineGameState) => {
        dispatch({ 
          type: "ONLINE_GAME_START", 
          joiner: initialState.joinerMark,
          owner: initialState.ownerMark, 
          roomId: initialState.roomId 
        });
        setShowRoomRequest(prev => ({
          ...prev,
          requested: false
        }));
      })

      online.socket.on(EVENTS.SERVER.GAME_RECEIVE_MOVE, ( move: number, player: Player ) => dispatch({ type: "ADD_MOVE", player, index: move }))

      online.socket.on(EVENTS.SERVER.GAME_START_NEXT_ROUND, () => dispatch({ type: "NEXT_ROUND" }))

      online.socket.on(EVENTS.SERVER.GAME_PLAYER_EXIT, () => {
        dispatch({ type: "ONLINE_EXIT_ONGOING_GAME" });
        dispatch({ type: "ONLINE_JOIN_REQUEST", success: false, message: "" });
        dispatch({ type: "ONLINE_CANCEL_ROOM" });
        setShowPlayerExit(true);
      });

      online.socket.emit(EVENTS.CLIENT.SERVE_ROOMS);
    }
  }, [ ])

  useEffect(() =>{
    if ( showPlayerExit ) {
      const timeout = setTimeout(() => {
        setShowPlayerExit(false);
        setShowRoomRequest(prev => ({
          ...prev,
          message: ""
        }));
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [ showPlayerExit ])

  return (
    <>
    { showPlayerExit && (
      <BaseModal>
        <FormHeading>{ showRoomRequest.message? showRoomRequest.message : "Your opponent has left the room." }</FormHeading>
      </BaseModal>
    ) }
    { !online?.onGoingGame && (
      <Wrapper
        variants={ exitDown }
        initial="hidden"
        animate="visible"
        exit="hidden">
        <Link href="/" passHref>
          <BackLink>
            <img src="/assets/icon-arrow.svg" alt="" aria-hidden/>
            go back
          </BackLink>
        </Link>
        <FlexBetween align="flex-end">
          <div>
            <Heading1>Game Rooms</Heading1>
            <HeadingExtra>Come and play against online players.</HeadingExtra>
          </div>
          { !online?.createdRoom ? 
            <MainButton
              aria-expanded={ showCreateRoom } 
              type="button"
              onClick={ () => setShowCreateRoom(true) }>Create room
            </MainButton> :
            <MainButton
              type="button"
              onClick={ () => dispatch({ type: "ONLINE_CANCEL_ROOM" }) }
              colorMode="red">Cancel room
            </MainButton>
          }
           <SrOnly aria-live="polite">
            { online?.createdRoom? "room has been created" : "room has been cancelled" }
           </SrOnly>
        </FlexBetween>
        <AnimatePresence exitBeforeEnter>
          { showCreateRoom && <CreateRoomForm setShowCreateRoom={ setShowCreateRoom } />}
          { showRoomRequest.requested && <RoomRequestForm /> }
        </AnimatePresence>
        <Rooms />
        { online?.joinRequest.success && (
          <BaseModal minHeight="initial">
            <FormHeading>Waiting for room owner to start.</FormHeading>
            <img src="/assets/logo.svg" alt="tic tac toe" />
          </BaseModal>
        ) }
      </Wrapper>
    ) }
    { online?.onGoingGame && <OnlineGame /> }
    </>
  );
}


export default Online;