define((require) => {
  var bigegi84 = require("../../../../bigegi84/index");
  var jurus = bigegi84.action.jurus;
  var store = require("../../store/index");
  var action = require("./action/index");
  action.http.readMany();
  return jurus.pamacan({
    buttonLogout: () => {
      action.logout();
    },
    panelLagu: jurus.pamacan({
      observer: () =>
        jurus.pamacan({
          columnList: store.song.data.map((it) =>
            jurus.pamacan({
              textJudul: it.title,
            })
          ),
        }),
    }),
  });
});
