define((require) => {
  var { state } = require("../../../bigegi84/index");
  var _private = {
    isLogin: false,
    song: {
      data: [],
      form: {
        title: "",
        lyric: "",
        artist_name: "",
      },
      search: "",
    },
  };
  return {
    get isLogin() {
      return _private.isLogin;
    },
    set isLogin(v) {
      _private.isLogin = v;
      state.observer.notify();
    },
    loginForm: {
      username: "",
      password: "",
    },
    song: {
      get data() {
        return _private.song.data;
      },
      set data(v) {
        _private.song.data = v;
        state.observer.notify();
      },
      form: {
        get title() {
          return _private.song.form.title;
        },
        set title(v) {
          _private.song.form.title = v;
          state.observer.notify();
        },
        get lyric() {
          return _private.song.form.lyric;
        },
        set lyric(v) {
          _private.song.form.lyric = v;
          state.observer.notify();
        },
        artist_name: "",
      },
      get search() {
        return _private.song.search;
      },
      set search(v) {
        _private.song.search = v;
        state.observer.notify();
      },
    },
    get token() {
      return localStorage.getItem("chordAdmin-apiToken");
    },
  };
});
