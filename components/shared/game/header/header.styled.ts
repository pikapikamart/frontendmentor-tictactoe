import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";


export const Wrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: ${rem(64)};

  a {
    max-width: max-content;
  }

  ${breakpoint("tablet", `
    margin-bottom: ${rem(20)};
  `)}
`

export const PlayerTurn = styled.div`
  align-items: center;
  box-shadow: inset 0 -4px 0 0 #10212A;
  border-radius: ${fluid(5, .7, 10)};
  display: flex;
  justify-content: center;
  min-height: ${fluid(40, 6, 52)};
  padding-bottom: ${rem(4)};

  ${({ theme }) =>`
    background-color: ${theme.colors.semiDarkNavy};
    color: ${theme.colors.silver};
    font-size: ${fluid(theme.fontSizes.body, 2, theme.fontSizes.hExtraSmall)};
  `}

  svg {
    height: ${rem(16)};
    margin-right: ${rem(9)};
    width: ${rem(16)};

    path {
      fill: ${({ theme }) => theme.colors.silver};
    }
  }
`

export const ResetButton = styled.button`
  background: ${({ theme }) => theme.colors.silver}  url("/assets/icon-restart.svg") no-repeat center center;
  background-size: ${fluid(16, 4, 20)};
  border-radius: ${fluid(5, .7, 10)};
  box-shadow: inset 0 -4px 0 0 #6B8997;
  height: ${fluid(40, 6, 52)};
  justify-self: flex-end;
  padding-bottom: ${rem(4)};
  width: ${fluid(40, 6, 52)};

  ${({ theme }) => `
    background: ${theme.colors.silver}  url("/assets/icon-restart.svg") no-repeat center center;

    ${breakpoint("desktop", `
      cursor: pointer;
      transition: background-color .3s ease;

      &:hover {
        background-color: ${theme.colors.silverHover};
      }
    `)}
  `}
`