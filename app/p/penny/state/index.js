define((require) => {
  const bigegi84 = require("../../../../bigegi84/index");
  return {
    // apiUrl: "http://localhost:8000/api/chord",
    // apiUrl: "http://localhost:841/chord",
    api: bigegi84.state.host + "/penny",
    apiToken: localStorage.getItem("penny_apiToken"),
  };
});
