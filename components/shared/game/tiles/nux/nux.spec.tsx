import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/test/test.utils";
import CPUPage from "@/pages/cpu";
import { 
  gameState,
  storageKey
} from "@/store/tracked";
import { createMockRouter } from "@/test/mock/useRouterMock";
import { RouterContext } from 'next/dist/shared/lib/router-context';


const userTabs = ( times: number ) =>{
  for ( let time = 0 ;time < times; time++) userEvent.tab();
}

afterEach(() =>{
  localStorage.setItem(storageKey, JSON.stringify(gameState))
})

test("NUX should only appear when focus is on grid", async () =>{
  const router = createMockRouter({
    pathname: "/cpu"
  });

  render(
  <RouterContext.Provider value={router}>
    <CPUPage />
  </RouterContext.Provider>)

  expect(router.pathname).toBe("/cpu");

  userTabs(3);

  expect(screen.getByRole("region", {name: /tutorial/})).toBeInTheDocument();
})

test("Pressing tab when focus is on grid will go to NUX", () =>{
  const router = createMockRouter({
    pathname: "/cpu"
  });

  render(
  <RouterContext.Provider value={router}>
    <CPUPage />
  </RouterContext.Provider>)

  expect(router.pathname).toBe("/cpu");

  userTabs(3);
  const NUX = screen.getByRole("region", {name: /tutorial/});
  userEvent.tab();

  expect(NUX).toHaveFocus();
})

test("NUX should only appear once and should be removed when close tutorial is click and change focus to tile", () =>{
  const router = createMockRouter({
    pathname: "/cpu"
  });

  render(
  <RouterContext.Provider value={router}>
    <CPUPage />
  </RouterContext.Provider>)

  expect(router.pathname).toBe("/cpu");

  userTabs(3)
  const closeTutorial = screen.getByRole("button", {name: "Close Tutorial"});
  const tiles = screen.getAllByRole("gridcell");
  
  expect(tiles.length).toBe(9);

  userTabs(2);
  userEvent.keyboard("{Enter}");

  expect(closeTutorial).not.toBeInTheDocument();

  expect(screen.queryByRole("region", {name: /tutorial/})).not.toBeInTheDocument();

  expect(tiles[0]).toHaveFocus();
})

test("NUX should only appear when user uses tab on the grid and not by clicking the tiles", () =>{
  const router = createMockRouter({
    pathname: "/cpu"
  });

  render(
  <RouterContext.Provider value={router}>
    <CPUPage />
  </RouterContext.Provider>)

  expect(router.pathname).toBe("/cpu");

  const tiles = screen.getAllByRole("gridcell");
  userEvent.click(tiles[0]);

  expect(screen.queryByRole("button", {name: "Close Tutorial"})).not.toBeInTheDocument();

  userEvent.keyboard("{ArrowRight}");

  expect(screen.getByRole("button", {name: "Close Tutorial"})).toBeInTheDocument();
})