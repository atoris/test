import { Position } from '../Providers/WorldProvider';

interface Node {
  point: Position;
  distance: number;
  parent?: Node;
}

type Cell = { coord: Position; isOccupied: boolean; value: number };

export class LeeSearch {
  public findPath(start: Position, end: Position, grid: number[][]): Position[] {
    const queue: Node[] = [{ point: start, distance: 0 }];
    const visited = new Set<string>();
    const getHash = (point: Position) => `${point.x},${point.y}`;

    while (queue.length > 0) {
      let current = queue.shift()!;
      if (current.point.x === end.x && current.point.y === end.y) {
        const path: Position[] = [end];
        while (current.parent) {
          path.unshift(current.parent.point);
          current = current.parent;
        }
        return path;
      }

      for (const neighbor of this.getNeighbors(current.point, grid)) {
        const neighborHash = getHash(neighbor);
        if (!visited.has(neighborHash)) {
          queue.push({
            point: neighbor,
            distance: current.distance + 1,
            parent: current,
          });
          visited.add(neighborHash);
        }
      }
    }

    return [];
  }

  private getNeighbors(point: Position, grid: number[][]): Position[] {
    const neighbors: Position[] = [];
    for (let x = point.x - 1; x <= point.x + 1; x++) {
      for (let y = point.y - 1; y <= point.y + 1; y++) {
        if (x === point.x && y === point.y) {
          continue;
        }
        if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
          continue;
        }
        if (grid[x][y] == 1) {
          continue;
        }
        neighbors.push({ x, y });
      }
    }
    return neighbors;
  }

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

  public findEmpty(grid: number[][], start: Position, count: number = 0): { x: number; y: number }[] {
    var normalize: number[][] = [];
    normalize.push([start.y, start.x]);

    var toVisit = normalize;

    var result: Position[] = [];

    while (toVisit.length) {
      var x = toVisit[0][0];
      var y = toVisit[0][1];

      for (var i = x - 1; i < x + 2; i++) {
        for (var j = y - 1; j < y + 2; j++) {
          if (grid[i][j] == 0) {
            toVisit.push([i, j]);
          } else if (grid[i][j] == -1) {
            result.push({ x: j, y: i });
            if (count && result.length == count) {
              return result;
            }
          }

          grid[i][j] = grid[x][y] + 1;
        }
      }
      toVisit.shift();
    }

    return result;
  }

  public find(grid: number[][], start: Position, steps: number) {
    const visited: Position[][] = [[start]];
    const directions: Position[] = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
      { x: -1, y: -1 },
      { x: -1, y: 1 },
    ];

    let side = 0;

    for (let i = 0; i < steps; i++) {
      const last: Position[] = visited[visited.length - 1];
      for (let j = 0; j < last.length; j++) {
        for (let d = 0; d < directions.length; d++) {
          const dir = directions[d];
          if (
            last[j].x + dir.x < 0 ||
            last[j].x + dir.x > grid.length ||
            last[j].y + dir.y < 0 ||
            last[j].y + dir.y > grid[0].length
          ) {
            continue;
          }
          if (!visited[i + 1]) {
            visited[i + 1] = [];
          }
          visited[i + 1].push({
            x: last[j].x + dir.x,
            y: last[j].y + dir.y,
          });
        }
        side = i + (1 % 2) == 0 ? 0 : 1;
      }
    }

    return visited;
  }
}
