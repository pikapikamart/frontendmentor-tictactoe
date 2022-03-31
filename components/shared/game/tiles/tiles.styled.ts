import styled, { 
  keyframes,
  css } from "styled-components";
import { 
  rem, 
  fluid,
  breakpoint } from "@/styled/functions";
import { Player } from "@/store/tracked";


export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, ${fluid(96, 24, 140)});
  gap: ${rem(20)} 0;
  margin-bottom: ${rem(20)};
  position: relative;
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 ${rem(20)};
`

const tileWave = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`

const tileYellow = keyframes`
  100% {
    background-color: #F2B137;
  }
`

const tileBlue = keyframes`
  100% {
    background-color: #31C3BD;
  }
`

const shapeFill = keyframes`
  100% {
    fill: #1A2A33;
  }
`

interface CollumnCell {
  waveDelay?: number,
  gameStatus?: {
    player: Player,
    winPlayer: Player | null,
  }
}

const markShow = keyframes`
  0%{
    opacity: 0;
    transform: translateY(10%)
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

export const CollumnCell = styled.div<CollumnCell>`
  background: no-repeat center;
  background-color: ${({ theme }) => theme.colors.semiDarkNavy};
  border-radius: ${rem(10)};
  box-shadow: inset 0 -8px 0 0 #10212A;
  display: grid;
  flex-basis: 100%;
  height: 100%;
  padding-bottom: ${rem(8)};
  place-content: center;
  width: 100%;

  &:focus-visible {
    outline: 3px dashed rgb(104, 190, 205);
    outline-offset: 3px;
  }

  svg {
    animation: ${markShow} .3s ease-in forwards;
    width: ${fluid(40, 9, 64)};
  }

  ${({ waveDelay, gameStatus }) =>css`
    &.win {
      animation: ${tileWave} .35s ${waveDelay}s linear forwards,
                ${gameStatus?.winPlayer==="X"? tileBlue : tileYellow} .35s ${waveDelay}s linear forwards;
      svg path {
        animation: ${shapeFill} .45s ${waveDelay}s linear forwards;
      }
    }

    ${breakpoint("desktop", `
      position: relative;
      
      &:not(.occupied):hover {
        background-image: url("/assets/icon-${gameStatus?.player.toLowerCase()}-outline.svg");
      }
    `)}
  `}
`