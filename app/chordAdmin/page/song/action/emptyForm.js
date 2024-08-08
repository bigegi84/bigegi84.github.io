define((require) => {
  var store = require("../../../store/index");
  return () => {
    store.song.form.artist_name = "";
    store.song.form.title = "";
    store.song.form.lyric = "";
  };
});
