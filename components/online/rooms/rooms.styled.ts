import styled, { 
  css,
  keyframes } from "styled-components";
import { 
  rem,
  fluid
} from "@/styled/functions";


export const Wrapper = styled.div`
  text-transform: initial;
`

export const RoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${rem(32)};
  width: 100%;
`

interface RoomsListProps {
  empty?: boolean
}

export const RoomsList = styled.ul<RoomsListProps>`
  display: flex;
  flex-direction: column;
  margin-top: ${rem(8)};
  min-height: ${rem(272)};
  width: 100%;

  ${({ empty }) =>{
    switch(empty) {
      case true: 
        return css`
          background: url("/assets/background-nothing.svg") no-repeat center center;
        `
      default:
        return css``
      }
  }}
`

interface RoomProps {
  owned?: boolean
}

export const Room = styled.li<RoomProps>`
  align-items: center;
  border-radius: ${rem(6)};
  display: grid;
  flex-basis: ${rem(48)};
  font-size: ${ fluid(15, 2.5, 16) };
  font-weight: 500;
  grid-template-columns: ${ fluid(50, 14, 70) } auto ${rem(80)};
  letter-spacing: .5px;
  padding: 0 ${rem(16)};
  position: relative;
  width: 100%;

  ${ ({ theme, owned }) =>`
    background-color: ${ owned? "#1887BE" : theme.colors.semiDarkNavy };
    color: ${ owned? "#FFFFFF" : theme.colors.silverHover };
  `}

  ${RoomsList} &:not(:last-of-type) {
    margin-bottom: ${rem(8)};
  }
`

const ShowErrorAnimation = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translateY(-100%);
  }
  10% { opacity: 0; }
  40%, 80% { 
    opacity: 1;
    transform: translateY(0);
  }
  90% { opacity: 0; }
`

interface RoomErrorProps {
  showError: boolean
}

export const RoomError = styled.p<RoomErrorProps>`
  animation: ${ ({ showError }) => showError? ShowErrorAnimation : "none" } 3s ease;
  background-color: #FFFFFF;
  border-radius: ${rem(6)};
  color: ${ ({ theme }) => theme.colors.red };
  display: grid;
  font-size: ${ rem(18) };
  font-weight: 700;
  height: 100%;
  inset: 0 auto auto 0;
  opacity: 0;
  position: absolute;
  place-items: center;
  transform: translateY(-100%);
  text-transform: uppercase;
  width: 100%;
`

export const RoomId = styled.p`
  font-size: ${ fluid(13, 2.2, 14) };
  font-weight: 700;

  & > span {
    font-size: ${rem(12)}
  }
`

export const RoomIconsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-self: flex-end;

  & img {
    margin-left: ${rem(8)};
  }
`

export const RoomEnterButton = styled.button`

  &:focus-visible {
    outline: none;

    &::after {
      outline: 3px dashed rgb(104, 190, 205);
      outline-offset: 3px;
    }
  }

  &::after {
    content: "";
    inset: 0;
    position: absolute;
    z-index: 10;
  }
`