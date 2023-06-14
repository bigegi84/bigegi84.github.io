const ukuleleChord = {
  action: {
    mouse: {
      down: (e) => {},
      up: (e) => {},
    },
    rederChord: () => {
      const view = [];
      for (var x in ukuleleState.chord) {
        const yHtml = [];
        for (var y in ukuleleState.chord[x]) {
          yHtml.push(
            <div
              key={y}
              id={"ukulele-chord-" + x + "-" + y}
              className={
                y.search("b") == -1 ? "ukulele-chord" : "ukulele-chord-mol"
              }
            >
              {y}
            </div>
          );
        }
        view.push(
          <div key={x} id={"ukulele-chord-line-" + x} className="column-a">
            {yHtml}
          </div>
        );
      }
      return <div className="row-a">{view}</div>;
    },
  },
  view: () => {
    const [show, setShow] = React.useState(false);
    return (
      <div className="column-a">
        <div className="row-a">
          <strong
            style={{ ...bigegi84theme.style, ...{ alignSelf: "center" } }}
          >
            {bigegi84localization["Chord"]["id"]}
          </strong>
          <div
            style={bigegi84theme.styleCircle}
            className="circle-a"
            onClick={() => setShow(!show)}
          >
            <i className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")} />
          </div>
        </div>
        {show ? ukuleleChord.action.rederChord() : null}
      </div>
    );
  },
};
