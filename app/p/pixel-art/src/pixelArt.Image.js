const pixelArtImage = {
  state: {
    color: bigegi84color,
    canvas: [5, 5, 20],
  },
  store: mobx.observable({
    textShow: false,
    image: [
      [
        "Piramid Gold",
        [
          ["", "", "85", "", ""],
          ["", "85", "85", "85", ""],
          ["85", "85", "74", "85", "85"],
          ["85", "74", "74", "74", "85"],
          ["74", "74", "74", "74", "74"],
        ],
      ],
      [
        "Ninja A",
        [
          ["8", "8", "8", "8", "8"],
          ["9", "10", "9", "10", "9"],
          ["11", "8", "8", "8", "11"],
          ["8", "8", "8", "8", "8"],
          ["", "11", "", "11", ""],
        ],
      ],
      [
        "Ninja B",
        [
          ["25", "25", "25", "25", "25"],
          ["25", "21", "25", "21", "25"],
          ["20", "25", "25", "25", "20"],
          ["25", "25", "25", "25", "25"],
          ["", "20", "", "20"],
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
          ["6", "7", "2", "3", ""],
          ["14", "", "", "", "9"],
          ["10", "11", "12", "13", ""],
          ["7", "", "", "", "19"],
          ["20", "21", "22", "23", ""],
        ],
      ],
      [
        "bigegi84-8",
        [
          ["", "7", "2", "3", ""],
          ["14", "", "", "", "9"],
          ["", "11", "12", "13", ""],
          ["7", "", "", "", "19"],
          ["", "21", "22", "23", ""],
        ],
      ],
      [
        "bigegi84-4",
        [
          ["6", "", "", "", "7"],
          ["14", "", "", "", "9"],
          ["", "11", "12", "13", "21"],
          ["", "", "", "", "19"],
          ["", "", "", "", "23"],
        ],
      ],
      [
        "Pikachu",
        [
          ["21", "", "", "", "21"],
          ["25", "21", "25", "21", "25"],
          ["", "20", "25", "20", ""],
          ["25", "25", "25", "25", "25"],
          ["", "25", "", "25", ""],
        ],
      ],
      [
        "Kucing Oren",
        [
          ["20", "", "20", "", "40"],
          ["19", "20", "19", "", "20"],
          ["20", "20", "20", "20", "20"],
          ["20", "20", "20", "20", "20"],
          ["20", "", "20", "", "20"],
        ],
      ],
      [
        "Pedang",
        [
          ["", "", "", "40", "40"],
          ["", "", "40", "40", "40"],
          ["14", "14", "40", "40", ""],
          ["", "47", "14", "", ""],
          ["47", "", "14", "", ""],
        ],
      ],
      [
        "Kirby",
        [
          ["", "3", "3", "3", ""],
          ["3", "6", "3", "6", "3"],
          ["3", "7", "3", "7", "3"],
          ["", "3", "3", "3", ""],
          ["5", "5", "", "5", "5"],
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
                <button onClick={() => pixelArtImage.action.export.svg([i])}>
                  simpan
                </button>
              </div>
            ) : null}
          </div>
        );
      });
    },
    export: {
      svg: ([i]) => {
        var svgData = document.getElementById("svg-" + i);
        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svgData);
        if (
          !source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)
        ) {
          source = source.replace(
            /^<svg/,
            '<svg xmlns="http://www.w3.org/2000/svg"'
          );
        }
        if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
          source = source.replace(
            /^<svg/,
            '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
          );
        }
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        var url =
          "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        var downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "image.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      },
      png: ([i]) => {
        const img = new Image();
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(
          document.getElementById("svg-" + i)
        );

        img.src = "data:image/svg+xml;base64," + window.btoa(svgStr);

        // You could also use the actual string without base64 encoding it:
        //img.src = "data:image/svg+xml;utf8," + svgStr;
        img.onload = () => {
          var canvas = document.createElement("canvas");

          var w = 200;
          var h = 200;

          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, w / 5, w / 5, w - (h / 5) * 2, h - (h / 5) * 2);

          var imgURL = canvas.toDataURL("image/png");

          var dlLink = document.createElement("a");
          dlLink.download = "image";
          dlLink.href = imgURL;
          dlLink.dataset.downloadurl = [
            "image/png",
            dlLink.download,
            dlLink.href,
          ].join(":");

          document.body.appendChild(dlLink);
          dlLink.click();
          document.body.removeChild(dlLink);
        };
      },
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
