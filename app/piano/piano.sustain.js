const pianoSustain = {
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
                checked={pianoStore.sustaining}
                onChange={(e) => {
                  pianoStore.sustaining = e.target.checked;
                }}
              />
            );
          }}
        </mobxReact.Observer>
        <label htmlFor="sustain" className={bigegi84theme.class.basic}>
          Sustain
        </label>
      </div>
    );
  },
};
