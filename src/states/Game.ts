declare var __DEV__: string;

import * as Phaser from 'phaser-ce'
import Player from "../entities/Player"

const createLogo = (game: any) => {
  const bannerText = 'Phaser + ES6 + Webpack'
  let banner = game.add.text(game.world.centerX, game.world.height - 80, bannerText)
  banner.font = 'Bangers'
  banner.padding.set(10, 16)
  banner.fontSize = 40
  banner.fill = '#77BFA3'
  banner.smoothed = false
  banner.anchor.setTo(0.5)
}

export default class extends Phaser.State {
  player: Player;

  init () {}
  preload () {}

  create () {
    createLogo(this)

    this.player = new Player({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.player.sprite)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player.sprite, 32, 32)
    }
  }

  update () {
    this.player.update()
  }
}
