import styled from "styled-components";
import { 
  rem,
  fluid } from "@/styled/functions";
import { motion } from "framer-motion";


export const Header = styled.header`
  max-width: max-content;
  margin: 0 auto ${fluid(32, 5, 40)};
`

export const LandingWrapper = styled(motion.div)`
  display: grid;
  place-items: center;
  width: 100%;
`