export const rowSize = 12
export const columnSize = 12

export const APPLE = 14488883

export const TOP =     { x: 0,  y: -1 }
export const RIGHT =   { x: 1,  y: 0  }
export const DOWN =    { x: 0,  y: 1  }
export const LEFT =    { x: -1, y: 0  }

export const TOP_DIRECTION = 0
export const RIGHT_DIRECTION = 1
export const DOWN_DIRECTION = 2
export const LEFT_DIRECTION = 3

export const DIRECTIONS_MAP = new Map<{x:number, y:number}, number>([
    [TOP, TOP_DIRECTION],
    [RIGHT, RIGHT_DIRECTION],
    [DOWN, DOWN_DIRECTION],
    [LEFT, LEFT_DIRECTION]
  ]);