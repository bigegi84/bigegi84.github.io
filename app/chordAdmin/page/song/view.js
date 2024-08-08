define((require) => {
  var bigegi84 = require("../../../../bigegi84/index");
  var jurus = bigegi84.action.jurus;
  var store = require("../../store/index");
  var action = require("./action/index");
  // action.http.readMany();
  return () =>
    jurus.pamacan({
      buttonLogout: () => {
        action.logout();
      },
      panelSong: {
        panelAdd: {
          card: {
            observerA: () =>
              jurus.pamacan({
                "inputLabelTextArtist Name": [
                  store.song.form.artist_name,
                  (e) => (store.song.form.artist_name = e.target.value),
                ],
              }),
            observerT: () =>
              jurus.pamacan({
                inputLabelTextTitle: [
                  store.song.form.title,
                  (e) => (store.song.form.title = e.target.value),
                ],
              }),
            observerL: () =>
              jurus.pamacan({
                inputLabelTextareaLyric: [
                  store.song.form.lyric,
                  (e) => (store.song.form.lyric = e.target.value),
                ],
              }),
            buttonSave: async () => {
              var valid = action.validate();
              if (valid != "ok") {
                alertify.error(valid);
                return;
              }
              await action.http.createOne();
              action.emptyForm();
            },
          },
        },
        card: {
          inputLabelTextCari: [
            store.song.search,
            (e) => (store.song.search = e.target.value),
          ],
          buttonCari: () => {
            action.http.readMany();
          },
        },
        observer: () =>
          jurus.pamacan({
            columnList: store.song.data.map(
              (it) =>
                jurus.pamacan({
                  card: {
                    textStrong: it.title,
                    text: it.lyric,
                  },
                })[0]
            ),
          }),
      },
    });
});
