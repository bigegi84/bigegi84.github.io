define((_require) => {
  var readMany = _require("./readMany");
  var State = _require("../../../../State/Index");
  var store = _require("../../../../store/index");
  return async () => {
    try {
      const res = await axios.post(
        State.ApiUrl + "/song/createOne",
        {
          title: store.song.form.title,
          lyric: store.song.form.lyric,
          artist_name: store.song.form.artist_name,
        },
        {
          headers: {
            "jwt-token": State.apiToken,
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
