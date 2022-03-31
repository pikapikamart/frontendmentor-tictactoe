import { 
  useEffect,
  useRef } from "react";
import { Wrapper } from "@/components/shared/game/modal/modal.styled";
import { ContentContainer } from "./form.styled";
import { modalShow } from "@/motion/variants";


interface FormProps {
  children: React.ReactNode
}

const Form = ({ children }: FormProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() =>{
    contentRef.current?.focus();
  }, [])

  return (
    <Wrapper
      key="online-form"
      variants={ modalShow(0) }
      initial="hidden"
      animate="visible"
      exit="hidden">
      <ContentContainer
        tabIndex={ -1 }
        ref={ contentRef }>
        { children }
      </ContentContainer>
    </Wrapper>
  );
}


export default Form;