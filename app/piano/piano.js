const piano = {
  view: () => {
    const [infoShow, setInfoShow] = React.useState(false);
    return (
      <div className="conlumn-a" style={{ padding: "3em" }}>
        <h2 id="title" style={bigegi84theme.style}>
          bigegi84 - Piano
        </h2>
        <div className="major column-a">
          <div id="top" className="column-a">
            <div className="column-a">
              <div className="row-a">
                <strong
                  style={{ ...bigegi84theme.style, ...{ alignSelf: "center" } }}
                >
                  Pengaturan
                </strong>
                <div
                  style={bigegi84theme.styleCircle}
                  className="circle-a"
                  onClick={() => setInfoShow(!infoShow)}
                >
                  <i
                    className={
                      "fas" + (infoShow ? " fa-angle-up" : " fa-angle-down")
                    }
                  />
                </div>
              </div>
              {infoShow ? (
                <div className="column-a">
                  <p className="play-info" style={{ margin: 0 }}>
                    <strong>Tipe Bermain:</strong>
                  </p>
                  Ditekan:
                  <strong className="chord-info"></strong>
                  <br />
                  Ditekan (ms):
                  <strong id="timer"></strong>
                  <pianoSustain.view />
                </div>
              ) : null}
            </div>
            <pianoSheet.view />
          </div>
          <div id="middle" className="column-a">
            <pianoNote.view />
          </div>
          <div id="bottom">
            <pianoChord.view />
          </div>
        </div>
      </div>
    );
  },
};
