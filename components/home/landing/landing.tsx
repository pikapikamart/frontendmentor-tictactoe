import React, { useState } from "react";
import { 
  Wrapper,
  Form,
  Fieldset,
  Legend,
  RadioWrapper,
  Radio,
  Label,
  Extra,
  ModeWrapper,
  Button } from "./landing.styled";
import { SrOnly } from "@/styled/shared/helpers";
import { 
  Player,
  GameMode } from "@/store/tracked";
import { useDispatch } from "@/store/tracked";
import { useRouter } from "next/router";
 

const LandingUi = () =>{
  const dispatch = useDispatch();
  const [ playerMark, setPlayerMark ] = useState<Player>("X");
  const router = useRouter();

  const handleMarkChange = ( event: React.ChangeEvent<HTMLInputElement> ) =>{
    setPlayerMark(event.target.value as Player);
  }

  const handleModeChoose = ( event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    const modeId = (event.target as HTMLButtonElement).id as GameMode;

    if ( !modeId || !["cpu", "local", "online"].includes(modeId)) return;
    
    else {
      dispatch({ type: "START_GAME", mode: modeId, player: playerMark });
    }

    router.push(`/${modeId}`);
  }

  return (
    <Wrapper>
      <SrOnly as="h1">Frontendmentor tic tac toe configuration</SrOnly>
      <Form onSubmit={ event => event.preventDefault() }>
        <Fieldset>
          <Legend>{`Pick player 1's mark`}</Legend>
          <RadioWrapper>
            <Radio 
              type="radio"
              id="X"
              value="X"
              name="mark"
              onChange={handleMarkChange}
              defaultChecked />
            <Label htmlFor="X">
              <SrOnly>X!</SrOnly>
              <svg aria-hidden="true" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fillRule="evenodd"/></svg></Label> 
            <Radio 
              type="radio"
              id="O"
              value="O"
              name="mark"
              onChange={handleMarkChange} />
            <Label htmlFor="O">
            <SrOnly>O!</SrOnly>
              <svg aria-hidden="true" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>
            </Label> 
          </RadioWrapper>
          <Extra>Remember : X goes first</Extra>
        </Fieldset>
        <ModeWrapper>
          <Button 
            type="submit"
            id="cpu"
            onClick={handleModeChoose}
            colorChange="yellow">
              <span>
                new game (
                <span aria-hidden>vs </span>
                <SrOnly>versus</SrOnly>
                <SrOnly>(</SrOnly>CPU)
              </span>
          </Button>
          <Button
            type="submit"
            id="local"
            onClick={handleModeChoose}
            colorChange="blue">
              <span>
                new game (
                <span aria-hidden>vs </span>
                <SrOnly>versus</SrOnly>
                player)
              </span>
          </Button>
          <Button
            type="submit"
            id="online"
            onClick={handleModeChoose}
            colorChange="green">
              <span>
                new game (
                <span aria-hidden>vs </span>
                <SrOnly>versus</SrOnly>
                online)
              </span>
          </Button>
        </ModeWrapper>
      </Form>      
    </Wrapper>
  );
}


export default LandingUi;