import * as Phaser from 'phaser-ce'

export default class BaseEntity {
  x: number
  y: number
  game: any
  asset: string
  sprite: Phaser.Sprite

  constructor({ game, x, y, asset } : { game: any, x: number, y: number, asset: string }) {
    this.game = game
    this.asset = asset

    this.sprite = new Phaser.Sprite(this.game, x, y, this.asset);
  }

  transformX(x: number) {
    const newX = this.sprite.x + x
    this.sprite.x = newX
  }

  transformY(y: number) {
    const newY = this.sprite.y + y
    this.sprite.y = newY
  }

  transform(x: number, y: number) {
    this.transformX(x)
    this.transformY(y)
  }
}