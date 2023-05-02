/**
 * Преобразует экранные координаты контейнера в изометрические и наоботрот
 */
export default class IsoUtils {
  public static tileWidth: number = 111;
  public static tileHeight: number = 66;

  public static deltaX: number = 0;
  public static deltaY: number = 0;

  public static setDelta(deltaX: number, deltaY: number) {
    IsoUtils.deltaX = deltaX;
    IsoUtils.deltaY = deltaY;
  }

  /**
   * Преобразует экранные координаты контейнера в изометрические
   * @param	x - экранная x
   * @param	y - экранная y
   * @return	Object(x:isox, y:0, z:isoZ)
   */
  public static toIso(x: number, y: number): Phaser.Geom.Point {
    x -= IsoUtils.deltaX;
    y += IsoUtils.deltaY;

    var vx = y / IsoUtils.tileHeight + x / IsoUtils.tileWidth;
    var vy = -(x / IsoUtils.tileWidth) + y / IsoUtils.tileHeight;

    var isoX: number = Math.floor(vx);
    var isoZ: number = Math.floor(vy);

    return new Phaser.Geom.Point(isoX, isoZ);
  }

  /**
   * Преобразует изометрические координаты в экранные координаты контейнера
   * @param	isoX - изометрическая x
   * @param	isoZ - изометрическая z
   * @return	Object{x:x, y:y}
   */
  public static toWorld(isoX: number, isoZ: number, delta: boolean = true): Phaser.Geom.Point {
    var x = ((isoX - isoZ) * IsoUtils.tileWidth) / 2;
    var y = ((isoX + isoZ) * IsoUtils.tileHeight) / 2;

    return new Phaser.Geom.Point(x + (delta ? IsoUtils.deltaX : 0), y - (delta ? IsoUtils.deltaY : 0));
  }
}
