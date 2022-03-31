import styled from "styled-components";


export const SrOnly = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

interface FlexBetweenProps {
  align: "flex-start" | "center" | "flex-end"
}

export const FlexBetween = styled.div<FlexBetweenProps>`
  align-items: ${({ align }) => align};
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const FlexAlignEnd = styled.div`
  align-items: flex-end;
  display: flex;
`
