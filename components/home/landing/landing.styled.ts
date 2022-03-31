import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";
import { Button as BaseButton } from "@/styled/shared/buttons";


export const Wrapper = styled.main`
  max-width: ${rem(460)};
  width: 100%;
`

export const Form = styled.form`
  text-align: center;
`

export const Fieldset = styled.fieldset`
  background-color: ${({ theme }) => theme.colors.semiDarkNavy};
  box-shadow: inset 0 -8px 0 0 #10212A;
  border-radius: ${rem(15)};
  margin: 0 0 ${rem(32)};
  padding: ${rem(68)} ${rem(24)} ${rem(30)};
  position: relative;
`

export const Legend = styled.legend`
  color: ${({ theme }) => theme.colors.silver};
  inset: ${rem(24)} 0 auto 0;
  letter-spacing: 1px;
  position: absolute;
`

export const RadioWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.darkNavy};
  border-radius: ${rem(15)};
  display: flex;
  height: ${rem(72)};
  margin-bottom: ${rem(17)};
  padding: ${rem(9)} ${rem(8)};
  position: relative;
  width: 100%;

  &:focus-within {
    outline: 3px dashed rgb(104, 190, 205);
    outline-offset: ${rem(3)};
  }
`

export const Radio = styled.input`
  height: 100%;
  margin: 0;
  width: 50%;
  opacity: 0;
  position: absolute;
  pointer-events: none;
  top: 0;

  &:checked {
    
    + label path {
      fill: ${({ theme }) => theme.colors.darkNavy}
    }

    + label::after {
      z-index: -1;
    }
  }

  &:first-of-type:checked {

      + label:first-of-type::before {
          transform: translateX(0);
      }
  }

  &:first-of-type {
    left: 0;
  }

  &:last-of-type {
    left: 50%;
  }
`

export const Label = styled.label`
  border-radius:  ${rem(10)};
  display: grid;
  flex: 1 0 50%;
  height: 100%;
  place-content: center;

  &:first-of-type::before {
    content: "";
    background-color: ${({ theme }) => theme.colors.silver};
    border-radius: ${rem(10)};
    border-radius: ${rem(10)};
    height: calc(100% - ${rem(18)});
    position: absolute;
    transition: transform .3s linear;
    transform: translateX(100%);
    width: calc(50% - ${rem(8)});
  }
  
  &::after {
    content: "";
    inset: 0;
    position: absolute;
    z-index: 10;
  }

  svg {
    position: relative;
    transform: scale(.5);
    z-index: 5;

    path {
      fill: ${({ theme }) => theme.colors.silver};
      transition: fill .3s linear;
    }
  }

  ${breakpoint("desktop", `
    cursor: pointer;
    transition: background-color .3s ease;

    &:hover {
      background-color: rgba(168, 191, 201, .05);
    }

    &::after {
      cursor: pointer;
    }
  `)}
`

export const Extra = styled.p`
  font-weight: 500;
  letter-spacing: .88px;
  opacity: .5;

  ${({ theme }) =>`
    color: ${theme.colors.silver};
    font-size: ${rem(theme.fontSizes.body)};
  `}
`

interface ButtonProps {
  colorChange: "yellow" | "blue" | "green"
}

export const Button = styled(BaseButton)<ButtonProps>`
  border-radius: ${rem(15)};
  letter-spacing: 1px;
  
  min-height: ${rem(67)};
  width: 100%;

  ${({ theme, colorChange }) =>`
    background-color: ${colorChange==="yellow"? theme.colors.lightYellow : 
                        colorChange==="blue"? theme.colors.lightBlue : theme.colors.green};
    box-shadow: inset 0 -8px 0 0 ${colorChange==="yellow"? "#CC8B13" : 
                                  colorChange==="blue"? "#118C87" : "#009B6D"};
    font-size: ${fluid(theme.fontSizes.hExtraSmall, 3, theme.fontSizes.hSmall)};

    ${breakpoint("desktop", `
      transition: background-color .3s ease;

      &:hover {
        background-color: ${colorChange==="yellow"? theme.colors.lightYellowHover : 
                          colorChange==="blue"? theme.colors.lightBlueHover : theme.colors.greenHover};
      }
    `)}
  `}

  span {
    pointer-events: none;
  }
`

export const ModeWrapper = styled.div`
  ${Button}:not(:last-of-type){
    margin-bottom: ${rem(20)};
  }
`