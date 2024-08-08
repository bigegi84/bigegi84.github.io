define((require) => {
  var store = require("../../../store/index");
  return () => {
    localStorage.removeItem("chordAdmin-apiToken");
    alertify.success("Logout success.");
    window.location.hash = "/chordAdmin-";
    window.location.hash = "/chordAdmin";
  };
});
