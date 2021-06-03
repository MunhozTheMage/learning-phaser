import BaseEntity from "./BaseEntity";

import { someKeyDown } from "../utils";

export default class extends BaseEntity {
  state: { movement: { moving: boolean, progress: number, axis: "x" | "y" | null, direction: 1 | -1 | 0 } }

  constructor({ game, x, y, asset } : { game: any, x: number, y: number, asset: string }) {
    super({ game, x, y, asset })

    this.sprite.anchor.setTo(0.5)

    this.state = {
      movement: {
        moving: false,
        progress: 0,
        axis: null,
        direction: 0,
      }
    }
  }

  resetMovementState() {
    this.state.movement.axis = null;
    this.state.movement.direction = 0;
    this.state.movement.moving = false;
    this.state.movement.progress = 0
  }

  setMovingOn(axis: "x" | "y", direction: 1 | -1) {
    this.state.movement.axis = axis;
    this.state.movement.direction = direction;
    this.state.movement.moving = true;
  }

  fluidMoveDetector() {
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
  }

  snapMoveDetector() {
    const speed = 1;
    const tileSize = 10;

    if(!this.state.movement.moving) {
      if (someKeyDown(this.game, [Phaser.Keyboard.LEFT, Phaser.Keyboard.A])) {
        this.setMovingOn("x", -1);
      }
      else if (someKeyDown(this.game, [Phaser.Keyboard.RIGHT, Phaser.Keyboard.D])) {
        this.setMovingOn("x", 1);
      }
      else if (someKeyDown(this.game, [Phaser.Keyboard.UP, Phaser.Keyboard.W])) {
        this.setMovingOn("y", -1);
      }
      else if (someKeyDown(this.game, [Phaser.Keyboard.DOWN, Phaser.Keyboard.S])) {
        this.setMovingOn("y", 1);
      }
    } else {
      this.state.movement.progress + speed <= tileSize ?
        (this.state.movement.progress += speed) && 
        (this.sprite[this.state.movement.axis] += this.state.movement.progress * this.state.movement.direction) :
        (this.sprite[this.state.movement.axis] += (tileSize - this.state.movement.progress) * this.state.movement.direction) &&
        this.resetMovementState()
    }
  }

  update() {
    // this.fluidMoveDetector()
    this.snapMoveDetector()

    if(this.game.input.mouse.wheelDelta !== 0) {
      this.sprite.angle += this.game.input.mouse.wheelDelta * 5;
      this.game.input.mouse.wheelDelta = 0;
    }
  }
}