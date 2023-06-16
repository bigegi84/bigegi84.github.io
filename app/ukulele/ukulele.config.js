const ukuleleConfig = {
  action: {
    render: {
      mode: () => {
        return (
          <div>
            <mobxReact.Observer>
              {() => (
                <div className="field third column-a">
                  <strong style={bigegi84theme.style}>Mode: </strong>
                  <div>
                    <input
                      type="radio"
                      id="ukulele-mode-chord"
                      name="mode"
                      checked={ukuleleStore.mode[0] == "Chord"}
                      onChange={() => (ukuleleStore.mode[0] = "Chord")}
                      value="Chord"
                    />
                    <label
                      htmlFor="ukulele-mode-chord"
                      className={bigegi84theme.class.input}
                    >
                      Chord
                    </label>
                    <input
                      type="radio"
                      id="ukulele-mode-solo"
                      name="mode"
                      value="Solo"
                      checked={ukuleleStore.mode[0] == "Solo"}
                      onChange={() => (ukuleleStore.mode[0] = "Solo")}
                    />
                    <label
                      htmlFor="ukulele-mode-solo"
                      className={bigegi84theme.class.input}
                    >
                      Solo
                    </label>
                  </div>
                </div>
              )}
            </mobxReact.Observer>
          </div>
        );
      },
      sustain: () => {
        return (
          <div>
            <mobxReact.Observer>
              {() => (
                <div className="field half">
                  <input
                    type="checkbox"
                    id="ukulele-sustain-active"
                    name="ukulele-sustain-active"
                    checked={ukuleleStore.sustain.active}
                    onChange={(e) =>
                      (ukuleleStore.sustain.active = e.target.checked)
                    }
                  />
                  <label
                    htmlFor="ukulele-sustain-active"
                    className={bigegi84theme.class.input}
                  >
                    Sustain
                  </label>
                </div>
              )}
            </mobxReact.Observer>
          </div>
        );
      },
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
            {bigegi84localization["Config"]["id"]}
          </strong>
          <div
            style={bigegi84theme.styleCircle}
            className="circle-a"
            onClick={() => setShow(!show)}
          >
            <i className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")} />
          </div>
        </div>
        {show ? (
          <div className="column-a">
            <ukuleleConfig.action.render.mode />
            <ukuleleConfig.action.render.sustain />
          </div>
        ) : null}
      </div>
    );
  },
};
