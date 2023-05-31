var store = mobx.observable(
  localStorage.getItem("bigegi84-Penny")
    ? JSON.parse(localStorage.getItem("bigegi84-Penny"))
    : {
        familyName: "",
        fullName: "",
        registered: true,
      }
);
let firstAutorun = true;
mobx.autorun(() => {
  const json = JSON.stringify(store);
  if (!firstAutorun) {
    localStorage.setItem("bigegi84-Penny", json);
    console.log("saved to local storage");
  }
  firstAutorun = false;
});
