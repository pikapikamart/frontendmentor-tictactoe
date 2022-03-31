import {
  LandingWrapper,
  Header
} from "./home.styled";
import { LandingUi } from "./landing";
import { exitUp } from "motion/variants";


const Home = () =>{

  return (
    <LandingWrapper
      key="landing"
      variants={exitUp}
      initial="visible"
      animate="visible"
      exit="hidden">
      <Header>
        <img src="/assets/logo.svg" alt="tic tac toe" />
      </Header>
      <LandingUi/>
    </LandingWrapper>
  );
}


export default Home;