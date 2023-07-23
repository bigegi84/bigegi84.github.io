const gameStore = mobx.observable({
  frame: {
    x: 50,
    y: 50,
  },
  charPosition: {
    x: 5,
    y: 5,
  },
  position: {
    x: 0,
    y: 0,
  },
  world: gameState.world.A(),
});
