const chord = {
  action: {
    loadState: async () => {
      const text = await bigegi84File.get(
        "https://bigegi84.000webhostapp.com/app-state/bigegi84-Chord.yaml"
      );
      const json = jsyaml.load(text);
      for (const key in json) if (key != "form") chordStore[key] = json[key];
    },
  },
  view: () => {
    chord.action.loadState();
    return (
      <div className={"column-a"} style={{ padding: "3em" }}>
        <h1 className={bigegi84theme.class.basic}>bigegi84 - Akor</h1>
        <chordConfig.view />
        <chordSong.view />
      </div>
    );
  },
};
