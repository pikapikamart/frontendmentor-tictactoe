import styled, { css } from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "../functions";


export const Button = styled.button`
  border-radius: ${rem(10)};
  color: ${({ theme }) => theme.colors.darkNavy};
  display: grid;
  place-content: center;
  text-transform: uppercase;
  
  ${breakpoint("desktop", `
    cursor: pointer;
  `)}
`

export const SilverButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.silver};
  box-shadow: inset 0 -4px 0 0 #6B8997;
  letter-spacing: 1px;
  padding: 0 ${rem(17)};
`

export const YellowButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.lightYellow};
  box-shadow: inset 0 -4px 0 0 #CC8B13;
  letter-spacing: 1px;
  padding: 0 ${rem(17)};
`

interface MainButtonProps {
  colorMode?: "blue" | "red"
}

export const MainButton = styled.button<MainButtonProps>`
  border-radius: ${rem(8)};
  background-color: ${({ theme }) => theme.colors.blue};
  box-shadow: inset 0 -4px 0 0 #30637D;
  color: #FFFFFF;
  font-size: ${ fluid(13, 1.5, 14) };
  letter-spacing: 1px;
  padding: ${ fluid(12, 2, 14) } ${ fluid(14, 2, 16) } ${ fluid(14, 2, 16) };
  text-transform: uppercase;

  ${({ theme, colorMode }) =>{
    switch(colorMode) {
      case "blue":
        return css`
          background-color: ${ theme.colors.blue };
          box-shadow: inset 0 -4px 0 0 #30637D;
        `
      case "red":
        return css`
          background-color: ${ theme.colors.red };
          box-shadow: inset 0 -4px 0 0 #C93434;
        `
    }
  }}
`