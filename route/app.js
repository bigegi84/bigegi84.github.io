define(() => {
  return {
    panelApp: {
      card: {
        row: {
          buttonHome: () => (window.location.hash = "/"),
          "buttonChord Admin": () => (window.location.hash = "/chordAdmin"),
          "buttonPakuan UI": () => (window.location.hash = "/pakuanUi"),
        },
      },
    },
  };
});
