const chordAdmin = {
  action: {},
  view: () => {
    // chord.action.loadState();
    var result = <div>coba</div>;
    load("app/chordAdmin/song/chordAdmin.song.js", () => {
      result = (
        <bigegi84View.letsRock
          container={{
            viewA: (
              <h1 className={bigegi84theme.class.basic}>
                bigegi84 - Akor Admin
              </h1>
            ),
            viewC: (
              <bigegi84View.letsRock
                observer={() =>
                  chordAdminStore.token ? (
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
    });
    return <div>{result}</div>;
    return (
      <bigegi84View.letsRock
        container={{
          viewA: (
            <h1 className={bigegi84theme.class.basic}>bigegi84 - Akor Admin</h1>
          ),
          viewC: (
            <bigegi84View.letsRock
              observer={() =>
                chordAdminStore.token ? (
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
