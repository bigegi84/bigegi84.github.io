const bigegi84Navbar = {
  view: (props) => {
    return (
      <div
        style={{
          padding: "1em",
          boxShadow:
            "inset 0 1px 0 0 " +
            bigegi84store.theme[bigegi84store.theme.value].textColor,
        }}
        className="row-a"
      >
        <div
          style={bigegi84theme.styleCircle}
          className="circle-a"
          onClick={() => {
            props.history.push("/");
          }}
        >
          <i className={"fa-solid fa-house"} />
        </div>
      </div>
    );
  },
};
