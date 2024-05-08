const chord = {
  action: {
    loadState: async () => {
      const text = await bigegi84File.get(
        "https://raw.githubusercontent.com/bigegi84/bigegi84-state/main/yaml/bigegi84-chord.yaml"
      );
      const json = jsyaml.load(text);
      for (const key in json) if (key != "form") chordStore[key] = json[key];
    },
  },
  view: () => {
    chord.action.loadState();
    return (
      <bigegi84View.letsRock
        container={{
          viewA: <h1 className={bigegi84theme.class.basic}>bigegi84 - Akor</h1>,
          viewB: <chordConfig.view />,
          viewC: <chordSong.view />,
        }}
      />
    );
  },
};
