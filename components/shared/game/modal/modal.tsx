import { 
  useEffect,
  useRef } from "react";
import { 
  Wrapper,
  ContentContainer} from "./modal.styled";
import { modalShow } from "motion/variants";
  

interface ModalProps {
  children: React.ReactNode,
  minHeight?: number | "initial",
  delay?: number
}

const Modal = ({ children, minHeight, delay }: ModalProps) =>{
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() =>{
    document.body.classList.add("no-scroll");
    modalRef.current?.focus();

    return () => document.body.classList.remove("no-scroll");
  }, [])

  return (
    <Wrapper
      key="game-modal"
      variants={ modalShow(delay) }
      initial="hidden"
      animate="visible"
      exit="hidden">
      <ContentContainer
        tabIndex={-1}
        minHeight= { minHeight }
        ref={ modalRef }>  
        { children }
      </ContentContainer>
    </Wrapper>
  );
}


export default Modal;