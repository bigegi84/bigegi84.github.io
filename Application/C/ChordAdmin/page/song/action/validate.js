define((require) => {
  var store = require("../../../store/index");
  return () => {
    const { artist_name, title, lyric } = store.song.form;
    if (!artist_name) return "Artist Name required.";
    if (!title) return "Title required.";
    if (!lyric) return "Lyric Name required.";
    return "ok";
  };
});
