import { Room as RoomShape } from "@/store/tracked";
import { 
  Room as RoomWrapper,
  RoomId,
  RoomIconsContainer } from "../rooms.styled"; 


interface RoomProps {
  owned: boolean,
  type: any,
  room?: RoomShape,
  children: React.ReactNode
}

const Room = ({ room, owned, type, children }: RoomProps) => {
  
  return (
    <RoomWrapper 
      as={ type }
      owned={ owned }>
      <RoomId>
        <span>#</span>
        { room?.roomId }
      </RoomId>
      <p>{ room?.roomTitle }</p>
      <RoomIconsContainer>
        { children }
      </RoomIconsContainer>
    </RoomWrapper>
  );
}


export default Room;