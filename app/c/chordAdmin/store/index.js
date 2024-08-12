define((require) => {
  var { action } = require("../../../../lib/pakuan/index");
  return action.useStore({
    isLogin: false,
    test: [],
    loginForm: {
      username: "",
      password: "",
    },
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
});
