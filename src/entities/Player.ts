import BaseEntity from "./BaseEntity";

import { someKeyDown } from "../utils";

export default class extends BaseEntity {
  constructor({ game, x, y, asset } : { game: any, x: number, y: number, asset: string }) {
    super({ game, x, y, asset })

    this.sprite.anchor.setTo(0.5)
  }

  update() {
    if (someKeyDown(this.game, [Phaser.Keyboard.LEFT, Phaser.Keyboard.A])) {
      this.transformX(
        this.sprite.x - 5 >= 0 ? -5 : -(this.sprite.x)
      )
    }
    else if (someKeyDown(this.game, [Phaser.Keyboard.RIGHT, Phaser.Keyboard.D])) {
      this.transformX(
        this.sprite.x + 5 <= this.game.world.width ? 5 : this.game.world.width - this.sprite.x
      )
    }

    if (someKeyDown(this.game, [Phaser.Keyboard.UP, Phaser.Keyboard.W])) {
      this.transformY(
        this.sprite.y - 5 >= 0 ? -5 : -(this.sprite.y)
      )
    }
    else if (someKeyDown(this.game, [Phaser.Keyboard.DOWN, Phaser.Keyboard.S])) {
      this.transformY(
        this.sprite.y + 5 <= this.game.world.height ? 5 : this.game.world.height - this.sprite.y
      )
    }

    if(this.game.input.mouse.wheelDelta !== 0) {
      this.sprite.angle += this.game.input.mouse.wheelDelta * 5;
      this.game.input.mouse.wheelDelta = 0;
    }
  }
}