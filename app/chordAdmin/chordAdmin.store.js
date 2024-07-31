const chordAdminStore = mobx.observable({
  isLogin: false,
  token: localStorage.getItem("chordAdmin-apiToken"),
  song: {
    data: [],
    form: {
      title: "",
      lyric: "",
      artist_name: "",
    },
    search: "",
  },
});
