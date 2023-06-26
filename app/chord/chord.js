const chord = {
  view: () => {
    return (
      <div className={"column-a"} style={{ padding: "3em" }}>
        <h1 className={bigegi84theme.class.basic}>bigegi84 - Akor</h1>
        <chordConfig.view />
        <chordSong.view />
      </div>
    );
  },
};
