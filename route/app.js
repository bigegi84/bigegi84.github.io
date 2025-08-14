define(() => {
  return {
    panelHideApp: {
      card: {
        row: {
          buttonHome: () => (window.location.hash = '/'),
          buttonCalculator: () => (window.location.hash = '/calculator'),
          'buttonChord Admin': () => (window.location.hash = '/ChordAdmin'),
          buttonPakuan: () => (window.location.hash = '/pakuan'),
          'buttonPakuan Test': () => (window.location.hash = '/pakuan-test'),
          buttonPenny: () => (window.location.hash = '/penny'),
        },
      },
    },
  }
})
