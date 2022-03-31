import { 
  useState,
  useEffect,
  useRef,
  memo } from "react";
import { Room } from "@/store/tracked";
import { Control } from "@/lib//hooks";
import { 
  ListboxButton,
  Listbox as ListboxWrapper } from "../createRoom.styled";
import { defaultRoomTitles } from "../../defaults";


interface ListboxProps {
  firstControl: Control<HTMLButtonElement>,
  setRoomInformation: React.Dispatch<React.SetStateAction<Room>>
}

const Listbox = ({ firstControl, setRoomInformation }: ListboxProps) =>{
  const [ showListbox, setShowListbox ] = useState(false);
  const [ selectedOptionIndex, setSelectedOptionIndex ] = useState(0);
  const listboxButtonRef = useRef<HTMLButtonElement | null>(null);
  const listboxRef = useRef<HTMLUListElement | null>(null);
  const listboxOptionsRef = useRef<HTMLLIElement[]>([]);
  const listboxOptionIndex = useRef(0);

  const handleSelectionCompleted = ( optionIndex: number ) =>{
    if ( !listboxButtonRef.current || !listboxRef.current ) return;

    const element = listboxOptionsRef.current[optionIndex];
    listboxRef.current.setAttribute('aria-activedescendant', element.id);
    listboxButtonRef.current.focus();
    setSelectedOptionIndex(optionIndex);
    setShowListbox(false);
    setRoomInformation(prev =>({
      ...prev,
      roomTitle: element.textContent as string
    }))
  }

  const handleListboxKeyNavigation = ( event: React.KeyboardEvent<HTMLUListElement> ) =>{
    const { key } = event;

    if ( !["ArrowUp", "ArrowDown", "Enter"].includes(key) ) return;

    event.preventDefault();

    const currentIndex = listboxOptionIndex.current;
    listboxOptionsRef.current[currentIndex].classList.remove("selected");

    switch(key) {
      case "ArrowUp":
        listboxOptionIndex.current = currentIndex-1 >= 0? currentIndex-1 : currentIndex;
        break;
      case "ArrowDown":
        listboxOptionIndex.current = currentIndex+1 < listboxOptionsRef.current.length? currentIndex+1 : currentIndex;
        break;
      case "Enter":
        handleSelectionCompleted(currentIndex)
        return;
    }

    const currentElement = listboxOptionsRef.current[listboxOptionIndex.current];
    currentElement.classList.add("selected");
    listboxRef.current?.setAttribute("aria-activedescendant", currentElement.id);
  }

  const addOptionRef = ( element: HTMLLIElement | null ) =>{
    if ( element && !listboxOptionsRef.current.includes(element) ) {
      listboxOptionsRef.current.push(element);
    }
  }

  const renderTitlesSelections = () =>{
    const titles = defaultRoomTitles.map(( title, index ) =>(
      <li 
        key={ index }
        id={ `room-title-${index+1}` }
        role="option"
        aria-selected={ selectedOptionIndex===index }
        onClick= {() => handleSelectionCompleted(index) }
        ref={ addOptionRef }>
          { title }
      </li>
    ))

    return titles;
  }

  const addControlRef = ( element: HTMLButtonElement | null ) =>{
    listboxButtonRef.current = element;
    firstControl.current = element;
  }

  useEffect(() =>{
    if ( showListbox && listboxRef.current ) {
      listboxRef.current.focus();
    }
  }, [ showListbox ])

  return (
    <>
      <p id="room-title-id">Room title</p>
      <ListboxButton
        type="button"
        aria-labelledby="room-title-id"
        aria-haspopup="listbox"
        aria-expanded={ showListbox }
        onClick={ () => setShowListbox(prev => !prev) }
        ref={ addControlRef }>
          { defaultRoomTitles[selectedOptionIndex] }
      </ListboxButton>
      <ListboxWrapper
        role="listbox"
        tabIndex={ -1 }
        aria-activedescendant={ `room-title-${ selectedOptionIndex+1 }` }
        onKeyDown ={ handleListboxKeyNavigation }
        isShowing={ showListbox }
        ref={listboxRef}>
          { renderTitlesSelections() }
      </ListboxWrapper>
    </>
  );
}


export default memo(Listbox);