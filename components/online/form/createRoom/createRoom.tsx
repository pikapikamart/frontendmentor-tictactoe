import { useState } from "react";
import { 
  useTrackedState,
  useDispatch,
  Room } from "@/store/tracked";
import { useTrapFocus } from "@/lib/hooks";
import { BaseForm } from "../";
import { 
  FormButtonContainer,
  InputContainer } from '../form.styled';
import { defaultRoomTitles } from "../defaults";
import { Listbox } from "./listbox";
import { Password } from "./password";
import { MainButton } from "@/styled/shared/buttons";


interface CreateRoomProps {
  setShowCreateRoom: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateRoom = ({ setShowCreateRoom }: CreateRoomProps) =>{
  const [ roomInformation, setRoomInformation ] = useState<Room>({
    roomId: 0,
    roomTitle: defaultRoomTitles[0],
    isPrivate: false,
    isActive: false,
    password: ""
  });
  const { online } = useTrackedState();
  const dispatch = useDispatch();
  const [ firstControl, lastControl, registerTrap ] = useTrapFocus<HTMLButtonElement, HTMLButtonElement>();

  const handleRoomCreation = ( event: React.FormEvent<HTMLFormElement> ) =>{
    event.preventDefault();

    if ( !roomInformation.roomTitle ) return;
    if ( !roomInformation.isPrivate && roomInformation.password ) return;
    if ( roomInformation.isPrivate && !roomInformation.password ) return;

    let roomId: number = 0;
    let roomIdValidity = false;

    while ( !roomIdValidity ) {
      roomId = Math.floor(Math.random() * 1000);
      roomIdValidity = !online?.rooms.some(room => room.roomId===roomId);
    }
    const { password, ...rest } = roomInformation;
    const createdRoom: Room = roomInformation.isPrivate? roomInformation : rest;
    createdRoom.roomId = roomId;

    dispatch({ type: "ONLINE_CREATE_ROOM", room: createdRoom });
    setShowCreateRoom(false);
  }

  return (
    <BaseForm>
      <form 
        onSubmit={ handleRoomCreation }
        onKeyDown={event => registerTrap(event, 0) }>
        <InputContainer>
          <Listbox 
            firstControl={ firstControl }
            setRoomInformation={ setRoomInformation } />
        </InputContainer>
        <InputContainer>
          <Password 
            roomInformation={ roomInformation }
            setRoomInformation={ setRoomInformation } />
        </InputContainer>
        <FormButtonContainer>
          <MainButton
            type="submit" 
            colorMode="blue">Create Room
          </MainButton>
          <MainButton 
            type="button"
            colorMode="red"
            onClick={ () => setShowCreateRoom(false) }
            ref={ lastControl }>Cancel
          </MainButton>
        </FormButtonContainer>
      </form>
    </BaseForm>
  );
}


export default CreateRoom;