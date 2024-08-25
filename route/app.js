define(() => {
  return {
    panelHideApp: {
      card: {
        row: {
          buttonHome: () => (window.location.hash = '/'),
          buttonCalculator: () => (window.location.hash = '/calculator'),
          'buttonChord Admin': () => (window.location.hash = '/chordAdmin'),
          'buttonPakuan UI': () => (window.location.hash = '/pakuanUi'),
          buttonPenny: () => (window.location.hash = '/penny'),
        },
      },
    },
  }
})
