import styled from "styled-components";
import { rem } from "@/styled/functions";
import { motion } from "framer-motion";


export const Wrapper = styled(motion.main)`
  max-width: ${rem(460)};
  outline: none;
  padding-top: ${rem(24)};
  width: 100%;
`