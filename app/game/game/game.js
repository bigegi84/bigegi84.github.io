const game = {
  state: {
    screen: [],
    screenPixel: [10, 10],
    screenSize: [20, 20],
    sprite: {
      door: ["game/sprite/door.svg"],
      road: ["game/sprite/road.svg"],
      void: ["game/sprite/void.svg"],
      tileGrass: ["game/sprite/tile_grass.svg"],
      wall: ["game/sprite/wall_4.png"],
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
    changeMap: ([name]) => {
      const [x, y] = game.state.screenPixel;
      const map = game.state.map[name];
      map.forEach((it, i) => {
        game.state.screen[x - 1 - i] = it;
      });
    },
    draw: () => {
      const [x, y] = game.state.screenPixel;
      const screen = game.state.screen;
      const draw = [];
      for (let ix = 0; ix < x; ix++) {
        const drawX = [];
        for (let iy = 0; iy < y; iy++) {
          if (screen[ix] && screen[ix][iy]) {
            const spriteCode = screen[ix][iy];
            drawX.push(
              <div key={iy} className="game-column-a">
                <img
                  key={iy}
                  style={{
                    height: game.state.screenSize[0] + "px",
                    width: game.state.screenSize[1] + "px",
                  }}
                  src={game.state.sprite[spriteCode]}
                />
              </div>
            );
          } else
            drawX.push(
              <div key={iy} className="game-column-a">
                <img
                  key={iy}
                  style={{
                    height: game.state.screenSize[0] + "px",
                    width: game.state.screenSize[1] + "px",
                  }}
                  src={game.state.sprite.void}
                />
              </div>
            );
        }
        draw.push(
          <div key={ix} className="game-row-a">
            {drawX}
          </div>
        );
      }
      return draw;
    },
  },
  view: () => {
    game.action.changeMap(["bigegi84house"]);
    return (
      <div id="screen" className="game-column-a">
        {game.action.draw()}
      </div>
    );
  },
};
