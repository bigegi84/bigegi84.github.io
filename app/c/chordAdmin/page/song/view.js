define((require) => {
  var route = require("../../../../../route/app");
  var { pakuan } = require("../../../../../lib/index");
  var store = require("../../store/index");
  var action = require("./action/index");
  // action.http.readMany();
  return () =>
    pakuan.main({
      ...route,
      panelMenu: {
        card: {
          buttonLogout: () => action.logout(),
        },
      },
      panelSong: {
        panelAdd: {
          card: {
            observerA: () =>
              pakuan.main({
                "inputLabelTextArtist Name": [
                  store.song.form.artist_name,
                  (e) => (store.song.form.artist_name = e.target.value),
                ],
              }),
            observerT: () =>
              pakuan.main({
                inputLabelTextTitle: [
                  store.song.form.title,
                  (e) => (store.song.form.title = e.target.value),
                ],
              }),
            observerL: () =>
              pakuan.main({
                inputLabelTextareaLyric: [
                  store.song.form.lyric,
                  (e) => {
                    store.song.form.lyric = e.target.value;
                    console.log(store.song.form.lyric);
                  },
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
          store.song.data.map((it) =>
            pakuan.main({
              card: {
                column: {
                  textStrong: it.title,
                  textStrong2: it.artist.name,
                  text: it.lyric,
                },
              },
            })
          ),
      },
    });
});
