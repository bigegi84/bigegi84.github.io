const pixelArtImage = {
  state: {
    color: bigegi84color,
    canvas: [5, 5, 20],
  },
  store: mobx.observable({
    textShow: false,
    image: [
      [
        "Ninja",
        [
          ["8", "8", "8", "8", "8"],
          ["9", "10", "9", "10", "9"],
          ["11", "8", "8", "8", "11"],
          ["8", "8", "8", "8", "8"],
          ["1", "11", "1", "11", "1"],
        ],
      ],
      [
        "Colorful 1",
        [
          [0, 1, 2, 3, 4],
          [5, 6, 7, 8, 9],
          [10, 11, 12, 13, 14],
          [15, 16, 17, 18, 19],
          [20, 21, 22, 23, 24],
        ],
      ],
      [
        "Colorful 2",
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
      [
        "Kirby",
        [
          ["1", "3", "3", "3", "1"],
          ["3", "6", "3", "6", "3"],
          ["3", "7", "3", "7", "3"],
          ["1", "3", "3", "3", "1"],
          ["5", "5", "1", "5", "5"],
        ],
      ],
    ],
  }),
  action: {
    colorAll: () => {
      const [, , scale] = pixelArtImage.state.canvas;
      return pixelArtImage.state.color.map((it, i) => (
        <svg
          key={i}
          id={"color-" + i}
          xmlns="http://www.w3.org/2000/svg"
          width={1 * scale}
          height={1 * scale}
          style={{
            border:
              "1px solid " +
              bigegi84store.theme[bigegi84store.theme.value].textColor,
          }}
          alt="coba"
        >
          <title>{i}</title>
          <rect x={0} y={0} width={scale} height={scale} style={{ fill: it }} />
        </svg>
      ));
    },
    draw: ([iImg, margin = 2]) => {
      const [x, y, scale] = pixelArtImage.state.canvas;
      const color = pixelArtImage.state.color;
      const [text, image] = pixelArtImage.store.image[iImg];
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
          id={"svg-" + iImg}
          xmlns="http://www.w3.org/2000/svg"
          width={x * scale}
          height={y * scale}
        >
          {svgChild}
        </svg>
      );
    },
    drawAll: () => {
      return pixelArtImage.store.image.map((it, i) => {
        return (
          <div key={i} className={"column-a"} style={{ alignItems: "center" }}>
            {pixelArtImage.action.draw([i])}
            <strong
              style={{
                color: bigegi84store.theme[bigegi84store.theme.value].textColor,
              }}
            >
              {it[0]}
            </strong>
            {pixelArtImage.store.textShow ? (
              <div className="column-a">
                <textarea
                  value={pixelArtImage.action.toText(it[1])}
                  onChange={(e) => {
                    pixelArtImage.store.image[i][1] =
                      pixelArtImage.action.toArray(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    var svgData = document.getElementById("svg-" + i);
                    var serializer = new XMLSerializer();
                    var source = serializer.serializeToString(svgData);
                    if (
                      !source.match(
                        /^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/
                      )
                    ) {
                      source = source.replace(
                        /^<svg/,
                        '<svg xmlns="http://www.w3.org/2000/svg"'
                      );
                    }
                    if (
                      !source.match(
                        /^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/
                      )
                    ) {
                      source = source.replace(
                        /^<svg/,
                        '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
                      );
                    }
                    source =
                      '<?xml version="1.0" standalone="no"?>\r\n' + source;
                    var url =
                      "data:image/svg+xml;charset=utf-8," +
                      encodeURIComponent(source);
                    var downloadLink = document.createElement("a");
                    downloadLink.href = url;
                    downloadLink.download = it[0] + ".svg";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                  }}
                >
                  simpan
                </button>
              </div>
            ) : null}
          </div>
        );
      });
    },
    toText: (arr) => arr.map((x) => x.join(" ")).join("\n"),
    toArray: (txt) => txt.split("\n").map((x) => x.split(" ")),
  },
  view: () => {
    return (
      <div className="column-a" style={{ padding: "3em" }}>
        <h2
          style={{
            background:
              bigegi84store.theme[bigegi84store.theme.value].backgroundColor,
            color: bigegi84store.theme[bigegi84store.theme.value].textColor,
          }}
        >
          bigegi84 - Pixel Art
        </h2>
        <div className="row-a">
          <mobxReact.Observer>
            {() => (
              <div
                className="circle-a"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px " +
                    bigegi84store.theme[bigegi84store.theme.value].textColor,
                }}
                onClick={() =>
                  (pixelArtImage.store.textShow = !pixelArtImage.store.textShow)
                }
              >
                <i
                  className={
                    "fas" +
                    (pixelArtImage.store.textShow
                      ? " fa-angle-up"
                      : " fa-angle-down")
                  }
                />
              </div>
            )}
          </mobxReact.Observer>
          <mobxReact.Observer>
            {() => (
              <div
                className="circle-a"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px " +
                    bigegi84store.theme[bigegi84store.theme.value].textColor,
                }}
                onClick={() => {
                  const image = pixelArtImage.store.image;
                  image.unshift([
                    "new",
                    [
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                    ],
                  ]);
                }}
              >
                <i className={"fas" + " fa-plus"} />
              </div>
            )}
          </mobxReact.Observer>
          <mobxReact.Observer>
            {() => (
              <div
                className="circle-a"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px " +
                    bigegi84store.theme[bigegi84store.theme.value].textColor,
                }}
                onClick={() => {
                  const dataStr =
                    "data:text/json;charset=utf-8," +
                    encodeURIComponent(
                      JSON.stringify(pixelArtImage.store.image)
                    );
                  const dlAnchorElem = document.getElementById("downloadA");
                  dlAnchorElem.setAttribute("href", dataStr);
                  dlAnchorElem.setAttribute("download", "image.json");
                  dlAnchorElem.click();
                }}
              >
                <a id="downloadA" style={{ display: "none" }}></a>
                <i className={"fas" + " fa-file-export"} />
              </div>
            )}
          </mobxReact.Observer>
        </div>
        <div className="row-a">
          <div className="row-a">
            <mobxReact.Observer>
              {() =>
                pixelArtImage.store.textShow
                  ? pixelArtImage.action.colorAll()
                  : null
              }
            </mobxReact.Observer>
          </div>
          <mobxReact.Observer>
            {() => pixelArtImage.action.drawAll()}
          </mobxReact.Observer>
        </div>
      </div>
    );
  },
};
