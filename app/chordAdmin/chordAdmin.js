const chordAdmin = {
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
    // chord.action.loadState();
    return (
      <bigegi84View.letsRock
        container={{
          viewA: (
            <h1 className={bigegi84theme.class.basic}>bigegi84 - Akor Admin</h1>
          ),
          viewC: (
            <bigegi84View.letsRock
              observer={() =>
                chordAdminState.apiToken ? (
                  <chordAdminSong.view />
                ) : (
                  <chordAdminLogin.view />
                )
              }
            />
          ),
        }}
      />
    );
  },
};
