import styled from "styled-components";
import { 
  rem,
  fluid } from "@/styled/functions";


export const Wrapper = styled.ul`
  display: flex;
  text-align: center;
`

export const Score = styled.li`
  border-radius: ${fluid(10, 2, 15)};
  display: grid;
  flex-basis: 100%;
  min-height: ${rem(64)};
  place-content: center;

  ${({ theme }) => `
    font-size: ${fluid(theme.fontSizes.hSmall, 2, theme.fontSizes.hMedium)};

    &:first-of-type {
      background-color: ${theme.colors.lightBlue};
    }
  
    &:nth-of-type(2) {
      background-color: ${theme.colors.silver};
      margin: 0 ${rem(20)};
    }
  
    &:last-of-type {
      background-color: ${theme.colors.lightYellow};
    }
  `}

  p {
    font-weight: 500;
    font-size: ${rem(12)};
    letter-spacing: .88px;
  }
`
