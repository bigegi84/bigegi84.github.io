const ukulele = {
  view: () => {
    return (
      <div style={bigegi84theme.style}>
        <div style={{ padding: "3em" }} className="column-a">
          <h1 style={bigegi84theme.style}>bigegi84 - Ukulele</h1>
          <ukuleleInfo.view />
          <ukuleleFret.view />
        </div>
        <bigegi84footer.view />
      </div>
    );
  },
};
