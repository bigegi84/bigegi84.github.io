const pianoConfig = {
  action: {
    render: {
      keymapSelect: mobxReact.observer(() => (
        <div>
          <select
            value={pianoStore.keymap}
            onChange={(e) => {
              pianoStore.keymap = e.target.value;
              console.log(pianoStore.keymap);
            }}
          >
            {[
              ["us", "Amerika Serikat"],
              ["jp", "Jepang"],
            ].map(([x, y], i) => (
              <option key={i} value={x}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )),
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
            Pengaturan
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
            <strong className={bigegi84theme.class.basic}>Tipe Bermain:</strong>
            <p style={{ margin: 0 }} className={bigegi84theme.class.basic}></p>
            <strong id="timer"></strong>
            <pianoSustain.view />
            <pianoConfig.action.render.keymapSelect />
          </div>
        ) : null}
      </div>
    );
  },
};
