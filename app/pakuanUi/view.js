define((require) => {
  var bigegi84 = require("../../bigegi84/index");
  var jurus = bigegi84.action.jurus;
  document.title = "bigegi84 - Pakuan UI";
  return () =>
    jurus.pamacan({
      textHighlight: "bigegi84 - Pakuan UI",
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
    });
});
