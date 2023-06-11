const Piano = () => {
  const [infoShow, setInfoShow] = React.useState(false);
  return (
    <section
      tabIndex={0}
      onKeyDown={(e) => PianoKeymap.handleKeyDown(e)}
      onKeyUp={(e) => PianoKeymap.handleKeyUp(e)}
      className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right"
    >
      <div className="content">
        <h2 id="title">bigegi84 - Piano</h2>
        <div className="major column-a">
          <div id="top" className="column-a">
            <div className="column-a">
              <div className="row-a">
                <strong style={{ alignSelf: "center" }}>Pengaturan</strong>
                <div
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
                  <PianoSustain.view />
                </div>
              ) : null}
            </div>
            <PianoSheet.view />
          </div>
          <div id="middle" className="column-a">
            <PianoNote.view />
          </div>
          <div id="bottom">
            <PianoChord.view />
          </div>
        </div>
      </div>
    </section>
  );
};
