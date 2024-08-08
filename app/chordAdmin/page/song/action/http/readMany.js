define((require) => {
  var state = require("../../../../state/index");
  var store = require("../../../../store/index");
  return async () => {
    try {
      const res = await axios.post(state.apiUrl + "/song/readMany", null, {
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
