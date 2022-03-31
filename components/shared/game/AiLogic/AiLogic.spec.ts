import { 
  MakeMove,
  CheckWinner,
  CountEmptyTiles,
  Minimax } from "./index";

const emptyBoard = [
  "", "", "",
  "", "", "",
  "", "", ""
]

const fullBoard = [
  "X", "O", "X", 
  "O", "X", "X",
  "O", "X", "O"
]

// Start from smallest function block
describe("MakeMove", () =>{
  test("Should make the array have X on the first index", () =>{
    const input = Array.from(emptyBoard);
    const output = [
      "X", "", "",
      "", "", "",
      "", "", ""
    ]

    MakeMove(input, 0, "X");

    expect(input).toEqual(output);
  })

  test("Should not alter move if tile already has mark", () =>{
    const input = [
      "X", "", "O",
      "", "", "",
      "", "", ""
    ]
    const output = [
      "X", "", "X",
      "", "", "",
      "", "", ""
    ]

    MakeMove(input, 2, "X");

    expect(input).not.toEqual(output);
  })
})

describe("Check Winner", () =>{
  test("Check board and should return false and null", () =>{
    const input = [
      "X", "", "O",
      "", "", "O",
      "", "X", "X"
    ]
    const output = {
      win: false,
      indexes: null
    };

    expect(CheckWinner(input, 7)).toMatchObject(output);
  })

  test("Check row and should return true and [3, 4, 5]", () =>{
    const input = [
      "X", "O", "O",
      "X", "X", "X",
      "", "", "O"
    ]
    const output = {
      win: true,
      indexes: [3, 4, 5]
    };

    expect(CheckWinner(input, 3)).toMatchObject(output);
  })

  test("Check column and should return true and [0, 3, 6]", () =>{
    const input = [
      "X", "", "O",
      "X", "", "O",
      "X", "", ""
    ]
    const output = {
      win: true,
      indexes: [0, 3, 6]
    };

    expect(CheckWinner(input, 6)).toMatchObject(output);
  })

  test("Check board and should return false and null", () =>{
    const input = [
      "X", "", "O",
      "", "X", "O",
      "", "X", ""
    ]
    const output = {
      win: false,
      indexes: null
    };

    expect(CheckWinner(input, 7)).toMatchObject(output);
  })

  test("Check diagonal and should return true and [0, 4, 8]", () =>{
    const input = [
      "X", "", "O",
      "", "X", "O",
      "", "", "X"
    ]
    const output = {
      win: true,
      indexes: [0, 4, 8]
    };

    expect(CheckWinner(input, 8)).toMatchObject(output);
  })

  test("Check diagonal and should return true and [2, 4, 6]", () =>{
    const input = [
      "O", "", "X",
      "", "X", "O",
      "X", "", ""
    ]
    const output = {
      win: true,
      indexes: [2, 4, 6]
    };

    expect(CheckWinner(input, 6)).toMatchObject(output);
  })

  test("Check full board and should return false and null", () =>{
    const input = Array.from(fullBoard);
    const output = {
      win: false,
      indexes: null
    };

    expect(CheckWinner(input, 7)).toMatchObject(output);
  })
})

describe("Count empty tiles", () =>{
  test("Should return 9", () =>{
    const input = Array.from(emptyBoard);
    const output = 9;

    expect(CountEmptyTiles(input)).toEqual(output);
  })

  test("Should return 7", () =>{
    const input = [
      "", "", "",
      "O", "", "",
      "X", "", ""
    ]
    const output = 7;

    expect(CountEmptyTiles(input)).toEqual(output);
  })

  test("Should return 0", () =>{
    const input = Array.from(fullBoard);
    const output = 0;

    expect(CountEmptyTiles(input)).toEqual(output);
  })
})

describe("Minimax", () =>{
  test("Should return an object with move and win properties", () =>{
    const input = Array.from(emptyBoard);
    const result = Minimax(input, "X");
    const output = {
      move: expect.any(Number),
      win: expect.any(Boolean)
    }

    expect(result).toMatchObject(output);
  }) 

  test("Should return 4, false", () =>{
    const boardInput = [
      "", "", "",
      "O", "", "",
      "X", "", ""
    ]
    const result = Minimax(boardInput, "X");
    const output = {
      move: 4,
      win: false,
      indexes: null
    }

    expect(result).toMatchObject(output);
  })

  test("Should return 0, true and [0, 3, 6]", () =>{
    const boardInput = [
      "", "", "O",
      "X", "", "O",
      "X", "", ""
    ]
    const result = Minimax(boardInput, "X");
    const output = {
      move: 0,
      win: true,
      indexes: [0, 3, 6]
    }

    expect(result).toMatchObject(output);
  })

  test("Should return 1, true and [1, 4, 7]", () =>{
    const boardInput = [
      "", "", "",
      "X", "X", "O",
      "O", "X", "O"
    ]
    const result = Minimax(boardInput, "X");
    const output = {
      move: 1,
      win: true,
      indexes: [1, 4, 7]
    }

    expect(result).toMatchObject(output);
  })

  test("Should return 4, true, and [0, 4, 8]", () =>{
    const boardInput = [
      "X", "O", "O",
      "", "", "",
      "", "", "X"
    ]
    const result = Minimax(boardInput, "X");
    const output = {
      move: 4,
      win: true,
      indexes: [0, 4, 8]
    }

    expect(result).toMatchObject(output);
  })

  test("Should return 6, false and null", () =>{
    const boardInput = [
      "X", "", "O",
      "", "O", "",
      "", "", "X"
    ]
    const result = Minimax(boardInput, "X");
    const output = {
      move: 6,
      win: false,
      indexes: null
    }

    expect(result).toMatchObject(output);
  })

  test("Should return 4, false and null", () =>{
    const boardInput = [
      "X", "O", "X",
      "", "", "O",
      "", "", ""
    ]
    const result = Minimax(boardInput, "X");
    const output = {
      move: 4,
      win: false,
      indexes: null
    }

    expect(result).toMatchObject(output);
  })

})
