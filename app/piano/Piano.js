const PianoKeymap = {
  depressed: {},
  handleKeyDown: (e) => {
    if (!PianoStore.keymapActive) return;
    e.preventDefault();
    if (PianoKeymap.depressed[e.key]) return;
    PianoKeymap.depressed[e.key] = true;
    var str = PianoState.keymap[e.key];
    if (str) {
      const chordId = "chord-" + str[0] + "-" + str[1];
      let formula = _pianoChord.getFormula(chordId);
      const jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push(x);
        });
      });
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          _pianoNote.handleMouseDown(it);
        }, ms);
        ms = ms + PianoStore.delayMs;
      });
      _pianoChord.handleAnimate(chordId);
      // chordAnimate(chordId);
      // lastChord = jqCode;
    }
  },
  handleKeyUp: (e) => {
    PianoKeymap.depressed[e.key] = false;
    var str = PianoState.keymap[e.key];
    if (str) {
      const chordId = "chord-" + str[0] + "-" + str[1];
      let formula = _pianoChord.getFormula(chordId);
      const jqCode = [];
      formula.forEach((f) => {
        f.split(",").forEach((x) => {
          jqCode.push(x);
        });
      });
      let ms = 0;
      jqCode.forEach((it) => {
        setTimeout(() => {
          _pianoNote.handleMouseUp(it);
        }, ms);
        ms = ms + PianoStore.delayMs;
      });
      _pianoChord.handleAnimate(chordId, false);
      // chordInfo(formula.join(" - "));
    }
  },
};

const Piano = () => {
  return (
    <section
      tabIndex={0}
      onKeyDown={(e) => PianoKeymap.handleKeyDown(e)}
      onKeyUp={(e) => PianoKeymap.handleKeyUp(e)}
      className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right"
    >
      <div className="content">
        <h2 id="title">bigegi84 - Chord Player Piano</h2>
        <div className="major">
          <div id="top" className="column-a">
            <div>
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
            <PianoSheet.view />
          </div>
          <div id="middle" className="row">
            <PianoNote />
          </div>
          <div id="bottom">
            <PianoChord />
          </div>
        </div>
        <br />
        <p className="major">
          <strong>Dukungan</strong>
        </p>
        <ul className="actions stacked">
          <li>
            <a href="#first" className="bigegi84-saweria button big wide">
              Get Started
            </a>
          </li>
          <li>
            <a href="#first" className="bigegi84-paypal button big wide">
              Get Started
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="image">
        <img src="../../template/story/images/banner.jpg" alt="" />
      </div> */}
    </section>
  );
};
