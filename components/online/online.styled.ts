import styled from "styled-components";
import {
  rem,
  fluid
} from "@/styled/functions";
import { motion } from "framer-motion";


export const Wrapper = styled(motion.main)`
  display: flex;
  flex-direction: column;
  max-width: ${rem(460)};
  width: 100%;
`

export const BackLink = styled.a`
  align-items: center;
  color: ${({ theme }) => theme.colors.silver};
  display: flex;
  font-size: ${rem(18)};
  letter-spacing: .5px;
  margin-bottom: ${rem(56)};
  max-width: max-content;

  img { 
    margin-right: ${rem(8)};
  }
`

export const Heading1 = styled.h1`
  color: ${({ theme }) => theme.colors.silverHover};
  font-size: ${ fluid(20, 4, 26) };
  letter-spacing: 2px;
  margin-bottom: ${rem(8)};
  text-transform: uppercase;
`

export const HeadingExtra = styled.p`
  color: ${({ theme }) => theme.colors.silver};
  font-size: ${ fluid(14, 2, 15) };
  font-weight: 400;
  letter-spacing: .5px;
  margin-right: ${ rem(12) };
  text-transform: initial;
`

