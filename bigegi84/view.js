define((require) => {
  var app = require('../route/app')
  var { pakuan } = require('../lib/index')
  document.title = 'bigegi84'
  return pakuan.main({
    textHighlight: 'Gilang Pratama Wiguna, S.Kom.',
    textHighlightB: 'ᮌᮤᮜᮀ ᮕᮢᮒᮙ ᮝᮤᮌᮥᮔ',
    ...app,
    panelWelcome: {
      card: {
        text1: '.ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ',
        text2: "(Assalaamu'alaikum wa rahmatullahi wa barakaatuh.)\n\r",
        text3: 'ᮞᮙ᮪ᮕᮥᮛᮞᮥᮔ᮪!',
        text4: '(Sampurasun!)\n\r',
        text5:
          "What's up? This is my personal website. If you want to offer a business or job, please contact me immediately. I will be glad to help you. I created this website for portfolio, research and learning purposes. Hope you'll enjoy it. If you have any suggestions and advice please contact me, I would like to hear it.",
      },
    },
    panelProfile: {
      card: {
        textA: 'Gilang Pratama Wiguna, S.Kom.',
        textB: 'ᮌᮤᮜᮀ ᮕᮛᮒᮙ ᮝᮤᮌᮥᮔ',
      },
    },
    panelEducation: {
      card: {
        text1: 'Universitas Jenderal Soedirman',
        text2: 'S1 Teknik Informatika',
        text3: '2012 - 2016',
      },
    },
  })
})
