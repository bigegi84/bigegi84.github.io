const pixelArtImage = {
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
      [
        "Pikachu",
        [
          [21, 1, 1, 1, 21],
          [25, 21, 25, 21, 25],
          [1, 20, 25, 20, 1],
          [25, 25, 25, 25, 25],
          [1, 25, 1, 25, 1],
        ],
      ],
      [
        "Kucing Oren",
        [
          [20, 1, 20, 1, 40],
          [19, 20, 19, 1, 20],
          [20, 20, 20, 20, 20],
          [20, 20, 20, 20, 20],
          [20, 1, 20, 1, 20],
        ],
      ],
      [
        "Pedang",
        [
          [1, 1, 1, 40, 40],
          [1, 1, 40, 40, 40],
          [14, 14, 40, 40, 1],
          [1, 47, 14, 1, 1],
          [47, 1, 14, 1, 1],
        ],
      ],
    ],
  },
  action: {
    draw: ([iImg]) => {
      const [x, y, scale] = pixelArtImage.state.canvas;
      const color = pixelArtImage.state.color;
      const [text, image] = pixelArtImage.state.image[iImg];
      const svgChild = [];
      for (let iy = 0; iy < x; iy++) {
        for (let ix = 0; ix < y; ix++) {
          if (image[iy] != null && image[ix][iy] != null) {
            const iColor = image[ix][iy];
            console.log(iColor);
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
    drawAll: () => {
      return pixelArtImage.state.image.map((it, i) => (
        <div key={i} className={"column-a"} style={{ alignItems: "center" }}>
          {pixelArtImage.action.draw([i])}
          <strong>{it[0]}</strong>
        </div>
      ));
    },
  },
  view: () => {
    return <div className="row-a">{pixelArtImage.action.drawAll()}</div>;
  },
};
