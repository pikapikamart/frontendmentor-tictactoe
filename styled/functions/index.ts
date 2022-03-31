import { Theme } from "../theme";

export const rem = ( pixel: number) =>{
  const quotient = pixel / 16;

  return `${quotient}rem`;
}

export const fluid = ( min: number, pref: number, max: number ) =>{

  return `clamp(${rem(min)}, ${pref + "vw"}, ${rem(max)})`;
} 

type BreakpointSize = "tablet" | "desktop";

export const breakpoint = (size: BreakpointSize, css: string) =>{
  
  return `
    @media (min-width: ${size==="tablet"? rem(Theme.breakpoints.tablet) : rem(Theme.breakpoints.desktop)}) {
      ${css}
    }
  `
}