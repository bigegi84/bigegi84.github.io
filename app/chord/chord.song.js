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
    list: () => {
      return (
        <mobxReact.Observer>
          {() => {
            return chordStore.song.map(({ singer, title, chord, lyric }, i) => {
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
                <div key={i} className="column-a card-a">
                  <span>
                    {singer} - {title}
                  </span>
                  <div className="column-a">
                    <div className="row-a">
                      <strong
                        style={{
                          ...bigegi84theme.style,
                          ...{ alignSelf: "center" },
                        }}
                      >
                        Akor
                      </strong>
                      <div
                        style={bigegi84theme.styleCircle}
                        className="circle-a"
                        onClick={() =>
                          (chordStore.song[i].show.chord =
                            !chordStore.song[i].show.chord)
                        }
                      >
                        <i
                          className={
                            "fas" +
                            (chordStore.song[i].show.chord
                              ? " fa-angle-up"
                              : " fa-angle-down")
                          }
                        />
                      </div>
                    </div>
                    {chordStore.song[i].show.chord ? (
                      <div className="column-a card-a">{chordView}</div>
                    ) : null}
                  </div>
                  <div className="column-a">
                    <div className="row-a">
                      <strong
                        style={{
                          ...bigegi84theme.style,
                          ...{ alignSelf: "center" },
                        }}
                      >
                        Lirik
                      </strong>
                      <div
                        style={bigegi84theme.styleCircle}
                        className="circle-a"
                        onClick={() =>
                          (chordStore.song[i].show.lyric =
                            !chordStore.song[i].show.lyric)
                        }
                      >
                        <i
                          className={
                            "fas" +
                            (chordStore.song[i].show.lyric
                              ? " fa-angle-up"
                              : " fa-angle-down")
                          }
                        />
                      </div>
                    </div>
                    {chordStore.song[i].show.lyric ? (
                      <div className="column-a card-a">
                        {lyric.map((e, i) => (
                          <span key={i}>{e}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            });
          }}
        </mobxReact.Observer>
      );
    },
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
    const [show, setShow] = React.useState(false);
    const [add, setAdd] = React.useState(false);
    return (
      <div className="column-a">
        <div className="row-a">
          <strong
            style={{ ...bigegi84theme.style, ...{ alignSelf: "center" } }}
          >
            Lagu
          </strong>
          <div
            style={bigegi84theme.styleCircle}
            className="circle-a"
            onClick={() => setShow(!show)}
          >
            <i className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")} />
          </div>
        </div>
        {show ? (
          <div className="column-a">
            <div className="row-a">
              <chordSong.action.list />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
