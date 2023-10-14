const guitarInit = () => {
  if (!guitarState.tone.nylon)
    guitarState.tone.nylon = new Tone.Sampler({
      urls: {
        B1: "B1.mp3",

        D2: "D2.mp3",
        E2: "E2.mp3",
        Gb2: "Gb2.mp3",
        Ab2: "Ab2.mp3",
        A2: "A2.mp3",
        B2: "B2.mp3",

        Db3: "Db3.mp3",
        D3: "D3.mp3",
        E3: "E3.mp3",
        Gb3: "Gb3.mp3",
        G3: "G3.mp3",
        A3: "A3.mp3",
        B3: "B3.mp3",

        Db4: "Db4.mp3",
        Eb4: "Eb4.mp3",
        E4: "E4.mp3",
        Gb4: "Gb4.mp3",
        Ab4: "Ab4.mp3",
        A4: "A4.mp3",
        B4: "B4.mp3",

        Db5: "Db5.mp3",
        // D5: "D5.mp3",
        E5: "E5.mp3",
        Gb5: "Gb5.mp3",
        G5: "G5.mp3",
        Ab5: "Ab5.mp3",
        A5: "A5.mp3",
        Bb5: "Bb5.mp3",
      },
      release: 1,
      baseUrl: "../../asset/sound/guitar/nylon/",
    }).toDestination();
  if (!guitarState.tone.distortion)
    guitarState.tone.distortion = new Tone.Sampler({
      urls: {
        E3: "E3.mp3",
        A3: "A3.mp3",
        D4: "D4.mp3",
      },
      release: 1,
      baseUrl: "../../asset/sound/guitar/distortion/",
    }).toDestination();
};
