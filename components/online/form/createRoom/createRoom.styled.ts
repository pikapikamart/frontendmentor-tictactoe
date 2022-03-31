import styled from "styled-components";
import { 
  rem } from "@/styled/functions";


export const ListboxButton = styled.button`
  align-items: center;
  border-radius: ${rem(4)};
  display: flex;
  font-size: ${rem(15)};
  font-weight: 400;
  letter-spacing: 1px;
  padding: 0 ${rem(10)};
  position: relative;
  text-align: left;

  ${({ theme }) =>`
    background-color: ${theme.colors.darkNavy};
    color: ${theme.colors.silver};
  `}

  &::after {
    content: "";
    background: url("/assets/icon-arrow.svg") no-repeat center center;
    height: ${rem(10)};
    position: absolute;
    right: ${rem(10)};
    transition: transform .3s ease;
    transform: rotate(-90deg);
    transform-origin: center;
    width: ${rem(10)};
  }
`

interface ListboxProps {
  isShowing?: boolean;
}

export const Listbox = styled.ul<ListboxProps>`
  border-radius: ${rem(4)};
  bottom: ${rem(-8)};
  font-size: ${rem(14)};
  font-weight: 400;
  outline: none;
  padding: ${rem(12)} ${rem(10)};
  position: absolute;
  transform: translateY(100%);
  visibility: ${({ isShowing }) => isShowing? "visible" : "hidden"};
  width: 100%;
  z-index: 10;

  ${({ theme }) => `
    background-color: ${theme.colors.darkNavy};
    color: ${theme.colors.silver};
  `}

  li {
    padding: ${rem(6)} 0;

    &.selected,
    &[aria-selected="true"] {
      background-color: ${({ theme }) => theme.colors.semiDarkNavy};
    }
  }
`

export const PasswordCheckbox = styled.input`
  height: ${rem(18)};
  margin: 0 0 0 ${rem(6)};
  width: ${rem(18)};
`