import { 
  Wrapper,
  Bold, 
  ButtonClose } from "./nux.styled";
import { SrOnly } from "@/styled/shared/helpers";


interface NuxProps {
  setShowNux: React.Dispatch<React.SetStateAction<boolean>>,
  setShowNuxOnce: React.Dispatch<React.SetStateAction<boolean>>
}

const Nux = ({ setShowNux, setShowNuxOnce }: NuxProps) =>{

  const handleNuxClose = () => {
    setShowNux(false);
    setShowNuxOnce(true);
  };

  return (
    <>
      <SrOnly 
        as="h2"
        id="grid-tutorial">Moving inside the grid tutorial
      </SrOnly>
      <Wrapper 
        tabIndex={0}
        role="region"
        aria-labelledby="grid-tutorial">
        <p>To move inside this component, please use your arrow keys and use either 
          <Bold> space </Bold> or 
          <Bold> enter </Bold> key to place a move. Only unoccupied spots can be toggled.
        </p>
        <p>Pressing 
          <Bold> Home </Bold> key will move to the first tile 
          and pressing 
          <Bold> End </Bold> key moves to the last tile.
        </p>
        <p>Pressing the 
          <Bold> tab </Bold> again will move to the next component. 
        </p>
        <ButtonClose onClick={handleNuxClose}>Close Tutorial</ButtonClose>
      </Wrapper>
    </>
  );
}


export default Nux;