const guitarConfig = {
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
                      id="guitar-mode-chord"
                      name="mode"
                      checked={guitarStore.mode[0] == "Chord"}
                      onChange={() => (guitarStore.mode[0] = "Chord")}
                      value="Chord"
                      style={bigegi84theme.style}
                    />
                    <label
                      htmlFor="guitar-mode-chord"
                      style={bigegi84theme.style}
                    >
                      Chord
                    </label>
                    <input
                      type="radio"
                      id="guitar-mode-solo"
                      name="mode"
                      value="Solo"
                      checked={guitarStore.mode[0] == "Solo"}
                      onChange={() => (guitarStore.mode[0] = "Solo")}
                      style={bigegi84theme.style}
                    />
                    <label
                      htmlFor="guitar-mode-solo"
                      style={bigegi84theme.style}
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
                    id="guitar-sustain-active"
                    name="guitar-sustain-active"
                    checked={guitarStore.sustain.active}
                    onChange={(e) =>
                      (guitarStore.sustain.active = e.target.checked)
                    }
                  />
                  <label
                    htmlFor="guitar-sustain-active"
                    style={bigegi84theme.style}
                    className={"checkbox-white"}
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
            <guitarConfig.action.render.mode />
            <guitarConfig.action.render.sustain />
          </div>
        ) : null}
      </div>
    );
  },
};
