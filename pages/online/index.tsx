import { NextPage } from "next";
import { useEffect } from "react";
import { 
  useTrackedState,
  useDispatch } from "@/store/tracked";
import { Online } from "@/page-components/online";


interface OnlinePageProps {
  socket_uri: string
}

const OnlinePage: NextPage<OnlinePageProps> = ({ socket_uri }: OnlinePageProps) =>{
  const { gameMode, online } = useTrackedState();
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch({ type: "START_ONLINE_MODE", socket_uri });

    return () => dispatch({ type: "ONLINE_EXIT" });
  }, [])

  return (
    <>
      { online && <Online /> }
    </>
  );
}

export async function getStaticProps() {

  return {
    props: {
      socket_uri: process.env.SOCKET_URL || "http://localhost:3001/"
    }
  }
}


export default OnlinePage;