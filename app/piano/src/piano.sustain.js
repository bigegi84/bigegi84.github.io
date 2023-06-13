const PianoSustain = {
  view: () => {
    return (
      <div className="field half">
        <mobxReact.Observer>
          {() => {
            return (
              <input
                type="checkbox"
                id="sustain"
                name="sustain"
                checked={PianoStore.sustaining}
                onChange={(e) => {
                  PianoStore.sustaining = e.target.checked;
                }}
              />
            );
          }}
        </mobxReact.Observer>
        <label htmlFor="sustain">Sustain</label>
      </div>
    );
  },
};
