const chordSong = {
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
            <div className="row-a">
              <div className="column-a">
                <label htmlFor="name" className={bigegi84theme.class.basic}>
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={bigegi84theme.class.inputText}
                  value={chordStore.form.account.name}
                  onChange={(e) =>
                    (chordStore.form.account.name = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="owner" className={bigegi84theme.class.basic}>
                  Pemilik
                </label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  className={bigegi84theme.class.inputText}
                  value={chordStore.form.account.owner}
                  onChange={(e) =>
                    (chordStore.form.account.owner = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <label htmlFor="balance" className={bigegi84theme.class.basic}>
                  Balance
                </label>
                <input
                  type="text"
                  id="balance"
                  name="balance"
                  className={bigegi84theme.class.inputText}
                  value={chordStore.form.account.balance}
                  onChange={(e) =>
                    (chordStore.form.account.balance = e.target.value)
                  }
                />
              </div>
              <div className="column-a">
                <button
                  className={bigegi84theme.class.button}
                  onClick={() => chordSong.action.add()}
                >
                  Simpan
                </button>
              </div>
            </div>
          )}
        </mobxReact.Observer>
      );
    },
    list: () => (
      <bigegi84View.listCard
        arr={chordStore.song}
        onMap={({ singer, title, chord, lyric }, i) => (
          <bigegi84View.observer
            onChange={() => {
              const chordView = [];
              let chordI = 0;
              for (const key in chord) {
                chordView.push(
                  <div key={chordI} className="column-a">
                    <span>{key}</span>
                    <span>{chord[key]}</span>
                  </div>
                );
                chordI++;
              }
              return (
                <bigegi84View.column>
                  <bigegi84View.textStrong
                    label={`${singer} - ${title}`}
                    color={"#A7ECEE"}
                  />
                  <bigegi84View.column>
                    <bigegi84View.circle
                      label="Akor"
                      onClick={() =>
                        (chordStore.song[i].show.chord =
                          !chordStore.song[i].show.chord)
                      }
                      iClassName={
                        "fas" +
                        (chordStore.song[i].show.chord
                          ? " fa-angle-up"
                          : " fa-angle-down")
                      }
                    />
                    <bigegi84View.isShow
                      value={chordStore.song[i].show.chord}
                      show={<bigegi84View.card>{chordView}</bigegi84View.card>}
                    />
                  </bigegi84View.column>
                  <bigegi84View.column>
                    <bigegi84View.circle
                      label="Lirik"
                      onClick={() =>
                        (chordStore.song[i].show.lyric =
                          !chordStore.song[i].show.lyric)
                      }
                      iClassName={
                        "fas" +
                        (chordStore.song[i].show.lyric
                          ? " fa-angle-up"
                          : " fa-angle-down")
                      }
                    />
                    <bigegi84View.isShow
                      value={chordStore.song[i].show.lyric}
                      show={
                        <bigegi84View.card>
                          {lyric.map((e, i) => (
                            <bigegi84View.text key={i} label={e} />
                          ))}
                        </bigegi84View.card>
                      }
                    />
                  </bigegi84View.column>
                </bigegi84View.column>
              );
            }}
          />
        )}
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
  view: () => {
    // <bigegi84View.letsRock
    //       column={{
    //         sectionLagu: <chordSong.action.list />,
    //         row: {
    //           inputTextNama: name,
    //           inputTextareaAlamat: name,
    //           "inputTextNo Hp": name,
    //           "inputSelectJenis Kelamin": [name, ["Pria", "Wanita"]],
    //           buttonSimpan: () => alert("test"),
    //         },
    //       }}
    //     />
    return (
      <bigegi84View.letsRock
        column={{
          sectionLagu: {
            add: {
              inputTextPenyanyi: React.useState(""),
              inputTextJudul: React.useState(""),
            },
            content: <chordSong.action.list />,
          },
        }}
      />
    );
  },
};
