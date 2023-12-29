const chordAdminSong = {
  action: {
    add: () => {
      if (!chordSong.action.validate()) return;
      const { name, owner, balance } = chordStore.form.account;
      bigegi84Orm.obj.createOne(chordStore.account, {
        name,
        owner,
        balance,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      });
      chordStore.account = bigegi84Orm.obj.sort(chordStore.account, "name");
      chordStore.form.account = {
        mode: null,
        i: null,
        name: "",
        owner: "",
        balance: "",
      };
    },
    form: () => {
      return (
        <mobxReact.Observer>
          {() => (
            <bigegi84View.letsRock
              column={{
                inputTextJudul: [
                  chordAdminSongStore.form.title,
                  (value) => (chordAdminSongStore.form.title = value),
                ],
                inputTextareaLirik: [
                  chordAdminSongStore.form.lyric,
                  (value) => (chordAdminSongStore.form.lyric = value),
                ],
                inputTextPenyanyi: [
                  chordAdminSongStore.form.artist,
                  (value) => (chordAdminSongStore.form.artist_name = value),
                ],
                buttonSimpan: async () => {
                  try {
                    const res = await axios.post(
                      chordAdminState.apiUrl + "/song/createOne",
                      {
                        title: chordAdminSongStore.form.title,
                        lyric: chordAdminSongStore.form.lyric,
                        artist_name: chordAdminSongStore.form.artist_name,
                      },
                      {
                        headers: {
                          "jwt-token": chordAdminStore.token,
                        },
                      }
                    );
                    if (res.data.status == "ok") {
                      chordAdminSong.http.readMany();
                    }
                  } catch (e) {}
                },
              }}
            />
          )}
        </mobxReact.Observer>
      );
    },
    list: () => (
      <bigegi84View.letsRock
        observer={() =>
          chordAdminSongStore.data.map(({ title, lyric }, i) => (
            <bigegi84View.letsRock
              key={i}
              cardA={{
                column: {
                  text: title,
                  textB: lyric,
                },
              }}
            />
          ))
        }
      />
    ),
    validate: () => {
      const { balance } = chordStore.form.account;
      if (isNaN(parseFloat(balance))) {
        alert("Saldo salah!");
        return false;
      }
      return true;
    },
  },
  http: {
    readMany: async () => {
      try {
        const res = await axios.post(chordAdminState.apiUrl + "/song/readMany");
        if (res.data.status == "ok") {
          chordAdminSongStore.data = res.data.result;
        }
      } catch (e) {}
    },
  },
  view: () => {
    chordAdminSong.http.readMany();
    return (
      <bigegi84View.letsRock
        column={{
          "sectionTambah Lagu": {
            content: {
              view: <chordAdminSong.action.form />,
            },
          },
          sectionLagu: {
            content: {
              view: <chordAdminSong.action.list />,
            },
          },
        }}
      />
    );
  },
};
