define((require) => {
  var { pakuan } = require("../../../../../lib/index");
  var app = require("../../../../../route/app");
  var state = require("../../state/index");
  var store = require("../../store/index");
  return () =>
    pakuan.main({
      ...app,
      panelHidePenny: {
        "buttonLog Out": () => {
          store.token = null;
          window.location.hash = "/penny-";
          window.location.hash = "/penny";
          alertify.success("Logout Success.");
        },
      },
      panelHideAccount: {
        buttonError: () => alertify.error("Error."),
      },
      panelHideGroup: {
        buttonError: () => alertify.error("Error."),
      },
      panelHideFriend: {
        buttonError: () => alertify.error("Error."),
      },
      panelHideTransaction: {
        buttonError: () => alertify.error("Error."),
      },
    });
});
