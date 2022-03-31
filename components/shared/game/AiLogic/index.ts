

export const MakeMove = ( board: string[], index: number, player: "X" | "O" ): void =>{
  if ( !board[index ]) {
    board[index] = player;
  }
}

export const CheckWinner = ( board: string[], tileIndex: number ) =>{
  const rowStartIndex = Math.floor(tileIndex/3) * 3;
  const rowLastIndex = rowStartIndex + 3;
  const rowBoard = board.slice(rowStartIndex, rowLastIndex);
  const rowBoardIndexes = [rowStartIndex, rowStartIndex+1, rowStartIndex+2];

  const checkSameValue = ( arr: string[] ) => arr.every(( item, _, arr) => item && arr[0]===item);

  if ( checkSameValue(rowBoard)) {
    return {
      win: true,
      indexes: rowBoardIndexes
    }
  }

  const collumnIndex = tileIndex % 3;
  const collumnBoard = ["","",""].map((_, index) => board[collumnIndex + (index*3)]);
  const collumnBoardIndexes = [collumnIndex, collumnIndex+3, collumnIndex+6];

  if ( checkSameValue(collumnBoard) ) {
    return {
      win: true,
      indexes: collumnBoardIndexes
    }
  }

  if ( !(tileIndex%2)) {
    const firstDiagonal = ["", "", ""].map((_, index) => board[(index*3) + index]);
    const firstDiagonalIndexes = [0, 4, 8];
    const secondDiagonal = ["", "", ""].map((_, index) => board[2 * (index+1)]);
    const secondDiagonalIndexes = [2, 4, 6];

    if ( checkSameValue(firstDiagonal) ) {
      return {
        win: true,
        indexes: firstDiagonalIndexes
      }
    }

    if ( checkSameValue(secondDiagonal)) {
      return {
        win: true,
        indexes: secondDiagonalIndexes
      }
    }
  }

  return {
    win: false,
    indexes: null
  }
}

export const CountEmptyTiles = ( board: string[]): number => board.reduce((accu, curr) => !curr? accu+1 : accu, 0)

interface OptimalMove {
  move: null | number,
  score: number
}

export const Minimax = ( board: string[], globalPlayer: "X" | "O" ) =>{
  let currentWinner: "X" | "O" | null = null;

  const StartMove = ( currentPlayer: "X" | "O" ) =>{
    const otherPlayer = currentPlayer==="X"? "O" : "X";
    let optimalMove: OptimalMove = {
      move: null,
      score: globalPlayer===currentPlayer? -Infinity: Infinity 
    }
    
    if ( currentWinner===otherPlayer ) {
      return {
        move: null,
        score: globalPlayer===otherPlayer? CountEmptyTiles(board)+1 : (CountEmptyTiles(board)+1) * -1
      }
    }

    if ( !CountEmptyTiles(board) ) {
      return {
        move: null,
        score: 0
      }
    }

    for ( let index = 0; index< board.length; index++ ) {
      if ( board[index]) continue;

      MakeMove(board, index, currentPlayer);
      currentWinner = CheckWinner(board, index)["win"]? currentPlayer : currentWinner;
      const nextRound = StartMove(otherPlayer)
      // Undo moves
      board[index] = "";
      currentWinner = null;
      nextRound["move"] = index;

      switch(currentPlayer) {
        case globalPlayer:
          optimalMove = nextRound["score"] > optimalMove["score"] ? nextRound : optimalMove;
          break;
        default:
          optimalMove = nextRound["score"] < optimalMove["score"] ? nextRound : optimalMove;
      }
    }

    return optimalMove;
  }

  const result = StartMove(globalPlayer);
  
  if ( result["move"]!==null ) {
    MakeMove(board, result["move"], globalPlayer);
    const winning = CheckWinner(board, result["move"]);

    if ( winning["win"] ) {
      return {
        move: result["move"],
        win: true,
        indexes: winning["indexes"]
      }
    }
  }

  return {
    move: result["move"],
    win: false,
    indexes: null
  }
}

export const PlayGame = ( board: string[], player: "X" | "O" ) =>{
  const boardCopy = Array.from(board);
  const gameState = {
    move: 0,
    win: false,
    indexes: null
  }

  if ( boardCopy.includes("") ) {
    if ( CountEmptyTiles(boardCopy)===9 ) {
      gameState["move"] = Math.floor(Math.random() * 10);
    }
    else {
      return Minimax(boardCopy, player);
    }

    return gameState;
  }

  return false;
}