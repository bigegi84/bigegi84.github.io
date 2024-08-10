define((require) => {
  var { pakuan } = require("../../lib/index");
  var app = require("../../route/app");
  document.title = "bigegi84 - Pakuan UI";
  return () =>
    pakuan({
      textHighlight: "bigegi84 - Pakuan UI",
      ...app,
      panelAlert: {
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
      panelCard: {
        card: {
          text: "This is card.",
        },
      },
      panelColumn: {
        column: {
          cardA: {
            text: "This is column 1.",
          },
          cardB: {
            text: "This is column 2.",
          },
          cardC: {
            text: "This is column 3.",
          },
        },
      },
      panelRow: {
        row: {
          cardA: {
            text: "This is row 1.",
          },
          cardB: {
            text: "This is row 2.",
          },
          cardC: {
            text: "This is row 3.",
          },
        },
      },
      panelText: {
        card: {
          panelText: {
            card: {
              text: 'This is "text".',
            },
          },
          "panelText Highlight": {
            card: {
              textHighlight: 'This is "textHighlight".',
            },
          },
          "panelText Strong": {
            card: {
              text: 'This is "textStrong".',
            },
          },
        },
      },
    });
});
