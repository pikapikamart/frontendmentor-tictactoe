import { memo } from "react"
import { Room } from "@/store/tracked";
import { FlexAlignEnd } from "@/styled/shared/helpers";
import { PasswordCheckbox } from "../createRoom.styled";
import { TextInput } from "../../form.styled";


interface PasswordProps {
  roomInformation: Room,
  setRoomInformation: React.Dispatch<React.SetStateAction<Room>>
}

const Password = ({ roomInformation, setRoomInformation }: PasswordProps) =>{

  const handleChangeRoomPrivate = () =>{
    setRoomInformation(prev => ({
      ...prev,
      isPrivate: !prev.isPrivate,
      password: !prev.isPrivate? prev.password : ""
    }))
  }

  return (
    <>
      <FlexAlignEnd>
        <label
          htmlFor="room-create-password"
          id="room-password">
            Password
        </label>
        <PasswordCheckbox
          id="room-create-password"
          type="checkbox"
          checked={ roomInformation.isPrivate }
          onChange={ handleChangeRoomPrivate }/>
      </FlexAlignEnd>
      <TextInput
        type="text"
        value={ roomInformation.password }
        disabled={ !roomInformation.isPrivate }
        aria-labelledby="room-password"
        onChange={ event => setRoomInformation(prev => ({ ...prev, password: event.target.value })) }/>
    </>
  );
}


export default memo(Password);