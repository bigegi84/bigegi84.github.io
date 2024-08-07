define((require) => {
  var { state } = require("../../../bigegi84/index");
  var private = {
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
      return private.isLogin;
    },
    set isLogin(v) {
      private.isLogin = v;
      state.observer.notify();
    },
    loginForm: {
      username: "",
      password: "",
    },
    song: {
      data: [],
      form: {
        title: "",
        get title() {
          return private.isLogin;
        },
        set title(v) {
          private.isLogin = v;
          state.observer.notify();
        },
        lyric: "",
        artist_name: "",
      },
      search: "",
    },
    token: localStorage.getItem("chordAdmin-apiToken"),
  };
});
