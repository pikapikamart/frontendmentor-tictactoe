

export const fullBoard = ( board?: string[]) => {
  if ( !board ) return false;

  return board.every(item => item);
};