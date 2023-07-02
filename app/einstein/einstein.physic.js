const einsteinPhysic = {
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
        arr={einsteinStore}
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
  view: () => (
    <bigegi84View.letsRock
      column={{
        sectionFisika: {
          content: (
            <bigegi84View.letsRock
              column={{
                sectionRumus: {
                  content: (
                    <bigegi84View.listCard
                      arr={einsteinStore.physic.formula}
                      onMap={(
                        {
                          name,
                          formula,
                          unit: { name: unitName, symbol, base },
                        },
                        i
                      ) => {
                        const viewCalculator = [];
                        const formulaA = formula[0];
                        let letter = "";
                        let fi = 0;
                        const logic = [];
                        const input = [];
                        for (fi = 0; fi < formulaA.length; fi++) {
                          letter = formulaA[fi];
                          if (letter == "=" || letter == "*" || letter == "/") {
                            logic.push(letter);
                            viewCalculator.push(
                              <bigegi84View.text key={fi} label={letter} />
                            );
                          } else {
                            input.push(React.useState(""));
                            viewCalculator.push(
                              <bigegi84View.letsRock
                                key={fi}
                                column={{
                                  text: letter,
                                  inputText: input[input.length - 1],
                                }}
                              />
                            );
                          }
                        }
                        viewCalculator.push(
                          <bigegi84View.button
                            key={fi + 1}
                            name={"Hitung"}
                            onClick={() => {
                              let askI = null;
                              let answer = 0;
                              let countEmp = 0;
                              input.map(([s], ii) => {
                                if (s == "") {
                                  askI = ii;
                                  countEmp++;
                                }
                              });
                              if (countEmp != 1) {
                                alert("Harus kosongin 1 inputan saja");
                                return;
                              }
                              if (askI == 0) {
                                if (logic[1] == "*")
                                  input[askI][1](
                                    parseFloat(input[1][0]) *
                                      parseFloat(input[2][0])
                                  );
                                if (logic[1] == "/")
                                  input[askI][1](
                                    parseFloat(input[1][0]) /
                                      parseFloat(input[2][0])
                                  );
                              }
                              if (askI == 1) {
                                if (logic[1] == "*")
                                  input[askI][1](
                                    parseFloat(input[0][0]) /
                                      parseFloat(input[2][0])
                                  );
                                if (logic[1] == "/")
                                  input[askI][1](
                                    parseFloat(input[0][0]) *
                                      parseFloat(input[2][0])
                                  );
                              }
                              if (askI == 2) {
                                if (logic[1] == "*")
                                  input[askI][1](
                                    parseFloat(input[0][0]) /
                                      parseFloat(input[1][0])
                                  );
                                if (logic[1] == "/")
                                  input[askI][1](
                                    parseFloat(input[1][0]) /
                                      parseFloat(input[0][0])
                                  );
                              }
                            }}
                          />
                        );
                        return (
                          <bigegi84View.observer
                            onChange={() => (
                              <bigegi84View.column>
                                <bigegi84View.textStrong
                                  label={name}
                                  color={"#A7ECEE"}
                                />
                                <bigegi84View.text label={`Rumus:`} />
                                {formula.map((e, i) => (
                                  <bigegi84View.text key={i} label={`${e}`} />
                                ))}
                                <bigegi84View.text label={`Satuan:`} />
                                <bigegi84View.text label={`${unitName}`} />
                                <bigegi84View.text label={`Simbol:`} />
                                <bigegi84View.text label={`${symbol}`} />
                                <bigegi84View.text label={`Satuan Dasar:`} />
                                <bigegi84View.text label={`${base}`} />
                                <bigegi84View.card>
                                  <bigegi84View.row>
                                    {viewCalculator}
                                  </bigegi84View.row>
                                </bigegi84View.card>
                              </bigegi84View.column>
                            )}
                          />
                        );
                      }}
                    />
                  ),
                },
              }}
            />
          ),
        },
      }}
    />
  ),
};
