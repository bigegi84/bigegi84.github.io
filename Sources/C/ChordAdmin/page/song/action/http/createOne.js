define((require) => {
  var readMany = require("./readMany");
  var state = require("../../../../state/index");
  var store = require("../../../../store/index");
  return async () => {
    try {
      const res = await axios.post(
        state.apiUrl + "/song/createOne",
        {
          title: store.song.form.title,
          lyric: store.song.form.lyric,
          artist_name: store.song.form.artist_name,
        },
        {
          headers: {
            "jwt-token": state.apiToken,
          },
        }
      );
      if (res.data.status == "ok") {
        readMany();
        alertify.success("Berhasil.");
      }
    } catch (e) {}
  };
});
