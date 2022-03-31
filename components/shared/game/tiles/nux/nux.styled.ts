import styled from "styled-components";
import { 
  rem,
  fluid } from "@/styled/functions";


export const Wrapper = styled.div`
  border-radius: 0 ${rem(10)} ${rem(10)};
  box-shadow: 4px 4px 5px 2px rgba(0, 0, 0, .15);
  font-weight: 500;
  font-size: ${rem(18)};
  inset: ${fluid(96, 24, 160)} auto auto 50%;
  line-height: 1.5;
  max-width: ${rem(423)};
  outline: none;
  padding: ${rem(16)} ${rem(16)} ${rem(20)};
  position: absolute;
  transform: translateX(-50%);
  text-transform: none;
  width: 100%;

  &:focus-visible {
    outline: 3px dashed rgb(104, 190, 205);
    outline-offset: 3px;
  }

  ${({ theme }) => `
    background-color: ${theme.colors.silver};
    color: ${theme.colors.darkNavy};
  `}

  &::before {
    content: "";
    border: ${rem(16)} solid transparent;
    inset: -${rem(32)} auto auto 0;
    position: absolute;

    ${({ theme }) =>`
      border-bottom-color: ${theme.colors.silver};
      border-left-color: ${theme.colors.silver};
    `}
  }

  p:nth-of-type(2) {
    margin: ${rem(16)} 0;
  }
`

export const Bold = styled.span`
  font-weight: 700;
`

export const ButtonClose = styled.button`
  color: ${({ theme }) => theme.colors.semiDarkNavy};
  display: block;
  margin: ${rem(20)} 0 0 auto;
  text-decoration: underline;

  &:focus-visible {
    outline-color: #000000;
  }
`