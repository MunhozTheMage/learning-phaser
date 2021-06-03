import * as Phaser from 'phaser-ce';

export const centerGameObjects = (objects: Phaser.Sprite[]) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const someKeyDown = (game: any, keys: number[]) => 
  keys.some(key => game.input.keyboard.isDown(key))
