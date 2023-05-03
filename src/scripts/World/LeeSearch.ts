import { Position } from '../Providers/WorldProvider';

/**
 * wave search algorithm
 */
export class LeeSearch {
  /**
   * wave algorithm for finding a circle from a cell
   * @param grid matrix of passability 1 wall
   * @param start start point
   * @param limit step limit
   * @returns returns the walkability matrix, where 0 is an empty cell, -1 is occupied or is outside the step limit
   */
  public floodFill(grid: number[][], start: Position, limit: number): number[][] {
    const visited: boolean[][] = [];
    const result: number[][] = [];

    for (let i = 0; i < grid.length; i++) {
      visited[i] = [];
      result[i] = [];
      for (let j = 0; j < grid[i].length; j++) {
        visited[i][j] = false;
        result[i][j] = -1;
      }
    }

    const queue: [number, number, number][] = [[start.x, start.y, 0]];

    while (queue.length > 0) {
      const [x, y, steps] = queue.shift()!;
      if (visited[x][y] || steps > limit) {
        continue;
      }

      visited[x][y] = true;

      if (grid[x][y] === 1) {
        result[x][y] = -1;
        continue;
      }

      result[x][y] = 0;

      if (x > 0) {
        queue.push([x - 1, y, steps + 1]);
      }
      if (x < grid.length - 1) {
        queue.push([x + 1, y, steps + 1]);
      }
      if (y > 0) {
        queue.push([x, y - 1, steps + 1]);
      }
      if (y < grid[0].length - 1) {
        queue.push([x, y + 1, steps + 1]);
      }
    }

    return result;
  }
}
