const pianoInit = () => {
  if (!pianoState.tone)
    pianoState.tone = new Tone.Sampler({
      urls: {
        C2: "C2.ogg",
        Db2: "Db2.ogg",
        D2: "D2.ogg",
        Eb2: "Eb2.ogg",
        E2: "E2.ogg",
        F2: "F2.ogg",
        Gb2: "Gb2.ogg",
        G2: "G2.ogg",
        Ab2: "Ab2.ogg",
        A2: "A2.ogg",
        Bb2: "Bb2.ogg",
        B2: "B2.ogg",

        C3: "C3.ogg",
        Db3: "Db3.ogg",
        D3: "D3.ogg",
        Eb3: "Eb3.ogg",
        E3: "E3.ogg",
        F3: "F3.ogg",
        Gb3: "Gb3.ogg",
        G3: "G3.ogg",
        Ab3: "Ab3.ogg",
        A3: "A3.ogg",
        Bb3: "Bb3.ogg",
        B3: "B3.ogg",

        C4: "C4.ogg",
        Db4: "Db4.ogg",
        D4: "D4.ogg",
        Eb4: "Eb4.ogg",
        E4: "E4.ogg",
        F4: "F4.ogg",
        Gb4: "Gb4.ogg",
        G4: "G4.ogg",
        Ab4: "Ab4.ogg",
        A4: "A4.ogg",
        Bb4: "Bb4.ogg",
        B4: "B4.ogg",

        C5: "C5.ogg",
        Db5: "Db5.ogg",
        D5: "D5.ogg",
        Eb5: "Eb5.ogg",
        E5: "E5.ogg",
        F5: "F5.ogg",
        Gb5: "Gb5.ogg",
        G5: "G5.ogg",
        Ab5: "Ab5.ogg",
        A5: "A5.ogg",
        Bb5: "Bb5.ogg",
        B5: "B5.ogg",

        C6: "C6.ogg",
        Db6: "Db6.ogg",
        D6: "D6.ogg",
        Eb6: "Eb6.ogg",
        E6: "E6.ogg",
        F6: "F6.ogg",
        Gb6: "Gb6.ogg",
        G6: "G6.ogg",
        Ab6: "Ab6.ogg",
        A6: "A6.ogg",
        Bb6: "Bb6.ogg",
        B6: "B6.ogg",
      },
      release: 1,
      baseUrl: "../../asset/sound/piano/",
    }).toDestination();
};
