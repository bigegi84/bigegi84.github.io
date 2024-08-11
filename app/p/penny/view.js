define((require) => {
  var { pakuan } = require("../../../lib/index");
  var app = require("../../../route/app");
  return () =>
    pakuan.main({
      textHighlight: "bigegi84 - Penny",
      ...app,
      panelAccount: {
        buttonError: () => alertify.error("Error."),
      },
      panelGroup: {
        buttonError: () => alertify.error("Error."),
      },
      panelFriend: {
        buttonError: () => alertify.error("Error."),
      },
    });
});
