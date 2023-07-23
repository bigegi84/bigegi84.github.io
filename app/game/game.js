const game = {
  state: {
    screen: [],
    screenPixel: [10, 10],
    screenSize: [20, 20],
    sprite: {
      door: ["app/game/sprite/door.svg"],
      road: ["app/game/sprite/road.svg"],
      void: ["app/game/sprite/void.svg"],
      tileGrass: ["app/game/sprite/tile_grass.svg"],
      wall: ["app/game/sprite/wall_4.png"],
    },
    map: {
      bigegi84house: [
        [
          "road",
          "road",
          "road",
          "road",
          "road",
          "road",
          "road",
          "road",
          "road",
          "road",
        ],
        [
          "road",
          "road",
          "road",
          "road",
          "road",
          "road",
          "road",
          "road",
          "road",
          "road",
        ],
        [
          "tileGrass",
          "tileGrass",
          "tileGrass",
          "tileGrass",
          "tileGrass",
          "tileGrass",
          "tileGrass",
          "tileGrass",
          "tileGrass",
          "tileGrass",
        ],
        [
          "wall",
          "wall",
          "wall",
          "wall",
          "door",
          "wall",
          "wall",
          "wall",
          "wall",
          "wall",
        ],
      ],
    },
  },
  action: {
    draw: () =>
      _.take(gameStore.world, gameStore.frame.y).map((e, i) => (
        <div key={i} className="game-row-a">
          {_.take(e, gameStore.frame.x + gameStore.position.x)
            .filter((_e, iF) => iF >= gameStore.position.x)
            .map((eA, iA) => (
              <div key={iA} className="game-column-a">
                {i == gameStore.charPosition.y &&
                iA == gameStore.charPosition.x ? (
                  <img
                    style={{
                      position: "absolute",
                      height: game.state.screenSize[0] + "px",
                      width: game.state.screenSize[1] + "px",
                    }}
                    src={gameState.sprite.void.src}
                  />
                ) : null}
                <img
                  style={{
                    height: game.state.screenSize[0] + "px",
                    width: game.state.screenSize[1] + "px",
                  }}
                  src={gameState.sprite[eA].src}
                />
              </div>
            ))}
        </div>
      )),
  },
  view: () => {
    return (
      <div className="column-a">
        <bigegi84View.letsRock
          observer={() => (
            <div id="screen" className="game-column-a">
              {game.action.draw()}
            </div>
          )}
        />
        <bigegi84View.letsRock
          column={{
            row: {
              buttonSmallKiri: () => {
                // gameStore.charPosition.x--;
                gameStore.position.x--;
              },
              buttonSmallKanan: () => {
                // gameStore.charPosition.x++;
                gameStore.position.x++;
              },
            },
          }}
        />
      </div>
    );
  },
};
