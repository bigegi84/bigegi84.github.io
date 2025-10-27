define((require) => {
  const state = require("../../../../bigegi84/state/index");
  return {
    // apiUrl: "http://localhost:8000/api/chord",
    // apiUrl: "http://localhost:841/chord",
    apiUrl: state.host + "/chord",
    get apiToken() {
      return localStorage.getItem("chordAdmin-apiToken");
    },
  };
});
