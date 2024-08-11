define((require) => {
  var { pakuan } = require("../../../lib/index");
  var app = require("../../../route/app");
  return () =>
    pakuan.main({
      textHighlight: "bigegi84 - Penny",
      ...app,
      panelAccount: {
        buttonError: () => {
          alertify.error("Error.");
        },
        buttonNormal: () => {
          alertify.message("Normal.");
        },
        buttonSuccess: () => {
          alertify.success("Success.");
        },
        buttonWarning: () => {
          alertify.warning("Warning.");
        },
      },
    });
});
