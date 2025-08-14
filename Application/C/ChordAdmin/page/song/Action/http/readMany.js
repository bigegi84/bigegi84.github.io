define((_require) => {
  var State = _require("../../../../State/Index");
  var store = _require("../../../../store/index");
  return async () => {
    try {
      const res = await axios.post(State.ApiUrl + "/song/readMany", null, {
        params: {
          title: store.song.search,
        },
      });
      if (res.data.status == "ok") {
        store.song.data = res.data.result.data;
      }
    } catch (e) {}
  };
});
