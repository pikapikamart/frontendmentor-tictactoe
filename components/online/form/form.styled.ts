import styled from "styled-components";
import { rem } from "@/styled/functions";
import { ContentContainer as ModalContentContainer } from "@/components/shared/game/modal/modal.styled";
import { MainButton } from "@/styled/shared/buttons";
import { motion } from "framer-motion"; 

export const ContentContainer = styled(ModalContentContainer)`
  border-radius: ${rem(8)};
  box-shadow: inset 0 0 4px 1px rgba(84, 200, 237, .25);
  display: block;
  max-width: ${rem(330)};
  min-height: initial;
  letter-spacing: 1px;
  outline: none;
  padding: ${rem(20)} ${rem(16)};
  text-align: left;
  width: 100%;
`

export const InputContainer = styled.div`
  color: ${({ theme }) => theme.colors.silverHover};
  display: grid;
  font-weight: 500;
  gap: ${rem(6)} 0;
  grid-template-rows: auto ${rem(42)} auto;
  margin-bottom: ${rem(16)};
  position: relative;
  text-transform: initial;
  width: 100%;
`

export const TextInput = styled.input`
  align-items: center;
  border-radius: ${rem(4)};
  display: flex;
  padding: ${rem(12)} ${rem(10)};
  
  &[disabled] {
    cursor: not-allowed;
  }
  
  ${({ theme }) => `
    background-color: ${theme.colors.darkNavy};
    color: ${theme.colors.silver};
  `}
`

export const InputError = styled.p`
  color: ${ ({ theme }) => theme.colors.red };
`

export const FormButtonContainer = styled.div`
  display: flex;

  & ${MainButton} {

    &:first-of-type {
      margin-right: ${rem(16)}; 
    }
  }
`

export const GridFormCenter = styled.form`
  color: ${ ({ theme }) => theme.colors.silverHover };
  display: grid;
  gap: ${ rem(16) } 0;
  grid-template-columns: 100%;
  justify-items: center;
  text-align: center;

  & ${ InputContainer } {
    margin-bottom: 0;
  }

  & ${ TextInput } {
    text-align: center;
  }
`

export const FormHeading = styled.h2`
  color: ${ ({ theme }) => theme.colors.silverHover };
  font-size: ${ rem(24) };
  letter-spacing: 2px;
  line-height: 1.5;
  max-width: ${rem(280)};
  text-transform: uppercase;
`