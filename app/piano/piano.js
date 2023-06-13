const piano = {
  view: () => {
    const [infoShow, setInfoShow] = React.useState(false);
    return (
      <div
      // style={{
      //   background:
      //     bigegi84store.theme[bigegi84store.theme.value].backgroundColor,
      //   color: bigegi84store.theme[bigegi84store.theme.value].textColor,
      // }}
      >
        <section
          tabIndex={0}
          onKeyDown={(e) => pianoKeymap.handleKeyDown(e)}
          onKeyUp={(e) => pianoKeymap.handleKeyUp(e)}
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
        </section>
        {/* <bigegi84footer.view /> */}
      </div>
    );
  },
};
