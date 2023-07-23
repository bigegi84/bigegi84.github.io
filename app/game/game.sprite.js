const gameSprite = {
  state: {
    color: bigegi84color,
    canvas: [5, 5, 20],
    image: [
      [
        "Color 1",
        [
          [0, 1, 2, 3, 4],
          [5, 6, 7, 8, 9],
          [10, 11, 12, 13, 14],
          [15, 16, 17, 18, 19],
          [20, 21, 22, 23, 24],
        ],
      ],
      [
        "Color 2",
        [
          [25, 26, 27, 28, 29],
          [30, 31, 32, 33, 34],
          [35, 36, 37, 38, 39],
          [40, 16, 17, 18, 19],
          [20, 21, 22, 23, 24],
        ],
      ],
      [
        "bigegi84-b",
        [
          [6, 7, 2, 3, 1],
          [14, 1, 1, 1, 9],
          [10, 11, 12, 13, 1],
          [7, 1, 1, 1, 19],
          [20, 21, 22, 23, 1],
        ],
      ],
      [
        "bigegi84-8",
        [
          [1, 7, 2, 3, 1],
          [14, 1, 1, 1, 9],
          [1, 11, 12, 13, 1],
          [7, 1, 1, 1, 19],
          [1, 21, 22, 23, 1],
        ],
      ],
      [
        "bigegi84-4",
        [
          [6, 1, 1, 1, 7],
          [14, 1, 1, 1, 9],
          [1, 11, 12, 13, 21],
          [1, 1, 1, 1, 19],
          [1, 1, 1, 1, 23],
        ],
      ],
    ],
  },
  action: {
    draw: ([iImg]) => {
      const [x, y, scale] = gameSprite.state.canvas;
      const color = gameSprite.state.color;
      const [text, image] = gameSprite.state.image[iImg];
      const svgChild = [];
      for (let iy = 0; iy < x; iy++) {
        for (let ix = 0; ix < y; ix++) {
          if (image[iy] != null && image[ix][iy] != null) {
            const iColor = image[ix][iy];
            svgChild.push(
              <rect
                key={iy + " " + ix}
                x={iy * scale}
                y={ix * scale}
                width={scale}
                height={scale}
                style={{ fill: color[iColor] }}
              />
            );
          }
        }
      }
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={x * scale}
          height={y * scale}
        >
          {svgChild}
        </svg>
      );
    },
  },
  view: () => {
    const imgA = gameSprite.action.draw([0]);
    return (
      <div className="row-a">
        {imgA}
        {gameSprite.action.draw([1])}
        {gameSprite.action.draw([2])}
        {gameSprite.action.draw([3])}
        {gameSprite.action.draw([4])}
      </div>
    );
  },
};
