const drumAudio = {
  view: () => (
    <div id="audio">
      {drumState.note.map(([key, name, child], i) => (
        <div key={i}>
          {child.map(([cKey, cName, cUrl], cI) => (
            <audio
              key={cI}
              id={"drum-sound-" + key + "-" + cKey}
              src={cUrl}
              preload="auto"
            />
          ))}
        </div>
      ))}
      <audio
        id="drum-sound-st"
        src="../../../asset/sound/drum/stick.ogg"
        preload="auto"
      ></audio>
    </div>
  ),
};
