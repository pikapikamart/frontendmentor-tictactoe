import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { 
  useDispatch,
  useTrackedState } from "@/store/tracked";
import { Shared } from "@/page-components/shared";


const CPUPage: NextPage = () =>{
  const dispatch = useDispatch();
  const pathName = useRouter().pathname.slice(1);
  const { gameMode } = useTrackedState();

  useEffect(() =>{
    if ( !gameMode && pathName ) {
      dispatch({ type: "START_GAME", mode:"cpu", player: "X" })
    }
  }, [ ])

  return ( 
    <Shared /> 
  );
}


export default CPUPage;