const bassInit = () => {
  if (!bassState.tone)
    bassState.tone = new Tone.Sampler({
      urls: {
        Db1: "Db1.ogg",
        E1: "E1.ogg",
        G1: "G1.ogg",
        Bb1: "Bb1.ogg",
        Db2: "Db2.ogg",
        E2: "E2.ogg",
        G2: "G2.ogg",
        Bb2: "Bb2.ogg",
        Db3: "Db3.ogg",
        E3: "E3.ogg",
        G3: "G3.ogg",
        Bb3: "Bb3.ogg",
        Db4: "Db4.ogg",
        E4: "E4.ogg",
        G4: "G4.ogg",
        Bb4: "Bb4.ogg",
      },
      release: 1,
      baseUrl: "../../asset/sound/bass-electric/",
    }).toDestination();
};
