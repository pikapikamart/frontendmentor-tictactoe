import { useTrackedState } from "@/store/tracked"
import { EVENTS } from "@/store/tracked/socket/events"
import { MainButton } from "@/styled/shared/buttons"
import { BaseForm } from ".."
import { FormHeading, GridFormCenter } from "../form.styled"


const RoomRequest = () =>{
  const { online } = useTrackedState();

  return (
    <BaseForm>
      <GridFormCenter
        onSubmit={ event => event.preventDefault() }>
        <FormHeading>A player has joined the room</FormHeading>
        <MainButton
          type="submit"
          onClick={ () => online?.socket.emit(EVENTS.CLIENT.START_GAME, true, online.createdRoom?.roomId) }>Start Game</MainButton>
      </GridFormCenter>
    </BaseForm>
  );
}


export default RoomRequest;