define(() => {
  return {
    panelApp: {
      card: {
        row: {
          buttonHome: () => (window.location.hash = "/"),
          buttonChord: () => (window.location.hash = "/chordAdmin"),
        },
      },
    },
  };
});
