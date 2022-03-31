import React from "react";
import { 
  act, 
  screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/test/test.utils";
import CPUPage from "@/pages/cpu";
import LocalPage from "@/pages/local";
import { 
  gameState,
  storageKey
} from "@/store/tracked";
import { createMockRouter } from "@/test/mock/useRouterMock";
import { RouterContext } from 'next/dist/shared/lib/router-context';


const userTabs = ( times: number ) =>{
  for ( let time = 0 ;time < times; time++) userEvent.tab();
}

jest.mock("next/link", () => {
  return ({ children }: any) => {
      return children;
  }
});

afterEach(() => jest.useRealTimers())

test("Using arrow keys inside the grid moves focus properly", async () =>{
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CPUPage />
    </RouterContext.Provider>
  )

  userTabs(3);
  const gridCells = screen.getAllByRole("gridcell");

  userEvent.keyboard("{ArrowRight}");

  expect(gridCells[1]).toHaveFocus();

  userEvent.keyboard("{ArrowDown}");
  userEvent.keyboard("{ArrowDown}");

  expect(gridCells[7]).toHaveFocus();

  userEvent.keyboard("{ArrowDown}");

  expect(gridCells[7]).toHaveFocus();

  userEvent.keyboard("{ArrowUp}");
  userEvent.keyboard("{ArrowLeft}");

  expect(gridCells[3]).toHaveFocus();

  userEvent.keyboard("{ArrowUp}");
  userEvent.keyboard("{ArrowUp}");

  expect(gridCells[0]).toHaveFocus();

  userEvent.keyboard("{ArrowRight}");
  userEvent.keyboard("{ArrowRight}");
  userEvent.keyboard("{ArrowRight}");

  expect(gridCells[2]).toHaveFocus();

  userEvent.keyboard("{Home}");

  expect(gridCells[0]).toHaveFocus();

  userEvent.keyboard("{ArrowUp}");

  expect(gridCells[0]).toHaveFocus();

  userEvent.keyboard("{End}");

  expect(gridCells[8]).toHaveFocus();

  userEvent.keyboard("{ArrowDown}");

  expect(gridCells[8]).toHaveFocus();

  userEvent.keyboard("{Home}");
  userEvent.keyboard("{ArrowDown}");
  userEvent.keyboard("{ArrowDown}");
  userEvent.keyboard("{ArrowDown}");

  expect(gridCells[6]).toHaveFocus();
})

test("Live region should announce properly when player and cpu moves", async () =>{
  localStorage.setItem(storageKey, JSON.stringify({...gameState, gameMode: "cpu"}));
  jest.useFakeTimers();
  
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <CPUPage />
    </RouterContext.Provider>
  )

  userTabs(3);
  const moveRegion = screen.getByTestId("move-region");
  const gridcells = screen.getAllByRole("gridcell", {name: ""});
  
  userEvent.keyboard("{ArrowRight}");
  userEvent.keyboard("{ArrowRight}");
  userEvent.keyboard("{Enter}");

  expect(gridcells[2]).toHaveTextContent("Occupied by X");
  expect(moveRegion).toHaveTextContent("Placed X at row 1 collumn 3.");

  act(() =>{
      jest.runAllTimers();
  })

  expect(moveRegion).toHaveTextContent("CPU placed O at row 2 column 2.");

  userEvent.keyboard("{ArrowDown}");
  userEvent.keyboard("{ArrowDown}");
  userEvent.keyboard("{ArrowLeft}");
  userEvent.keyboard("{Enter}");

  expect(moveRegion).toHaveTextContent("Placed X at row 3 collumn 2.");

  act(() =>{
    jest.runAllTimers();
  })

  expect(moveRegion).toHaveTextContent("CPU placed O at row 2 column 1.");
})


test("Tiles and live region should contain proper text when playing local", async () =>{
  localStorage.setItem(storageKey, JSON.stringify({...gameState, gameMode: "local"}));
  jest.useFakeTimers();
  
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <LocalPage />
    </RouterContext.Provider>
  )

  const gridcells = screen.getAllByRole("gridcell");
  const moveRegion = screen.getByTestId("move-region");
  userEvent.click(gridcells[0]);
  
  expect(gridcells[0]).toHaveTextContent("Occupied by X");
  expect(moveRegion).toHaveTextContent("Player 1 placed X at row 1 collumn 1.");

  userEvent.click(gridcells[4]);

  expect(gridcells[4]).toHaveTextContent("Occupied by O");
  expect(moveRegion).toHaveTextContent("Player 2 placed O at row 2 collumn 2.");
})