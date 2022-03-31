import { 
  useState,
  useEffect,
  useRef } from "react";
import { 
  useTrackedState,
  useDispatch,
  Room } from "@/store/tracked";
import { 
  Wrapper,
  RoomsContainer,
  RoomsList,
  RoomError,
  RoomEnterButton } from "./rooms.styled";
import { SrOnly } from "@/styled/shared/helpers";
import { JoinRoomForm } from "../form";
import { SingleRoom } from "./room";
import { AnimatePresence } from "framer-motion";


const Rooms = () =>{
  const [ selectedRoom, setSelectedRoom ] = useState<Room | null>(null);
  const [ showRoomError, setShowRoomError ] = useState(false);
  const roomErrorRef = useRef<HTMLParagraphElement | null>(null);
  const { online } = useTrackedState();
  const dispatch = useDispatch();
  
  const handleRoomSelection = ( room: Room ) =>{
    if ( online?.createdRoom && roomErrorRef.current ) {
      setShowRoomError(true);
      roomErrorRef.current.textContent = "Cancel room first!";
    } else {
      setSelectedRoom(room);
      dispatch({ type:"ONLINE_JOIN_REQUEST", success: false, message: "" });
    }
  }

  useEffect(() =>{
    if ( showRoomError ) {
      const timeout = setTimeout(() => {
        setShowRoomError(false);
        if ( roomErrorRef.current ) {
          roomErrorRef.current.textContent = "";
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [ showRoomError ])

  const renderAvailableRooms = () =>{
    if ( !online ) return;

    const { rooms } = online;
    const availableRooms = rooms.map( room => (
      <SingleRoom
        key={ room.roomId }
        owned={ false }
        type={ "li" }
        room={ room }>
        { room.isPrivate && <img src="/assets/icon-lock-blue.svg" alt="" aria-hidden />}
        <RoomEnterButton onClick={ () => handleRoomSelection(room) }>
          <img src="/assets/icon-arrow-right.svg" alt="" aria-hidden />
          <SrOnly>Join room { room.roomId }. { room.isPrivate? "Need password" : "" }</SrOnly>
        </RoomEnterButton>
      </SingleRoom>
    ))

    return availableRooms;
  }

  return (
    <Wrapper>
      <RoomsContainer >
        { online?.createdRoom && <>
          <SrOnly as="h2">Your created room</SrOnly>
          <SingleRoom
            room={ online.createdRoom }
            owned={ true }
            type={ "div" }>
            { online.createdRoom.isPrivate && <img src="/assets/icon-lock-white.svg" alt="" aria-hidden />}
            <RoomError
              aria-live="polite" 
              showError={ showRoomError }
              ref={ roomErrorRef } />
            <img src="/assets/icon-arrow-right.svg" alt="" aria-hidden />
          </SingleRoom>
        </>
        }
        <AnimatePresence exitBeforeEnter>
          { selectedRoom && <JoinRoomForm selectedRoom={ selectedRoom } setSelectedRoom={ setSelectedRoom }/> }
        </AnimatePresence>
        <RoomsList empty={online?.rooms?.length? false : true}>
          { renderAvailableRooms() }
        </RoomsList>
      </RoomsContainer>
    </Wrapper>
  );
}


export default Rooms;