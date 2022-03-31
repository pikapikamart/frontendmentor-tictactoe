import { 
  PlayerBanner,
  Options} from "./modal.styled";
import { BaseModal } from "./";
import { 
  SilverButton,
  YellowButton } from "@/styled/shared/buttons";
import { useTrapFocus } from "@/lib/hooks";
  

interface RestartProps {
  handleRestartBoard: () => void,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Restart = ({ handleRestartBoard, setShowModal }: RestartProps) =>{
  const [ firstControl, lastControl, registerTrap ] = useTrapFocus<HTMLButtonElement, HTMLButtonElement>();

  return (
    <BaseModal delay={0}>
      <div
        onKeyDown={event => registerTrap(event, 0)}>
        <PlayerBanner as="p">
          restart game?
        </PlayerBanner>
        <Options>
          <SilverButton 
            onClick={() => setShowModal(false)}
            ref={firstControl}>no, cancel
          </SilverButton>
          <YellowButton 
            onClick={handleRestartBoard}
            ref={lastControl}>yes, restart
          </YellowButton>
        </Options>
      </div>
    </BaseModal>
  );
}


export default Restart;