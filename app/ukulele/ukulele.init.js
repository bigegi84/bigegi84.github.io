const ukuleleInit = () => {
  if (!ukuleleState.tone)
    ukuleleState.tone = new Tone.Sampler({
      urls: {
        A4: "A4.mp3",
        Bb4: "Bb4.mp3",
        B4: "B4.mp3",
        C4: "C4.mp3",
        Db4: "Db4.mp3",
        D4: "D4.mp3",
        Eb4: "Eb4.mp3",
        E4: "E4.mp3",
        F4: "F4.mp3",
        Gb4: "Gb4.mp3",
        G4: "G4.mp3",
        Ab4: "Ab4.mp3",
      },
      release: 1,
      baseUrl: "../../asset/sound/ukulele/",
    }).toDestination();
};
