const ukuleleConfig = {
  action: {
    render: {
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
          <div>
            <ukuleleConfig.action.render.sustain />
          </div>
        ) : null}
      </div>
    );
  },
};
