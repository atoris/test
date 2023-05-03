/**
 * Grid width for drawing buttons
 */
export class GridPanel extends Phaser.GameObjects.Container {
  public addItem(item: Phaser.GameObjects.Container | Phaser.GameObjects.Container[]): GridPanel {
    this.add(item);

    let width: number = 0;
    let height: number = 0;
    let itemWidth: number = 0;

    for (let i = 0; i < this.list.length; i++) {
      const container = this.list[i] as Phaser.GameObjects.Container;
      itemWidth = container.width;
      width += container.width;
      container.x = -itemWidth / 2 + itemWidth * i;
      height = container.height > height ? container.height : height;
    }

    this.width = width;
    this.height = height;

    return this;
  }
}
