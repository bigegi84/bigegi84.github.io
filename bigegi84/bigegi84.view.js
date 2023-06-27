const bigegi84View = {
  card: ({ children }) => (
    <div className="bigegi84-column bigegi84-card">{children}</div>
  ),
  circle: ({ label, onClick, iClassName }) => (
    <bigegi84View.row>
      {label ? (
        <strong
          className={bigegi84theme.class.basic}
          style={{ alignSelf: "center" }}
        >
          {label}
        </strong>
      ) : null}
      <div
        style={bigegi84theme.styleCircle}
        className="circle-a"
        onClick={() => (onClick ? onClick() : () => {})}
      >
        <i className={iClassName} />
      </div>
    </bigegi84View.row>
  ),
  column: ({ gap, children }) => (
    <div className="bigegi84-column" style={{ gap: gap ? gap : "10px" }}>
      {children}
    </div>
  ),
  listCard: ({ arr, onMap }) =>
    arr.map((e, i) => (onMap ? onMap(e, i) : () => {})),
  row: ({ gap, children }) => (
    <div className="bigegi84-row" style={{ gap: gap ? gap : "10px" }}>
      {children}
    </div>
  ),
  text: ({ label, fontSize }) => (
    <p
      className={bigegi84theme.class.basic + " bigegi84-text"}
      style={{ fontSize: fontSize ? fontSize : "medium" }}
    >
      {label ? label : ""}
    </p>
  ),
  textStrong: ({ label, color }) => (
    <strong
      className={bigegi84theme.class.basic}
      style={{ ...(color ? { color: color } : {}) }}
    >
      {label ? label : ""}
    </strong>
  ),
  render: (props) => {
    bigegi84View.render({
      circle: {
        i: {
          onClick: () => {
            alert("halo");
          },
        },
      },
    });
    if (typeof props === "object") {
    }
  },
};
