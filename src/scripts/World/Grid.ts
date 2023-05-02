import { Entity } from '../Entities/Entity';

export class Grid {
  public matrix: number[][] = [];

  public createMatrix(entities: Entity[][]) {
    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < entities[i].length; j++) {
        const entity = entities[i][j];
        if (!this.matrix[entity.isoPosition.x]) {
          this.matrix[entity.isoPosition.x] = [];
        }
        this.matrix[entity.isoPosition.x][entity.isoPosition.y] = entity.hasBehaviour('ObstacleBehaviour') ? 1 : -1;
      }
    }

    console.log(this.matrix);
  }
}
