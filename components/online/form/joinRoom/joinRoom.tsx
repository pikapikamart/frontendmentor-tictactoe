import React, { 
  useState,
  useEffect } from "react";
import { 
  useTrackedState,
  useDispatch,
  Room } from "@/store/tracked";
import { useTrapFocus } from "@/lib/hooks";
import { EVENTS } from "@/store/tracked/socket/events"; 
import { BaseForm } from "../";
import {
  InputContainer, 
  InputError,
  TextInput,
  GridFormCenter,
  FormHeading,
  FormButtonContainer } from "../form.styled";
import { MainButton } from "@/styled/shared/buttons";


interface JoinRoomProps {
  selectedRoom: Room,
  setSelectedRoom: React.Dispatch<React.SetStateAction<Room | null>>
}

type RoomInformation = {
  roomId: number,
  password?: string
}

const JoinRoom = ({ selectedRoom, setSelectedRoom }: JoinRoomProps) =>{
  const [ roomPassword, setRoomPassword ] = useState("");
  const { online } = useTrackedState();
  const dispatch = useDispatch();
  const [ firstControl, lastControl, registerTrap ] = useTrapFocus<HTMLButtonElement | HTMLInputElement, HTMLButtonElement>();

  const handleJoinRequest = ( event: React.FormEvent ) =>{
    event.preventDefault();
    const roomInformation: RoomInformation = { roomId: selectedRoom.roomId };

    if ( selectedRoom.isPrivate ) {
      roomInformation.password = roomPassword;
    }
    
    online?.socket.emit(EVENTS.CLIENT.JOIN_ROOM, roomInformation);
  }

  useEffect(() =>{
    if ( online?.joinRequest.success ) {
      setSelectedRoom(null);
    }
  }, [ online?.joinRequest ])

  useEffect(() =>{
    dispatch({ type: "ONLINE_JOIN_REQUEST", success: false, message: "" });
  }, [])

  return (
    <BaseForm>
      <GridFormCenter
        onSubmit={ handleJoinRequest } 
        onKeyDown={ event => registerTrap(event, 0) }>
        <FormHeading> Join room #{ selectedRoom.roomId }</FormHeading>
        { selectedRoom.isPrivate && (
          <InputContainer>
            <label htmlFor="join-room">Enter password</label>
            <TextInput
              type="text"
              id="join-room"
              value={ roomPassword }
              aria-invalid={ `${ online?.joinRequest.message && !online?.joinRequest.success? "true" : "false"}` }
              aria-describedby="join-error"
              autoComplete="off"
              onChange={ event => setRoomPassword(event.target.value) }
              ref={ el => firstControl.current = el } />
              <InputError 
                id="join-error"
                aria-live="polite">{ online?.joinRequest.message }
              </InputError>
          </InputContainer>
        ) }
        { !selectedRoom.isPrivate && (
          <InputError 
            id="join-error"
            aria-live="polite">{ !online?.joinRequest.success? online?.joinRequest.message : "" }
          </InputError>
        ) }
        <FormButtonContainer>
          <MainButton
            type="submit"
            colorMode="blue"
            ref={ el => !selectedRoom.isPrivate? firstControl.current = el : null }>Join
          </MainButton>
          <MainButton
            type="button"
            colorMode="red"
            onClick={ () => setSelectedRoom(null) }
            ref={ lastControl }>Cancel
          </MainButton>
        </FormButtonContainer>
      </GridFormCenter>
    </BaseForm>
  );
}


export default JoinRoom;