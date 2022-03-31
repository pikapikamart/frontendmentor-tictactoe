import styled from "styled-components";
import { rem } from "@/styled/functions";


export const Wrapper = styled.div`
  display: grid;
  font-weight: 700;
  min-height: 100vh;
  padding: ${rem(64)} ${rem(24)};
  place-items: center;
  text-transform: uppercase;
`