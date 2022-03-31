import styled from "styled-components";
import { 
  rem,
  fluid } from "@/styled/functions";
import { Player } from "@/store/tracked";
import { motion } from "framer-motion";


export const Wrapper = styled(motion.div)`
  background-color: rgba(0, 0, 0, .5);
  display: grid;
  grid-template-columns: 100%;
  inset: 0;
  place-content: center;
  place-items: center;
  position: fixed;
  z-index: 20;
`

interface ContentContainerProps {
  minHeight?: number | "initial"
}

export const ContentContainer = styled.div<ContentContainerProps>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.semiDarkNavy};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${({ minHeight }) => minHeight?? rem(228)};
  outline: none;
  padding: ${rem(40)} 0 ${rem(48)};
  text-align: center;
  width: 100%;
`

export const ResultText = styled.p`

  ${({ theme }) => `
    color: ${theme.colors.silver};
    font-size: ${fluid(theme.fontSizes.body, 2.5, theme.fontSizes.hExtraSmall)};
  `}
`

interface PlayerBanner {
  playerPick?: Player | null
}

export const PlayerBanner = styled.div<PlayerBanner>`
  align-items: center;
  display: flex;
  color: ${({ theme, playerPick }) => 
    !playerPick? theme.colors.silver : 
    playerPick==="X"? theme.colors.lightBlue : theme.colors.lightYellow};
  font-size: ${({ theme }) => rem(theme.fontSizes.hMedium)};
  justify-content: center;
  letter-spacing: 1.5px;
  margin: 1rem ${rem(24)};

  svg {
    height: ${fluid(30, 9, 64)};
    margin-right: ${fluid(8, 3.1, 24)};
    width: ${fluid(30, 9, 64)};
  }

  span + svg {
    margin:0 0 0 ${fluid(8, 3.1, 24)};
  }
`

export const Options = styled.div`
  display: grid;
  grid-template-rows: ${rem(52)};
  grid-template-columns: repeat(2, auto);
  gap: 0 1rem;
`

export const QuitLink = styled.a`
  background-color: ${({ theme }) => theme.colors.silver};
  box-shadow: inset 0 -4px 0 0 #6B8997;
  border-radius: ${rem(10)};
  color: ${({ theme }) => theme.colors.darkNavy};
  display: grid;
  letter-spacing: 1px;
  padding: 0 ${rem(17)};
  place-content: center;
  text-transform: uppercase;
`

export const RoomForm = styled.form`
  max-width: ${rem(300)};
  width: 100%;
`

