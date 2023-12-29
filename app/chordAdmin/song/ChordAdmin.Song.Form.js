const ChordAdminSongForm = () => {
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
              onChange={(e) => (chordStore.form.account.name = e.target.value)}
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
              onChange={(e) => (chordStore.form.account.owner = e.target.value)}
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
};
