define(() => {
  return {
    panelHideApp: {
      card: {
        row: {
          buttonHome: () => (window.location.hash = '/'),
          buttonCalculator: () => (window.location.hash = '/calculator'),
          'buttonChord Admin': () => (window.location.hash = '/chordAdmin'),
          buttonPakuan: () => (window.location.hash = '/pakuan'),
          buttonPenny: () => (window.location.hash = '/penny'),
        },
      },
    },
  }
})
